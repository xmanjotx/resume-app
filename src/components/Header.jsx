import { Sparkles, ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-slate-900 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI Resume Tailor
              </h1>
              <p className="text-slate-400 mt-2 flex items-center gap-2">
                <span>Intelligent resume customization powered by AI</span>
                <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <div className="inline-block px-4 py-2 rounded-full bg-slate-700/50 border border-slate-600/50">
              <p className="text-sm text-slate-300">
                <span className="text-green-400 font-semibold">●</span> Ready to use
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
