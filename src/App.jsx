import { useState, useRef, useEffect } from 'react';
import CompactHeader from './components/CompactHeader';
import JobDescriptionInput from './components/JobDescriptionInput';
import ProgressBar from './components/ProgressBar';
import ResultsDisplay from './components/ResultsDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import ResumeSelector from './components/ResumeSelector';
import OriginalResumesFooter from './components/OriginalResumesFooter';
import ResumePreviewStep from './components/ResumePreviewStep';
import CoverLetterPreviewStep from './components/CoverLetterPreviewStep';
import DownloadStep from './components/DownloadStep';
import { tailorResume } from './utils/api';
import { generateProfessionalResumePDF, generateCoverLetterPDF } from './utils/pdfGenerator';

function App() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [editedResume, setEditedResume] = useState('');
  const [editedCoverLetter, setEditedCoverLetter] = useState('');
  const abortControllerRef = useRef(null);

  // Original resumes state
  const [originalResumes, setOriginalResumes] = useState([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [resumesFetchError, setResumesFetchError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null); // null = auto-select

  const handleDownloadOriginal = async (filename) => {
    try {
      const response = await fetch(`https://jobs.trusase.com/download/${filename}`);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      setError('Failed to download original resume.');
    }
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setStep(3); // Move to generating step
    setIsLoading(true);
    setShowProgress(true);
    setError(null);
    setResults(null);

    abortControllerRef.current = new AbortController();

    try {
      const data = await tailorResume(jobDescription, abortControllerRef.current.signal, selectedResume);
      setResults(data);
      setEditedResume(data.tailoredResume);
      setEditedCoverLetter(data.coverLetter);
      setStep(4); // Move to resume preview step
    } catch (err) {
      setError(err.message || 'Failed to generate results.');
      setStep(1); // Go back to start on error
    } finally {
      setIsLoading(false);
      setShowProgress(false);
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
    setStep(1);
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
      <CompactHeader onHome={handleHome} onRestart={handleRestart} showActions={step > 1} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <ErrorDisplay error={error} onDismiss={handleDismissError} />

        <div className="space-y-8">
          {step === 1 && (
            <JobDescriptionInput onSubmit={handleNextStep} isLoading={isLoading} onChangeJD={setJobDescription} value={jobDescription} />
          )}
          {step === 2 && (
            <ResumeSelector resumes={originalResumes} selectedResume={selectedResume} onSelect={setSelectedResume} isLoading={isLoadingResumes} onNext={handleSubmit} onBack={handlePrevStep} />
          )}
          {step === 3 && <ProgressBar isVisible={showProgress} onCancel={handleCancel} />}
          {step === 4 && results && (
            <ResumePreviewStep 
              resumeContent={editedResume} 
              onNext={handleNextStep} 
              onBack={() => setStep(2)} 
              onContentChange={setEditedResume}
              pdfGenerator={async (content) => await generateProfessionalResumePDF(content, 'resume', true)}
            />
          )}
          {step === 5 && results && (
            <CoverLetterPreviewStep 
              coverLetterContent={editedCoverLetter} 
              onNext={handleNextStep} 
              onBack={handlePrevStep} 
              onContentChange={setEditedCoverLetter}
              pdfGenerator={async (content) => await generateCoverLetterPDF(content, true)}
            />
          )}
          {step === 6 && results && (
            <DownloadStep 
              onDownloadResume={() => generateProfessionalResumePDF(editedResume, 'Tailored_Resume')}
              onDownloadCoverLetter={() => generateCoverLetterPDF(editedCoverLetter)}
              onBack={handlePrevStep} 
            />
          )}
        </div>
      </main>

      <OriginalResumesFooter resumes={originalResumes} isLoading={isLoadingResumes} error={resumesFetchError} onRefresh={fetchOriginalResumes} onDownload={handleDownloadOriginal} />

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
