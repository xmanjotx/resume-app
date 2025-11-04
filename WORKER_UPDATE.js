// Updated Cloudflare Worker Code
// Replace the POST request handling section with this updated version

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // ========================================
    // ENDPOINT: List All Resumes (TXT + PDF)
    // ========================================
    if (url.pathname === '/resumes') {
      try {
        const listed = await env.MY_BUCKET.list();
        
        // Filter for both .txt and .pdf files
        const resumeFiles = listed.objects
          .filter(obj => obj.key.endsWith('.txt') || obj.key.endsWith('.pdf'))
          .map(obj => ({
            filename: obj.key,
            size: obj.size,
            uploaded: obj.uploaded,
            type: obj.key.endsWith('.pdf') ? 'pdf' : 'txt'
          }));

        return new Response(
          JSON.stringify({
            success: true,
            count: resumeFiles.length,
            resumes: resumeFiles
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: error.message 
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }
    }

    // ========================================
    // ENDPOINT: Download Original Resume (TXT or PDF)
    // ========================================
    if (url.pathname.startsWith('/download/')) {
      const filename = decodeURIComponent(url.pathname.replace('/download/', ''));
      
      try {
        const object = await env.MY_BUCKET.get(filename);
        
        if (!object) {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: 'Resume not found',
              filename: filename
            }),
            { 
              status: 404, 
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              } 
            }
          );
        }

        // Determine content type based on file extension
        const isPDF = filename.toLowerCase().endsWith('.pdf');
        const contentType = isPDF ? 'application/pdf' : 'text/plain; charset=utf-8';
        
        // For PDF, get as arrayBuffer; for text, get as text
        const content = isPDF ? await object.arrayBuffer() : await object.text();
        
        return new Response(content, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Disposition',
          },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: error.message,
            filename: filename
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }
    }

    // ========================================
    // ENDPOINT: Debug - Check Bucket Status
    // ========================================
    if (url.pathname === '/debug') {
      try {
        const listed = await env.MY_BUCKET.list();
        const txtFiles = listed.objects?.filter(o => o.key.endsWith('.txt')).length || 0;
        const pdfFiles = listed.objects?.filter(o => o.key.endsWith('.pdf')).length || 0;
        
        return new Response(JSON.stringify({
          bucketBindingExists: !!env.MY_BUCKET,
          totalObjects: listed.objects?.length || 0,
          txtFiles: txtFiles,
          pdfFiles: pdfFiles,
          files: listed.objects?.map(o => ({
            key: o.key,
            size: o.size,
            uploaded: o.uploaded,
            type: o.key.endsWith('.pdf') ? 'pdf' : o.key.endsWith('.txt') ? 'txt' : 'other'
          })) || [],
          truncated: listed.truncated
        }, null, 2), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          error: error.message,
          stack: error.stack,
          bucketBindingExists: !!env.MY_BUCKET
        }, null, 2), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }
    }

    // ========================================
    // CORS Preflight Handler
    // ========================================
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // ========================================
    // ENDPOINT: Generate Tailored Resume (POST)
    // ========================================
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Method not allowed. Use POST for generating resumes.' 
        }), 
        { 
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    try {
      // Parse the incoming request
      const { jobDescription, jobDetails, selectedResume } = await request.json();

      if (!jobDescription) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'Job description is required' 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      // Validate job description length
      if (jobDescription.trim().length < 50) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'Job description is too short. Please provide at least 50 characters.' 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      // List all objects in the R2 bucket
      const listed = await env.MY_BUCKET.list();
      
      if (!listed.objects || listed.objects.length === 0) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'No resumes found in R2 bucket',
            debug: {
              bucketExists: !!env.MY_BUCKET,
              objectCount: 0
            }
          }),
          { 
            status: 404, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      // Filter for ONLY .txt files for AI processing
      // PDFs are for download only, not AI processing
      const resumeFiles = listed.objects
        .filter(obj => obj.key.endsWith('.txt'))
        .map(obj => obj.key);

      if (resumeFiles.length === 0) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'No .txt resume files found in R2 bucket for AI processing',
            hint: 'AI tailoring requires .txt files. PDF files are available for download only.',
            debug: {
              totalFiles: listed.objects.length,
              fileNames: listed.objects.map(o => o.key)
            }
          }),
          { 
            status: 404, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      // Fetch all TXT resumes or specific selected resume
      let resumes = [];
      
      if (selectedResume) {
        // User selected a specific resume
        // If it's a PDF, try to find corresponding TXT file
        let resumeToFetch = selectedResume;
        if (selectedResume.endsWith('.pdf')) {
          // Look for .txt version of the PDF
          const txtVersion = selectedResume.replace('.pdf', '.txt');
          if (resumeFiles.includes(txtVersion)) {
            resumeToFetch = txtVersion;
          } else {
            return new Response(
              JSON.stringify({ 
                success: false,
                error: 'PDF resumes require a corresponding .txt file for AI processing',
                hint: `Please upload a .txt version of ${selectedResume} to enable AI tailoring.`
              }),
              { 
                status: 400, 
                headers: { 
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                } 
              }
            );
          }
        }
        
        const object = await env.MY_BUCKET.get(resumeToFetch);
        if (object) {
          const content = await object.text();
          resumes = [{ filename: resumeToFetch, content }];
        } else {
          return new Response(
            JSON.stringify({ 
              success: false,
              error: `Selected resume "${resumeToFetch}" not found` 
            }),
            { 
              status: 404, 
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              } 
            }
          );
        }
      } else {
        // Fetch all TXT resumes for AI to choose from
        const resumePromises = resumeFiles.map(async (filename) => {
          const object = await env.MY_BUCKET.get(filename);
          if (object) {
            const content = await object.text();
            return { filename, content };
          }
          return null;
        });

        resumes = (await Promise.all(resumePromises)).filter(r => r !== null);
      }

      if (resumes.length === 0) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'Failed to read resume files' 
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      // Prepare resume data for ChatGPT
      const resumesText = resumes.map((r, idx) => 
        `RESUME ${idx + 1} (${r.filename}):\n${r.content}` 
      ).join('\n\n---\n\n');

      const resumeListText = resumes.map(r => r.filename).join(', ');

      // Build job details context for the AI
      const jobDetailsContext = jobDetails ? `
EXTRACTED JOB DETAILS:
- Company Name: ${jobDetails.companyName || '[Not extracted]'}
- Hiring Manager: ${jobDetails.hiringManager || '[Not extracted]'}
- Address: ${jobDetails.address || '[Not extracted]'}

Use these details to fill in the cover letter. If a detail is not extracted, leave the placeholder or use a generic greeting.
` : '';

      // Call OpenAI API with improved prompt
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert resume writer and ATS optimization specialist. Your task is to tailor resumes for specific job descriptions while maintaining authenticity and professionalism.

CRITICAL FORMATTING RULES:
1. NEVER use markdown formatting (**, __, ##, *, etc.) in the output
2. Use only plain text with standard formatting (UPPERCASE for headers, bullet points with •)
3. Preserve ALL original content - do not remove any experiences, skills, or achievements
4. Add relevant keywords from the job description naturally into existing content
5. Reorder and emphasize sections to match job requirements
6. Maintain the exact same structure and sections as the original resume
7. Keep all dates, company names, and factual information exactly as provided
8. Output must be ATS-friendly plain text format

Your goal: Optimize the resume to pass ATS systems and highlight relevant experience WITHOUT changing facts or adding fictional content.`
            },
            {
              role: 'user',
              content: `I have ${resumes.length} specialized resumes: ${resumeListText}

Here are my resumes:

${resumesText}

---

Job Description:
${jobDescription}

${jobDetailsContext}

---

INSTRUCTIONS:
1. Analyze the job description and identify key requirements, skills, and keywords
2. Select the resume that best matches this role
3. Tailor that resume by:
   - Keeping ALL original content (do not remove any section, experience, or skill)
   - Naturally incorporating relevant keywords from the JD into existing bullet points
   - Reordering or emphasizing sections that match job requirements
   - Adjusting the summary/objective to align with the role
   - Highlighting transferable skills that match the JD
4. Write a compelling cover letter that:
   - Addresses the specific company and role
   - Uses the extracted job details (company name, hiring manager, address) if available
   - If company name is available, use it instead of [COMPANY NAME]
   - If hiring manager name is available, use it instead of [HIRING MANAGER'S NAME]
   - If address is available, use it instead of [COMPANY ADDRESS]
   - If any detail is not available, use a professional generic alternative
5. Use PLAIN TEXT ONLY - no markdown symbols (**, __, ##, *, etc.)

Provide your response in JSON format with these keys:
- "selectedResume": exact filename of the chosen resume
- "reasoning": 2-3 sentences explaining why this resume was selected
- "tailoredResume": complete tailored resume in plain text format (no markdown)
- "coverLetter": complete cover letter in plain text format (no markdown)

IMPORTANT: The tailored resume must be in clean plain text format suitable for ATS systems. Use UPPERCASE for section headers, bullet points (•) for lists, and standard spacing. No markdown formatting allowed.`
            }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        }),
      });

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.text();
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'OpenAI API error', 
            details: errorData 
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      const openaiData = await openaiResponse.json();
      
      // Check if we got a valid response
      if (!openaiData.choices || !openaiData.choices[0] || !openaiData.choices[0].message) {
        return new Response(
          JSON.stringify({ 
            success: false,
            error: 'Invalid response from OpenAI API' 
          }),
          { 
            status: 500, 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            } 
          }
        );
      }

      const result = JSON.parse(openaiData.choices[0].message.content);

      // Clean up any remaining markdown artifacts
      const cleanText = (text) => {
        if (!text) return '';
        return text
          .replace(/\*\*/g, '')  // Remove bold markdown
          .replace(/\*/g, '')    // Remove italic/bold markdown
          .replace(/##\s/g, '')  // Remove header markdown
          .replace(/__/g, '')    // Remove underline markdown
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Remove links but keep text
          .trim();
      };

      // Return the response with cleaned content and jobDetails
      return new Response(
        JSON.stringify({
          success: true,
          totalResumesAnalyzed: resumes.length,
          availableResumes: resumeFiles,
          selectedResume: result.selectedResume,
          reasoning: cleanText(result.reasoning),
          tailoredResume: cleanText(result.tailoredResume),
          coverLetter: cleanText(result.coverLetter),
          jobDetails: jobDetails || {},  // Include extracted job details in response
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: error.message,
          stack: error.stack 
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }
  },
};
