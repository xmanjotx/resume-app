import { CheckCircle, FileText, Mail, Download, Copy, ChevronDown, ChevronUp, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import { generateProfessionalResumePDF, generateCoverLetterPDF } from '../utils/pdfGenerator';
import ComparisonModal from './ComparisonModal';

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
        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-black/20 transition-colors">
          <div className="p-5 border-b border-black/10 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-black">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-black">Tailored Resume</h3>
              </div>
              <button
                onClick={() => setResumeExpanded(!resumeExpanded)}
                className="text-black/60 hover:text-black transition-colors"
              >
                {resumeExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {resumeExpanded && (
            <>
              <div className="p-5 max-h-80 overflow-y-auto bg-white/50">
                <pre className="whitespace-pre-wrap font-mono text-[12px] text-black/80 leading-relaxed">
                  {results.tailoredResume}
                </pre>
              </div>

              <div className="p-5 border-t border-black/10 bg-white space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadResume}
                    className="flex-1 px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-white bg-black hover:bg-black/90 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleCopyResume}
                    className="px-4 py-2.5 bg-black/5 text-black rounded-lg hover:bg-black/10 transition-colors flex items-center gap-2 font-medium text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedResume ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                {results.originalResume && (
                  <button
                    onClick={() => setShowComparison(true)}
                    className="w-full px-4 py-2.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    Compare with Original
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Cover Letter */}
        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-black/20 transition-colors">
          <div className="p-5 border-b border-black/10 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-black">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-black">Cover Letter</h3>
              </div>
              <button
                onClick={() => setCoverLetterExpanded(!coverLetterExpanded)}
                className="text-black/60 hover:text-black transition-colors"
              >
                {coverLetterExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {coverLetterExpanded && (
            <>
              <div className="p-5 max-h-80 overflow-y-auto bg-white/50">
                <pre className="whitespace-pre-wrap font-mono text-[12px] text-black/80 leading-relaxed">
                  {results.coverLetter}
                </pre>
              </div>

              <div className="p-5 border-t border-black/10 flex gap-2 bg-white">
                <button
                  onClick={handleDownloadCoverLetter}
                  className="flex-1 px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-white bg-black hover:bg-black/90 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={handleCopyCoverLetter}
                  className="px-4 py-2.5 bg-black/5 text-black rounded-lg hover:bg-black/10 transition-colors flex items-center gap-2 font-medium text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiedCoverLetter ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </>
          )}
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
