import { useState, useRef } from 'react';
import { Download, Copy, Eye, EyeOff } from 'lucide-react';

export default function PDFPreview({ title, content, onDownload, onCopy, copied }) {
  const [showPreview, setShowPreview] = useState(false);
  const [dividerPos, setDividerPos] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPos = ((e.clientX - rect.left) / rect.width) * 100;
    
    if (newPos > 20 && newPos < 80) {
      setDividerPos(newPos);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            title={showPreview ? 'Hide preview' : 'Show preview'}
          >
            {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Content Area */}
      {showPreview ? (
        <div
          ref={containerRef}
          className="relative h-96 flex bg-gray-50 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Text Preview */}
          <div style={{ width: `${dividerPos}%` }} className="overflow-y-auto p-4 bg-white">
            <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 leading-relaxed">
              {content}
            </pre>
          </div>

          {/* Divider */}
          <div
            onMouseDown={handleMouseDown}
            className="w-1 bg-primary-300 hover:bg-primary-500 cursor-col-resize transition-colors"
            style={{ userSelect: 'none' }}
          />

          {/* PDF Preview (placeholder) */}
          <div style={{ width: `${100 - dividerPos}%` }} className="overflow-y-auto p-4 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-sm font-medium">PDF Preview</div>
              <div className="text-xs mt-1">Drag divider to adjust</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 max-h-80 overflow-y-auto bg-white/50">
          <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 leading-relaxed">
            {content}
          </pre>
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-5 border-t border-gray-200 flex gap-2 bg-white">
        <button
          onClick={onDownload}
          className="flex-1 px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-white bg-primary-600 hover:bg-primary-700 text-sm"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={onCopy}
          className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium text-sm"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
