import { Sparkles } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Resume Tailor</h1>
            <p className="text-xs text-gray-500">AI-Powered Resume Optimization</p>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg border border-primary-200">
          <span className="text-xs font-medium text-primary-600">✨ Powered by AI</span>
        </div>
      </div>
    </div>
  );
}
