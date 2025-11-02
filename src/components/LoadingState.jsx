import { Loader2, Brain, FileCheck, Sparkles } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute top-0 right-0 animate-pulse" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">
            Tailoring Your Resume
          </h3>

          <p className="text-gray-600 mt-2">
            Our AI is analyzing the job description and customizing your resume...
          </p>

          <div className="w-full mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Brain className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span>Analyzing job requirements</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <FileCheck className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span>Selecting best matching resume</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Sparkles className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span>Generating tailored content</span>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            This typically takes 15-30 seconds
          </div>
        </div>
      </div>
    </div>
  );
}
