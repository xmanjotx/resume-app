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
    <div className="bg-white border border-black/10 rounded-2xl p-6 hover:border-black/20 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-black">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-base font-bold text-black">Job Description</h2>
      </div>

      <textarea
        value={jobDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Paste the complete job description here..."
        className="w-full h-56 px-4 py-3 border border-black/10 rounded-xl focus:ring-2 focus:ring-black focus:border-black resize-none font-mono text-sm placeholder:text-black/40 bg-white text-black"
        disabled={isLoading}
      />

      <div className="flex items-center justify-between mt-5">
        <div className="text-sm text-black/60">
          {charCount} characters
          {charCount > 0 && charCount < 100 && (
            <span className="text-black/40 ml-2">• Add more details</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            disabled={!jobDescription || isLoading}
            className="px-4 py-2 text-black bg-black/5 rounded-lg hover:bg-black/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium text-sm"
          >
            <X className="w-4 h-4" />
            Clear
          </button>

          <button
            onClick={handleSubmit}
            disabled={!jobDescription.trim() || isLoading}
            className="px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-bold text-white bg-black hover:bg-black/90 text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
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
