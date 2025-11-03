import { X, ArrowLeftRight } from 'lucide-react';
import { useEffect } from 'react';

export default function ComparisonModal({ isOpen, onClose, originalResume, tailoredResume }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-50">
              <ArrowLeftRight className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Resume Comparison</h2>
              <p className="text-sm text-gray-600">Original vs Tailored</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Resume */}
            <div className="glass-soft rounded-xl overflow-hidden">
              <div className="bg-white/30 border-b border-white/30 px-4 py-3">
                <h3 className="text-sm font-bold text-gray-900">Original Resume</h3>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto bg-white/20">
                <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 leading-relaxed">
                  {originalResume}
                </pre>
              </div>
            </div>

            {/* Tailored Resume */}
            <div className="glass-soft rounded-xl overflow-hidden">
              <div className="bg-white/30 border-b border-white/30 px-4 py-3">
                <h3 className="text-sm font-bold text-primary-900">Tailored Resume</h3>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-xs text-primary-900 leading-relaxed">
                  {tailoredResume}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/30 bg-white/20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
