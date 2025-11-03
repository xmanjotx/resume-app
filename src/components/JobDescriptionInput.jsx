import { useState } from 'react';
import { FileText, X, Loader2, Sparkles } from 'lucide-react';

export default function JobDescriptionInput({ onSubmit, isLoading, onChangeJD }) {
  const [jobDescription, setJobDescription] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const text = e.target.value;
    setJobDescription(text);
    setCharCount(text.length);
    if (onChangeJD) onChangeJD(text);
  };

  const handleClear = () => {
    setJobDescription('');
    setCharCount(0);
  };

  const handleSubmit = () => {
    if (jobDescription.trim()) {
      onSubmit(jobDescription);
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-md bg-primary-50">
          <FileText className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Job Description</h2>
          <p className="text-xs text-gray-500">Paste the complete job posting</p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={jobDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Paste the complete job description here..."
        className="w-full h-72 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none font-mono text-sm placeholder:text-gray-400 bg-white text-gray-900 transition-all duration-200"
        disabled={isLoading}
      />

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-xs text-gray-500">
          {charCount} characters
          {charCount > 0 && charCount < 100 && (
            <span className="text-warning-500 ml-2 font-medium">• Add more details for better analysis</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClear}
            disabled={!jobDescription || isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 font-medium text-sm"
          >
            <X className="w-4 h-4" />
            Clear
          </button>

          <button
            onClick={handleSubmit}
            disabled={!jobDescription.trim() || isLoading}
            className="px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Resume
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 p-4 bg-blue-50/70 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Analyzing your job description...</strong>
            <br />
            This typically takes 15-30 seconds. We're selecting the best resume and tailoring it for you.
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-slate-500">
        💡 Tip: Press <kbd className="px-2 py-1 bg-slate-100 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-slate-100 rounded">Enter</kbd> to submit
      </div>
    </div>
  );
}
