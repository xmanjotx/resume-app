import { useState } from 'react';
import { FileText, X, Loader2 } from 'lucide-react';

export default function JobDescriptionInput({ onSubmit, isLoading }) {
  const [jobDescription, setJobDescription] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const text = e.target.value;
    setJobDescription(text);
    setCharCount(text.length);
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
      </div>

      <textarea
        value={jobDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Paste the complete job description here...&#10;&#10;Include the job title, responsibilities, requirements, and any other relevant details."
        className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
        disabled={isLoading}
      />

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          {charCount} characters
          {charCount > 0 && charCount < 100 && (
            <span className="text-amber-600 ml-2">• Add more details for better results</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            disabled={!jobDescription || isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear
          </button>

          <button
            onClick={handleSubmit}
            disabled={!jobDescription.trim() || isLoading}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Tailored Resume
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Analyzing your job description...</strong>
            <br />
            This typically takes 15-30 seconds. We're selecting the best resume and tailoring it for you.
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        💡 Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded">Enter</kbd> to submit
      </div>
    </div>
  );
}
