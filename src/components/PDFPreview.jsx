import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, Copy, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Optimize PDF.js rendering
pdfjs.GlobalWorkerOptions.cMapUrl = `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`;
pdfjs.GlobalWorkerOptions.cMapPacked = true;

export default function PDFPreview({ title, content, onDownload, onCopy, copied, pdfGenerator }) {
  const [showPreview, setShowPreview] = useState(false);
  const [dividerPos, setDividerPos] = useState(50);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (showPreview && !pdfUrl && pdfGenerator) {
      setPdfLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      
      const timeoutId = setTimeout(() => {
        abortControllerRef.current?.abort();
        setError('PDF generation timed out. Please try again.');
        setPdfLoading(false);
      }, 15000); // 15 second timeout

      const generate = async () => {
        try {
          const pdfBlob = await pdfGenerator(content);
          if (abortControllerRef.current?.signal.aborted) return;
          
          setPdfUrl(URL.createObjectURL(pdfBlob));
          setError(null);
        } catch (e) {
          if (abortControllerRef.current?.signal.aborted) return;
          console.error('Failed to generate PDF preview', e);
          setError('Failed to generate PDF preview. Please try again.');
        } finally {
          clearTimeout(timeoutId);
          setPdfLoading(false);
        }
      };
      generate();
    }
    if (!showPreview) {
      abortControllerRef.current?.abort();
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
      setError(null);
    }
  }, [showPreview, content, pdfGenerator]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, []);

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

          {/* PDF Preview */}
          <div style={{ width: `${100 - dividerPos}%` }} className="overflow-y-auto bg-gray-100 flex items-center justify-center">
            {error ? (
              <div className="flex flex-col items-center gap-2 text-red-600 text-center px-4">
                <AlertCircle className="w-6 h-6" />
                <span className="text-sm font-medium">{error}</span>
                <button
                  onClick={() => {
                    setError(null);
                    setPdfUrl(null);
                  }}
                  className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-xs font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : pdfLoading ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm font-medium">Generating PDF Preview...</span>
                <span className="text-xs text-gray-400">Up to 15 seconds</span>
              </div>
            ) : pdfUrl ? (
              <Document 
                file={pdfUrl}
                onLoadError={(err) => {
                  console.error('PDF load error:', err);
                  setError('Failed to load PDF. Please try again.');
                }}
                loading={<div className="text-gray-400 text-xs">Loading PDF...</div>}
              >
                <Page 
                  pageNumber={1} 
                  width={containerRef.current ? (containerRef.current.clientWidth * (100 - dividerPos)) / 100 - 32 : 300}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={<div className="text-gray-300 text-xs">Loading page...</div>}
                />
              </Document>
            ) : (
              <div className="text-center text-gray-500">PDF preview will appear here.</div>
            )}
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
