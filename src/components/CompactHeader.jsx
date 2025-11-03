import { Home, RotateCcw, Sparkles } from 'lucide-react';

export default function CompactHeader({ onHome, onRestart, showActions }) {
  return (
    <div className="sticky top-0 z-50 bg-gray-50 py-3">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-full shadow-md border border-gray-200 px-6 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">AI Resume Tailor</span>
          </div>

          {/* Action Buttons - Always visible */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRestart}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Start new application"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Application</span>
              <span className="sm:hidden">New</span>
            </button>
            <button
              onClick={onHome}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              title="Go to top"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
