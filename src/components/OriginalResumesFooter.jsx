import { Download, FileText, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { generateProfessionalResumePDF } from '../utils/pdfGenerator';

export default function OriginalResumesFooter({ resumes, isLoading, error, onDownload, onRefresh }) {
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
    // Remove .txt extension
    let name = filename.replace('.txt', '');
    
    // Remove date pattern (e.g., _20251101)
    name = name.replace(/_\d{8}$/, '');
    
    // Extract role from "Name_Role" pattern
    const parts = name.split('_');
    if (parts.length > 1) {
      return parts.slice(1).join(' ');
    }
    
    return name;
  };

  const handleDownload = async (filename) => {
    setDownloadingFile(filename);
    try {
      // Fetch the resume text content
      const response = await fetch(
        `https://jobs.trusase.com/download/${encodeURIComponent(filename)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      
      const resumeText = await response.text();
      
      // Extract clean name for PDF filename
      const cleanName = formatResumeName(filename);
      const pdfFilename = `Original_${cleanName.replace(/\s+/g, '_')}`;
      
      // Generate PDF using professional template
      generateProfessionalResumePDF(resumeText, pdfFilename);
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
        <div className="max-w-6xl mx-auto px-6 py-12">
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
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 text-error-500 mb-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
          <p className="text-xs text-gray-600">
            💡 <strong>Note:</strong> The system fetches text files (.txt) from R2. If you uploaded a PDF, please convert it to text format and re-upload as a .txt file.
          </p>
        </div>
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">My Original Resumes</h2>
            </div>
            <p className="text-sm text-gray-600">Download as PDF</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh resumes list"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Resumes Pills */}
        <div className="flex flex-wrap gap-2">
          {resumes.map((resume) => (
            <button
              key={resume.filename}
              onClick={() => handleDownload(resume.filename)}
              disabled={downloadingFile !== null}
              className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              title={`${formatResumeName(resume.filename)} - ${(resume.size / 1024).toFixed(1)} KB`}
            >
              {downloadingFile === resume.filename ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-xs">Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs truncate max-w-xs">
                    {formatResumeName(resume.filename)}
                  </span>
                </>
              )}
            </button>
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
  );
}
