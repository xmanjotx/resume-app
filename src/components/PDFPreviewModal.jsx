import { useEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, Loader2, Download, Copy, AlertCircle } from 'lucide-react';

// Use classic worker (JS) instead of ESM to avoid fallback to main-thread parsing in some bundlers
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Optimize PDF.js rendering
pdfjs.GlobalWorkerOptions.cMapUrl = `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`;
pdfjs.GlobalWorkerOptions.cMapPacked = true;

export default function PDFPreviewModal({ isOpen, onClose, title, content, pdfGenerator, onDownload, onCopy, copied }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [showAllPages, setShowAllPages] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (isOpen && !pdfUrl && pdfGenerator) {
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
          
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
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
    if (!isOpen) {
      // cleanup any existing object URL when closing
      abortControllerRef.current?.abort();
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
      setError(null);
      setNumPages(null);
      setShowAllPages(false);
    }
  }, [isOpen, content, pdfGenerator]);

  // Revoke object URL on unmount or when new one is created
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/30">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/30 transition-colors" aria-label="Close">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-white/20 p-4 border-t border-white/20">
          {error ? (
            <div className="flex h-full items-center justify-center flex-col gap-3 text-red-600">
              <AlertCircle className="w-8 h-8" />
              <div className="text-center">
                <p className="text-base font-semibold">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setPdfUrl(null);
                  }}
                  className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : pdfLoading ? (
            <div className="flex h-full items-center justify-center flex-col gap-3 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin" />
              <div className="text-center">
                <span className="text-base font-medium">Generating PDF Preview...</span>
                <p className="text-xs text-gray-400 mt-1">This may take up to 15 seconds</p>
              </div>
            </div>
          ) : pdfUrl ? (
            <Document
              file={pdfUrl}
              className="flex flex-col items-center"
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={(err) => {
                console.error('PDF load error:', err);
                setError('Failed to load PDF. Please try again.');
              }}
              loading={<div className="text-gray-400 text-sm">Loading PDF...</div>}
            >
              {Array.from(new Array(showAllPages ? numPages : Math.min(2, numPages || 0)), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={Math.min(800, window.innerWidth - 100)}
                  className="mb-4 shadow-sm rounded"
                  loading={<div className="text-gray-300 text-xs">Loading page...</div>}
                />
              ))}
            </Document>
          ) : (
            <div className="text-center text-gray-500">Could not generate PDF preview.</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/30 bg-white/20 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-gray-600">
            {numPages ? `${showAllPages ? numPages : Math.min(2, numPages)} of ${numPages} page(s) shown` : ''}
          </div>
          <div className="flex gap-3 ml-auto">
            {numPages > 2 && (
              <button
                onClick={() => setShowAllPages((s) => !s)}
                className="px-4 py-2.5 bg-white/40 text-gray-800 rounded-lg hover:bg-white/60 transition-colors text-sm font-semibold"
              >
                {showAllPages ? 'Show fewer pages' : 'Show all pages'}
              </button>
            )}
          <button
            onClick={onCopy}
            className="px-5 py-2.5 bg-white/40 text-gray-800 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-2 font-semibold text-sm"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            onClick={onDownload}
            className="px-6 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-bold text-white bg-primary-600 hover:bg-primary-700 text-sm shadow-md"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
