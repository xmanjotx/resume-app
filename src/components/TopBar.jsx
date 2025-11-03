import { Sparkles } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-black">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Resume Tailor</span>
        </div>
        <div className="text-xs text-black/60 font-medium">Powered by AI</div>
      </div>
    </div>
  );
}
