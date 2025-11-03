import { BrainCircuit, FileText, ShieldCheck } from 'lucide-react';

export default function HeroFeatureStrip() {
  const items = [
    {
      icon: BrainCircuit,
      title: 'Intelligent Matching',
      desc: 'Analyzes your JD and selects the best resume before tailoring content.'
    },
    {
      icon: FileText,
      title: 'Professional PDFs',
      desc: 'ATS-optimized formatting with clean typography and proper spacing.'
    },
    {
      icon: ShieldCheck,
      title: 'Private by Design',
      desc: 'No data stored. PDFs generated locally in your browser.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((it) => (
          <div
            key={it.title}
            className="group bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:border-primary-200 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-primary-50 border border-primary-200 flex-shrink-0">
              <it.icon className="w-5 h-5 text-primary-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 mb-1">{it.title}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
