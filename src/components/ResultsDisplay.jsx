import { CheckCircle, FileText, Mail, Download, Copy, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import { generateProfessionalResumePDF, generateCoverLetterPDF } from '../utils/pdfGenerator';
import ComparisonModal from './ComparisonModal';

export default function ResultsDisplay({ results }) {
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const cleanCoverLetter = (text) => {
    // Remove placeholders like [Company Name], [Hiring Manager's Name], etc.
    return text.replace(/\[(.*?)\]/g, '').replace(/\n\n\n/g, '\n\n');
  };

  const formatResumeForATS = (text) => {
    // Replace common unicode bullets with a standard hyphen for ATS compatibility
    return text.replace(/[•●▪]/g, '-');
  };

  const preprocessResumeForTemplate = (text) => {
    // Ensure all required sections are present for the two-column layout
    const requiredSections = ['SUMMARY', 'SKILLS', 'EXPERIENCE', 'EDUCATION', 'PROJECTS'];
    let processedText = text;
    requiredSections.forEach(section => {
      if (!processedText.includes(`${section}:`)) {
        // Find common variations and replace them
        const regex = new RegExp(`^${section}s?$\n`, 'im');
        if (processedText.match(regex)) {
          processedText = processedText.replace(regex, `${section}:\n`);
        } else {
          // If not found, it might be a parsing issue from the AI.
          // This is a fallback and might need AI prompt tuning.
        }
      }
    });
    return processedText;
  };

  const finalResume = formatResumeForATS(preprocessResumeForTemplate(results.tailoredResume));
  const finalCoverLetter = cleanCoverLetter(results.coverLetter);

  const handleCopyResume = async () => {
    await navigator.clipboard.writeText(finalResume);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handleCopyCoverLetter = async () => {
    await navigator.clipboard.writeText(finalCoverLetter);
    setCopiedCoverLetter(true);
    setTimeout(() => setCopiedCoverLetter(false), 2000);
  };

  const handleDownloadResume = () => {
    generateProfessionalResumePDF(finalResume, 'Tailored_Resume', false);
  };

  const handleDownloadCoverLetter = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const coverLetterWithDate = `${today}\n\n${finalCoverLetter}`;
    generateCoverLetterPDF(coverLetterWithDate, false);
  };

  return (
    <div className="space-y-6">
      {/* Selection Info Card */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-base font-bold text-black mb-3">
              ✓ Resume Selected & Tailored
            </h3>
            <div className="bg-black/5 rounded-lg px-3 py-2 mb-3 inline-flex items-center gap-2 border border-white/40">
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
        {/* Tailored Resume Card */}
        <div className="glass rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Tailored Resume</h3>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-xs text-gray-700 leading-relaxed bg-white/40 border border-white/40 p-4 rounded-lg max-h-60 overflow-y-auto">{finalResume}</pre>
          <button onClick={handleDownloadResume} className="w-full px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-bold text-sm">Download Resume</button>
        </div>

        {/* Cover Letter Card */}
        <div className="glass rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Cover Letter</h3>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-xs text-gray-700 leading-relaxed bg-white/40 border border-white/40 p-4 rounded-lg max-h-60 overflow-y-auto">{finalCoverLetter}</pre>
          <button onClick={handleDownloadCoverLetter} className="w-full px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-bold text-sm">Download Letter</button>
        </div>
      </div>

      {/* Comparison Modal */}
      {results.originalResume && (
        <div className="text-center mt-4">
          <button onClick={() => setShowComparison(true)} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-800 hover:bg-gray-50 flex items-center gap-2 mx-auto">
            <ArrowLeftRight className="w-4 h-4" />
            Compare with Original
          </button>
        </div>
      )}
      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        originalResume={results.originalResume || 'Original resume not available'}
        tailoredResume={finalResume}
      />
    </div>
  );
}
