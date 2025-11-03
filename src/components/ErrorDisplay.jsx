import { AlertCircle, X } from 'lucide-react';

export default function ErrorDisplay({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-rose-900 mb-1">Something went wrong</h3>
          <p className="text-sm text-rose-800">{error}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-rose-600 hover:text-rose-800 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
