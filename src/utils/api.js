/**
 * API utility for communicating with the Cloudflare Worker
 */

const API_URL = 'https://jobs.trusase.com';

/**
 * Tailor resume based on job description
 * @param {string} jobDescription - The job description text
 * @param {AbortSignal} signal - Optional abort signal for cancellation
 * @returns {Promise<Object>} - Tailored resume and cover letter data
 */
export async function tailorResume(jobDescription, signal) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDescription }),
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

    return data;
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
