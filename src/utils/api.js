/**
 * API utility for communicating with the Cloudflare Worker
 */

const API_URL = 'https://jobs.trusase.com';

/**
 * Extract job details from job description
 * @param {string} jobDescription - The job description text
 * @returns {Object} - Extracted company name, hiring manager, and address
 */
function extractJobDetails(jobDescription) {
  const details = {
    companyName: '',
    hiringManager: '',
    address: '',
  };

  // Extract company name (look for common patterns)
  const companyPatterns = [
    /(?:Company|Employer|Organization):\s*([^\n]+)/i,
    /^([A-Z][A-Za-z\s&.,'-]+)\s+(?:is hiring|is looking|seeks|needs)/i,
    /(?:at|for)\s+([A-Z][A-Za-z\s&.,'-]+)\s+(?:in|located)/i,
  ];

  for (const pattern of companyPatterns) {
    const match = jobDescription.match(pattern);
    if (match) {
      details.companyName = match[1].trim();
      break;
    }
  }

  // Extract hiring manager name
  const managerPatterns = [
    /(?:Hiring Manager|Contact|Recruiter|Hiring|Manager):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
    /(?:Please contact|Reach out to|Contact)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
  ];

  for (const pattern of managerPatterns) {
    const match = jobDescription.match(pattern);
    if (match) {
      details.hiringManager = match[1].trim();
      break;
    }
  }

  // Extract address
  const addressPatterns = [
    /(?:Address|Location|Based in|Office):\s*([^\n]+)/i,
    /(?:in|located in|based in)\s+([A-Z][A-Za-z\s,]+(?:,\s*[A-Z]{2})?(?:\s+\d{5})?)/i,
  ];

  for (const pattern of addressPatterns) {
    const match = jobDescription.match(pattern);
    if (match) {
      details.address = match[1].trim();
      break;
    }
  }

  return details;
}

/**
 * Tailor resume based on job description
 * @param {string} jobDescription - The job description text
 * @param {AbortSignal} signal - Optional abort signal for cancellation
 * @param {string|null} selectedResume - Optional specific resume filename to use (null for auto-select)
 * @returns {Promise<Object>} - Tailored resume and cover letter data
 */
export async function tailorResume(jobDescription, signal, selectedResume = null) {
  try {
    const jobDetails = extractJobDetails(jobDescription);
    
    const requestBody = { 
      jobDescription,
      jobDetails,
    };
    if (selectedResume) {
      requestBody.selectedResume = selectedResume;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to tailor resume');
    }

    // Ensure jobDetails are included in the response for frontend use
    return {
      ...data,
      jobDetails: data.jobDetails || jobDetails,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get debug information about available resumes
 * @returns {Promise<Object>} - Debug information
 */
export async function getDebugInfo() {
  try {
    const response = await fetch(`${API_URL}/debug`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Debug API Error:', error);
    throw error;
  }
}
