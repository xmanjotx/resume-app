import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Resume Tailor</h1>
            <p className="text-gray-600 mt-1">Automatically tailor your resume to any job posting</p>
          </div>
        </div>
      </div>
    </header>
  );
}
