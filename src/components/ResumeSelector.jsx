import { FileText, Sparkles, Loader2 } from 'lucide-react';

export default function ResumeSelector({ resumes, selectedResume, onSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading available resumes...</span>
        </div>
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary-50 border border-primary-200 flex-shrink-0">
          <FileText className="w-4 h-4 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-bold text-gray-900">Resume Selection</h3>
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">Optional</span>
          </div>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Choose a specific resume or let AI auto-select the best match
          </p>
          
          <div className="flex flex-wrap gap-2">
            {/* Auto-select option */}
            <button
              onClick={() => onSelect(null)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedResume === null
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auto-select (AI)
            </button>

            {/* Individual resume options */}
            {resumes.map((resume) => {
              const cleanName = resume.filename
                .replace(/\.(txt|pdf)$/i, '')
                .replace(/_\d{8}$/i, '')
                .split('_')
                .slice(1)
                .join(' ') || resume.filename;

              return (
                <button
                  key={resume.filename}
                  onClick={() => onSelect(resume.filename)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedResume === resume.filename
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={resume.filename}
                >
                  {cleanName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
