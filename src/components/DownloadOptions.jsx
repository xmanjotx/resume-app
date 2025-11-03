import { Download, FileText, Copy } from 'lucide-react';
import { useState } from 'react';
import { generateResumePDF, generateCoverLetterPDF } from '../utils/pdfGenerator';

export default function DownloadOptions({ tailoredResume, coverLetter, originalResume }) {
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);

  const handleCopyResume = async () => {
    await navigator.clipboard.writeText(tailoredResume);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handleCopyCoverLetter = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopiedCoverLetter(true);
    setTimeout(() => setCopiedCoverLetter(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tailored Resume */}
      <div className="bg-white border border-black/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-black">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-base font-bold text-black">Tailored Resume</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => generateResumePDF(tailoredResume)}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handleCopyResume}
            className="px-4 py-2 bg-black/5 text-black rounded-lg hover:bg-black/10 transition-colors flex items-center gap-2 font-medium text-sm"
          >
            <Copy className="w-4 h-4" />
            {copiedResume ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Cover Letter */}
      <div className="bg-white border border-black/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-black">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-base font-bold text-black">Cover Letter</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => generateCoverLetterPDF(coverLetter)}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handleCopyCoverLetter}
            className="px-4 py-2 bg-black/5 text-black rounded-lg hover:bg-black/10 transition-colors flex items-center gap-2 font-medium text-sm"
          >
            <Copy className="w-4 h-4" />
            {copiedCoverLetter ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Original Resume */}
      {originalResume && (
        <div className="bg-white border border-black/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-black/20">
              <FileText className="w-4 h-4 text-black" />
            </div>
            <h3 className="text-base font-bold text-black">Original Resume</h3>
            <span className="text-xs text-black/50 font-medium">(for reference)</span>
          </div>
          <button
            onClick={() => {
              const { generateResumePDF: genPDF } = require('../utils/pdfGenerator');
              genPDF(originalResume, 'Original_Resume');
            }}
            className="w-full px-4 py-2 bg-black/5 text-black rounded-lg hover:bg-black/10 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Download Original PDF
          </button>
        </div>
      )}
    </div>
  );
}
