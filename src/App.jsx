import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import TopBar from './components/TopBar';
import HeroFeatureStrip from './components/HeroFeatureStrip';
import ProcessSteps from './components/ProcessSteps';
import JobDescriptionInput from './components/JobDescriptionInput';
import SmartAnalysis from './components/SmartAnalysis';
import ProgressBar from './components/ProgressBar';
import ResultsDisplay from './components/ResultsDisplay';
import MatchScore from './components/MatchScore';
import ErrorDisplay from './components/ErrorDisplay';
import TipsPanel from './components/TipsPanel';
import OriginalResumesFooter from './components/OriginalResumesFooter';
import ResumeSelector from './components/ResumeSelector';
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
      <TopBar />
      <Header />
      <div className="py-4">
        <HeroFeatureStrip />
      </div>
      <div className="py-4">
        <ProcessSteps isLoading={isLoading || showProgress} hasResults={!!results} />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <ErrorDisplay error={error} onDismiss={handleDismissError} />

        <div className="space-y-8">
          {/* Primary grid: JD input + tips/analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <JobDescriptionInput onSubmit={handleSubmit} isLoading={isLoading} onChangeJD={setJobDescription} value={jobDescription} />
              <ResumeSelector
                resumes={originalResumes}
                selectedResume={selectedResume}
                onSelect={setSelectedResume}
                isLoading={isLoadingResumes}
              />
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

      {/* Original Resumes Footer */}
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
