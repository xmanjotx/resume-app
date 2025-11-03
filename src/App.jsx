import { useState, useRef, useEffect } from 'react';
import CompactHeader from './components/CompactHeader';
import JobDescriptionInput from './components/JobDescriptionInput';
import ProgressBar from './components/ProgressBar';
import ResultsDisplay from './components/ResultsDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import OriginalResumesFooter from './components/OriginalResumesFooter';
import { tailorResume } from './utils/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const abortControllerRef = useRef(null);

  // Original resumes state
  const [originalResumes, setOriginalResumes] = useState([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [resumesFetchError, setResumesFetchError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null); // null = auto-select

  const handleSubmit = async (jd) => {
    setJobDescription(jd);
    setIsLoading(true);
    setShowProgress(true);
    setError(null);
    setResults(null);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const data = await tailorResume(jd, abortControllerRef.current.signal, selectedResume);
      setResults(data);
      setShowProgress(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request cancelled.');
      } else {
        setError(err.message || 'Failed to generate tailored resume. Please try again.');
      }
      console.error('Error:', err);
      setShowProgress(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
    setShowProgress(false);
  };

  const handleDismissError = () => {
    setError(null);
  };

  const handleRestart = () => {
    setJobDescription('');
    setResults(null);
    setError(null);
    setShowProgress(false);
    setSelectedResume(null);
  };

  const handleHome = () => {
    handleRestart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch original resumes function
  const fetchOriginalResumes = async () => {
    setIsLoadingResumes(true);
    try {
      const response = await fetch('https://jobs.trusase.com/resumes');
      const data = await response.json();
      
      if (data.success && data.resumes) {
        setOriginalResumes(data.resumes);
        setResumesFetchError(null);
      } else {
        setResumesFetchError('Failed to load resumes');
      }
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setResumesFetchError('Unable to load resumes');
    } finally {
      setIsLoadingResumes(false);
    }
  };

  // Fetch original resumes on mount
  useEffect(() => {
    fetchOriginalResumes();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50">
      <CompactHeader onHome={handleHome} onRestart={handleRestart} showActions={!!results} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {!results && (
          <OriginalResumesFooter
            resumes={originalResumes}
            isLoading={isLoadingResumes}
            error={resumesFetchError}
            onRefresh={fetchOriginalResumes}
          />
        )}
        <ErrorDisplay error={error} onDismiss={handleDismissError} />

        <div className="space-y-8">
          {!results && (
            <JobDescriptionInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onChangeJD={setJobDescription}
              value={jobDescription}
            />
          )}

          <ProgressBar isVisible={showProgress} onCancel={handleCancel} />

          {results && <ResultsDisplay results={results} />}
        </div>
      </main>

      <OriginalResumesFooter
        resumes={originalResumes}
        isLoading={isLoadingResumes}
        error={resumesFetchError}
        onRefresh={fetchOriginalResumes}
      />

      <footer className="mt-12 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-700">AI Resume Tailor</p>
          <p className="mt-1">Personal use • Powered by Cloudflare Workers & OpenAI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
