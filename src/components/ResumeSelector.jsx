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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
              <FileText className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Resume Selection</h3>
              <p className="text-xs text-gray-600">Choose a specific resume or let AI auto-select</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Optional
          </span>
        </div>
      </div>
      
      <div className="p-5">
          
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
  );
}
