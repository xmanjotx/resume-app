import { useState, useRef } from 'react';
import Header from './components/Header';
import TopBar from './components/TopBar';
import JobDescriptionInput from './components/JobDescriptionInput';
import SmartAnalysis from './components/SmartAnalysis';
import LoadingState from './components/LoadingState';
import ProgressBar from './components/ProgressBar';
import ResultsDisplay from './components/ResultsDisplay';
import MatchScore from './components/MatchScore';
import ErrorDisplay from './components/ErrorDisplay';
import TipsPanel from './components/TipsPanel';
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
    <div className="min-h-screen bg-white">
      <TopBar />

      <main className="max-w-6xl mx-auto px-6 py-6">
        <ErrorDisplay error={error} onDismiss={handleDismissError} />

        <div className="space-y-8">
          {/* Primary grid: JD input + tips/analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <JobDescriptionInput onSubmit={handleSubmit} isLoading={isLoading} onChangeJD={setJobDescription} />
            </div>
            <div className="lg:col-span-1">
              {jobDescription ? (
                !isLoading && <SmartAnalysis jobDescription={jobDescription} />
              ) : (
                <TipsPanel onPick={(text) => setJobDescription(text)} />
              )}
            </div>
          </div>

          <ProgressBar isVisible={showProgress} onCancel={handleCancel} />

          {results && (
            <>
              <MatchScore results={results} />
              <ResultsDisplay results={results} />
            </>
          )}
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p className="font-medium text-slate-700">AI Resume Tailor</p>
          <p className="mt-1">Personal use • Powered by Cloudflare Workers & OpenAI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
