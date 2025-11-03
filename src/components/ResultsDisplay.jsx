import { CheckCircle, FileText, Mail, Download, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { generateResumePDF, generateCoverLetterPDF } from '../utils/pdfGenerator';

export default function ResultsDisplay({ results }) {
  const [resumeExpanded, setResumeExpanded] = useState(true);
  const [coverLetterExpanded, setCoverLetterExpanded] = useState(true);
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);

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
    generateResumePDF(results.tailoredResume);
  };

  const handleDownloadCoverLetter = () => {
    generateCoverLetterPDF(results.coverLetter);
  };

  return (
    <div className="space-y-6">
      {/* Selection Info Card */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-base font-semibold text-emerald-900 mb-2">
              Resume Selected & Tailored
            </h3>
            <div className="bg-white rounded-md px-3 py-2 mb-3 inline-flex items-center gap-2 border border-emerald-100">
              <span className="text-sm font-medium text-slate-900">
                {results.selectedResume}
              </span>
            </div>
            <p className="text-emerald-800 text-sm leading-relaxed">
              {results.reasoning}
            </p>
            <div className="mt-3 text-xs text-emerald-700">
              Analyzed {results.totalResumesAnalyzed} resume{results.totalResumesAnalyzed !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Resume and Cover Letter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tailored Resume */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-500" />
                <h3 className="text-base font-semibold text-slate-900">Tailored Resume</h3>
              </div>
              <button
                onClick={() => setResumeExpanded(!resumeExpanded)}
                className="text-slate-500 hover:text-slate-700"
              >
                {resumeExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {resumeExpanded && (
            <>
              <div className="p-4 max-h-96 overflow-y-auto bg-slate-50">
                <pre className="whitespace-pre-wrap font-mono text-[13px] text-slate-800 leading-relaxed">
                  {results.tailoredResume}
                </pre>
              </div>

              <div className="p-4 border-t border-slate-200 flex gap-2">
                <button
                  onClick={handleDownloadResume}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={handleCopyResume}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copiedResume ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Cover Letter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-500" />
                <h3 className="text-base font-semibold text-slate-900">Cover Letter</h3>
              </div>
              <button
                onClick={() => setCoverLetterExpanded(!coverLetterExpanded)}
                className="text-slate-500 hover:text-slate-700"
              >
                {coverLetterExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {coverLetterExpanded && (
            <>
                <div className="p-4 max-h-96 overflow-y-auto bg-slate-50">
                <pre className="whitespace-pre-wrap font-mono text-[13px] text-slate-800 leading-relaxed">
                  {results.coverLetter}
                </pre>
              </div>

              <div className="p-4 border-t border-slate-200 flex gap-2">
                <button
                  onClick={handleDownloadCoverLetter}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={handleCopyCoverLetter}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copiedCoverLetter ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
