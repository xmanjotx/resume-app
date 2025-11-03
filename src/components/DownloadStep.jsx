import { Download, FileText, Mail } from 'lucide-react';

export default function DownloadStep({ onDownloadResume, onDownloadCoverLetter, onBack }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Documents Are Ready!</h2>
      <p className="text-gray-600 mb-8">Download your tailored resume and cover letter below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Download Resume */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 flex flex-col items-center">
          <FileText className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-bold text-primary-900 mb-4">Tailored Resume</h3>
          <button onClick={onDownloadResume} className="w-full px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-bold text-base flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Download Cover Letter */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center">
          <Mail className="w-12 h-12 text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cover Letter</h3>
          <button onClick={onDownloadCoverLetter} className="w-full px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 font-bold text-base flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="mt-8">
        <button onClick={onBack} className="text-sm font-semibold text-gray-600 hover:text-gray-800">Back to Cover Letter</button>
      </div>
    </div>
  );
}
