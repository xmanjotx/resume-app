import { FileText, BrainCircuit, Sparkles, Download } from 'lucide-react';

export default function ProcessSteps({ isLoading, hasResults }) {
  const steps = [
    { key: 1, title: 'Paste JD', icon: FileText },
    { key: 2, title: 'Analyze', icon: BrainCircuit },
    { key: 3, title: 'Tailor', icon: Sparkles },
    { key: 4, title: 'Download', icon: Download },
  ];

  const current = hasResults ? 4 : isLoading ? 3 : 1;

  return (
    <div className="mx-auto max-w-7xl px-6 py-2">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const state = s.key < current ? 'done' : s.key === current ? 'active' : 'idle';
          const base = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border font-medium transition-all';
          const cls =
            state === 'done'
              ? 'bg-primary-50 text-primary-700 border-primary-200'
              : state === 'active'
              ? 'bg-primary-600 text-white border-primary-600 shadow-md'
              : 'bg-white text-gray-500 border-gray-200';
          return (
            <li key={s.key} className={`${base} ${cls}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{s.title}</span>
            </li>
          );
        })}
      </div>
    </div>
  );
}
