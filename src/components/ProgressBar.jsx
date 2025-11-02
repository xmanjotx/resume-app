import { X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProgressBar({ isVisible, onCancel }) {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(25);
  const [startTime, setStartTime] = useState(null);

  const statusStages = [
    { time: 0, progress: 0, message: 'Initializing...', icon: '🚀' },
    { time: 3000, progress: 20, message: 'Fetching your resumes...', icon: '📄' },
    { time: 6000, progress: 35, message: 'Analyzing job description...', icon: '🔍' },
    { time: 10000, progress: 50, message: 'Selecting best resume match...', icon: '⚙️' },
    { time: 15000, progress: 65, message: 'Tailoring resume content...', icon: '✨' },
    { time: 20000, progress: 80, message: 'Generating cover letter...', icon: '📝' },
    { time: 25000, progress: 90, message: 'Finalizing documents...', icon: '⏳' },
  ];

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStatusMessage('');
      setEstimatedTimeRemaining(25);
      setStartTime(null);
      return;
    }

    // Initialize start time
    if (!startTime) {
      setStartTime(Date.now());
    }

    const progressInterval = setInterval(() => {
      if (!startTime) return;

      const elapsed = Date.now() - startTime;

      // Find current stage
      const stage = statusStages.findLast((s) => elapsed >= s.time);
      if (stage) {
        setProgress(stage.progress);
        setStatusMessage(stage.message);
        setEstimatedTimeRemaining(Math.max(0, Math.ceil((25000 - elapsed) / 1000)));
      }
    }, 500);

    return () => clearInterval(progressInterval);
  }, [isVisible, startTime]);

  if (!isVisible) return null;

  const currentStage = statusStages.find(
    (s) => s.progress === progress
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Zap className="w-5 h-5 text-primary-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Tailoring Your Resume
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-700">
            {currentStage?.icon} {statusMessage}
          </div>
          <div className="text-sm font-semibold text-primary-600">{progress}%</div>
        </div>

        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {/* Shimmer effect */}
            {progress > 0 && progress < 100 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Status and Time Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-600">
          {progress === 100 ? (
            <span className="text-green-600 font-medium flex items-center gap-1">
              ✓ Your tailored resume is ready!
            </span>
          ) : (
            <span>
              Estimated time remaining:{' '}
              <span className="font-semibold text-gray-900">
                ~{estimatedTimeRemaining}s
              </span>
            </span>
          )}
        </div>

        {progress < 100 && (
          <button
            onClick={onCancel}
            className="px-3 py-1 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Animated dots */}
      {progress < 100 && (
        <div className="mt-4 flex justify-center gap-1">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
    </div>
  );
}
