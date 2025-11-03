import { Download, FileText, File, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { generateProfessionalResumePDF } from '../utils/pdfGenerator';

export default function OriginalResumesFooter({ resumes, isLoading, error, onRefresh, onDownload }) {
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatResumeName = (filename) => {
    let name = filename;
    name = name.replace(/\.(txt|pdf)$/i, '');
    name = name.replace(/_\d{8}$/i, '');
    const parts = name.split('_');
    if (parts.length > 1) return parts.slice(1).join(' ');
    return name;
  };


  if (isLoading) {
    return (
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
            <span className="text-gray-600">Loading your resumes...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 text-error-500 mb-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
          <p className="text-xs text-gray-600">
            💡 <strong>Note:</strong> The system supports both text (.txt) and PDF (.pdf) resumes. Text files are converted to a professional PDF; PDFs download directly.
          </p>
        </div>
      </div>
    );
  }

  const txtResumes = resumes.filter(r => r.filename.endsWith('.txt'));
  const pdfResumes = resumes.filter(r => r.filename.endsWith('.pdf'));

  const renderResumeButton = (resume) => {
    const isPDF = resume.filename.toLowerCase().endsWith('.pdf');
    const cleanName = formatResumeName(resume.filename);
    const colorClasses = isPDF
      ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
      : 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100';

    return (
      <button
        key={resume.filename}
        onClick={() => onDownload(resume.filename)}
        disabled={downloadingFile === resume.filename}
        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-2 ${colorClasses}`}
        title={`${cleanName} (${(resume.size / 1024).toFixed(1)} KB)`}
      >
        {downloadingFile === resume.filename ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isPDF ? (
          <File className="w-3.5 h-3.5" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        <span className="truncate max-w-xs">{cleanName}</span>
      </button>
    );
  };

  if (!resumes || resumes.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 max-w-4xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary-50 border border-primary-200">
            <FileText className="w-4 h-4 text-primary-600" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">My Original Resumes</h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh resumes list"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* TXT */}
        {txtResumes.length > 0 && (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-2">TXT</div>
            <div className="flex flex-wrap gap-2">
              {txtResumes.map(renderResumeButton)}
            </div>
          </div>
        )}

        {/* PDF */}
        {pdfResumes.length > 0 && (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-2">PDF</div>
            <div className="flex flex-wrap gap-2">
              {pdfResumes.map(renderResumeButton)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
