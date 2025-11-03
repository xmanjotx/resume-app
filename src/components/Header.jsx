export default function Header() {
  return (
    <div className="bg-gradient-to-b from-white/80 via-white/60 to-transparent py-10 bg-hero-glow">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent">
          AI Resume Tailor
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Paste any job description and instantly get a tailored resume and cover letter—powered by AI.
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">ATS-optimized PDFs</span>
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">No data stored</span>
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">PDF & TXT support</span>
        </div>
      </div>
    </div>
  );
}
