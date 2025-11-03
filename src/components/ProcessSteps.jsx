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
    <div className="mx-auto max-w-7xl px-6">
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
        <ol className="grid grid-cols-4 gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const state = s.key < current ? 'done' : s.key === current ? 'active' : 'idle';
            const base = 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors';
            const cls =
              state === 'done'
                ? 'bg-primary-50 text-primary-700 border-primary-200'
                : state === 'active'
                ? 'bg-gray-100 text-gray-900 border-gray-200'
                : 'bg-white text-gray-600 border-gray-200';
            return (
              <li key={s.key} className={`${base} ${cls}`}>
                <Icon className="w-4 h-4" />
                <span className="font-medium">{s.title}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
