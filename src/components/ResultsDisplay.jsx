import { CheckCircle, FileText, Mail, Download, Copy, ChevronDown, ChevronUp, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import { generateProfessionalResumePDF, generateCoverLetterPDF } from '../utils/pdfGenerator';
import ComparisonModal from './ComparisonModal';
import PDFPreview from './PDFPreview';

export default function ResultsDisplay({ results }) {
  const [resumeExpanded, setResumeExpanded] = useState(true);
  const [coverLetterExpanded, setCoverLetterExpanded] = useState(true);
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleCopyResume = async () => {
    await navigator.clipboard.writeText(results.tailoredResume);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handleCopyCoverLetter = async () => {
    await navigator.clipboard.writeText(results.coverLetter);
    setCopiedCoverLetter(true);
    setTimeout(() => setCopiedCoverLetter(false), 2000);
  };

  const handleDownloadResume = () => {
    generateProfessionalResumePDF(results.tailoredResume, 'Tailored_Resume');
  };

  const handleDownloadCoverLetter = () => {
    // Insert today's date at the top of cover letter
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const coverLetterWithDate = `${today}\n\n${results.coverLetter}`;
    generateCoverLetterPDF(coverLetterWithDate);
  };

  return (
    <div className="space-y-6">
      {/* Selection Info Card */}
      <div className="bg-white border border-black/10 rounded-2xl p-6 hover:border-black/20 transition-colors">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-base font-bold text-black mb-3">
              ✓ Resume Selected & Tailored
            </h3>
            <div className="bg-black/5 rounded-lg px-3 py-2 mb-3 inline-flex items-center gap-2 border border-black/10">
              <span className="text-sm font-semibold text-black">
                {results.selectedResume}
              </span>
            </div>
            <p className="text-black/70 text-sm leading-relaxed">
              {results.reasoning}
            </p>
            <div className="mt-3 text-xs text-black/50 font-medium">
              Analyzed {results.totalResumesAnalyzed} resume{results.totalResumesAnalyzed !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Resume and Cover Letter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tailored Resume */}
        <div>
          <PDFPreview
            title="Tailored Resume"
            content={results.tailoredResume}
            onDownload={handleDownloadResume}
            onCopy={handleCopyResume}
            copied={copiedResume}
          />
          {results.originalResume && (
            <button
              onClick={() => setShowComparison(true)}
              className="w-full mt-3 px-4 py-2.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Compare with Original
            </button>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <PDFPreview
            title="Cover Letter"
            content={results.coverLetter}
            onDownload={handleDownloadCoverLetter}
            onCopy={handleCopyCoverLetter}
            copied={copiedCoverLetter}
          />
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        originalResume={results.originalResume || 'Original resume not available'}
        tailoredResume={results.tailoredResume}
      />
    </div>
  );
}
