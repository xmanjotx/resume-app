import { useState, useEffect } from 'react';
import { FileText, X, Loader2, Sparkles } from 'lucide-react';

export default function JobDescriptionInput({ onSubmit, isLoading, onChangeJD, value }) {
  const [jobDescription, setJobDescription] = useState(value || '');
  const [charCount, setCharCount] = useState((value || '').length);

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

  // Sync with external value (from TipsPanel quick examples)
  useEffect(() => {
    if (value !== undefined && value !== jobDescription) {
      setJobDescription(value || '');
      setCharCount((value || '').length);
    }
  }, [value]);

  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;
  const recommended = 600; // recommended characters
  const pct = Math.min(100, Math.round(((charCount || 0) / recommended) * 100));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-md bg-primary-50">
            <FileText className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Job Description</h2>
            <p className="text-xs text-gray-500">Paste the complete job posting</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
          <span className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200">Recommended: ~600+ chars</span>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={jobDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Paste the complete job description here..."
        className="w-full h-72 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none font-mono text-sm placeholder:text-gray-400 bg-white text-gray-900 transition-all duration-200"
        disabled={isLoading}
      />

      {/* Meter + Footer */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span>{charCount} chars • {wordCount} words</span>
            {charCount > 0 && charCount < recommended && (
              <span className="text-warning-500 font-medium">Add more detail for a sharper match</span>
            )}
          </div>
          <div className="hidden sm:block text-gray-500">Press Ctrl/Cmd + Enter</div>
        </div>
        <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-[11px] text-gray-500">Tip: Provide responsibilities, required skills, and context</div>
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
