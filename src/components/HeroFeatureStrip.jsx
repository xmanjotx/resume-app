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
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="group bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
              <it.icon className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{it.title}</div>
              <div className="text-xs text-gray-600 mt-1">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
