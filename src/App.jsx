import { useState, useRef } from 'react';
import Header from './components/Header';
import JobDescriptionInput from './components/JobDescriptionInput';
import SmartAnalysis from './components/SmartAnalysis';
import LoadingState from './components/LoadingState';
import ProgressBar from './components/ProgressBar';
import ResultsDisplay from './components/ResultsDisplay';
import MatchScore from './components/MatchScore';
import ErrorDisplay from './components/ErrorDisplay';
import { tailorResume } from './utils/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const abortControllerRef = useRef(null);

  const handleSubmit = async (jd) => {
    setJobDescription(jd);
    setIsLoading(true);
    setShowProgress(true);
    setError(null);
    setResults(null);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const data = await tailorResume(jd, abortControllerRef.current.signal);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorDisplay error={error} onDismiss={handleDismissError} />

        <div className="space-y-8">
          <JobDescriptionInput onSubmit={handleSubmit} isLoading={isLoading} />

          {jobDescription && !isLoading && <SmartAnalysis jobDescription={jobDescription} />}

          <ProgressBar isVisible={showProgress} onCancel={handleCancel} />

          {results && (
            <>
              <MatchScore results={results} />
              <ResultsDisplay results={results} />
            </>
          )}
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>AI Resume Tailor - Personal Use Only</p>
          <p className="mt-1">Powered by Cloudflare Workers & OpenAI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
