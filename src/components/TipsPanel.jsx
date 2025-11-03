import { Info, ShieldCheck, Keyboard, Zap } from 'lucide-react';

export default function TipsPanel() {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 hover:border-black/20 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-black">
          <Info className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-base font-bold text-black">Tips</h3>
      </div>
      <ul className="space-y-3 text-sm text-black/70">
        <li className="flex gap-3">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>Paste the full job description including responsibilities, required skills, and nice-to-haves.</span>
        </li>
        <li className="flex gap-3">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>Add company context (industry, product, team) if available for a sharper match.</span>
        </li>
        <li className="flex gap-3">
          <Keyboard className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
          <span>
            Use <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono">Enter</kbd> to submit quickly.
          </span>
        </li>
        <li className="flex gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>Personal use only. No data stored; PDFs generated locally in your browser.</span>
        </li>
      </ul>
    </div>
  );
}
