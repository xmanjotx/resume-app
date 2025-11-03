import { Download, FileText, File, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { generateProfessionalResumePDF } from '../utils/pdfGenerator';

export default function OriginalResumesFooter({ resumes, isLoading, error, onRefresh }) {
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

  const handleDownload = async (filename) => {
    setDownloadingFile(filename);
    try {
      const isPDF = filename.toLowerCase().endsWith('.pdf');

      const response = await fetch(`https://jobs.trusase.com/download/${encodeURIComponent(filename)}`);
      if (!response.ok) throw new Error('Failed to fetch resume');

      if (isPDF) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        const resumeText = await response.text();
        const cleanName = formatResumeName(filename);
        const pdfFilename = `Original_${cleanName.replace(/\s+/g, '_')}`;
        generateProfessionalResumePDF(resumeText, pdfFilename);
      }
    } catch (err) {
      console.error('Error downloading resume as PDF:', err);
      alert('Failed to download resume as PDF');
    } finally {
      setDownloadingFile(null);
    }
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

  if (!resumes || resumes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">My Original Resumes</h2>
                <p className="text-xs text-gray-600">Download text resumes as PDF or get your PDFs directly</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh resumes list"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Resumes Pills */}
          <div className="flex flex-wrap gap-2">
            {resumes.map((resume) => (
              (() => {
                const isPDF = resume.filename.toLowerCase().endsWith('.pdf');
                const baseClasses = 'px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group';
                const colorClasses = isPDF
                  ? 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300'
                  : 'bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100 hover:border-primary-300';
                return (
                  <button
                    key={resume.filename}
                    onClick={() => handleDownload(resume.filename)}
                    disabled={downloadingFile !== null}
                    className={`${baseClasses} ${colorClasses}`}
                    title={`${formatResumeName(resume.filename)} - ${(resume.size / 1024).toFixed(1)} KB`}
                  >
                    {downloadingFile === resume.filename ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="text-xs">Downloading...</span>
                      </>
                    ) : (
                      <>
                        {isPDF ? (
                          <File className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        ) : (
                          <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-xs truncate max-w-xs">
                          {formatResumeName(resume.filename)}
                        </span>
                      </>
                    )}
                  </button>
                );
              })()
            ))}
          </div>

          {/* Info Message */}
          <div className="mt-6 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-xs text-primary-900">
              <span className="font-semibold">💡 Tip:</span> Download your original resumes to compare with tailored versions, or use them for other job applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
