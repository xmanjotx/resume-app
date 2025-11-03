import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, Loader2, Download, Copy } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFPreviewModal({ isOpen, onClose, title, content, pdfGenerator, onDownload, onCopy, copied }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (isOpen && !pdfUrl && pdfGenerator) {
      setPdfLoading(true);
      const generate = async () => {
        const pdfBlob = await pdfGenerator(content);
        setPdfUrl(URL.createObjectURL(pdfBlob));
        setPdfLoading(false);
      };
      generate();
    }
    if (!isOpen) {
      setPdfUrl(null); // Reset when closed
    }
  }, [isOpen, pdfUrl, content, pdfGenerator]);

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
          {pdfLoading ? (
            <div className="flex h-full items-center justify-center flex-col gap-2 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-base font-medium">Generating PDF Preview...</span>
            </div>
          ) : pdfUrl ? (
            <Document file={pdfUrl} className="flex justify-center" onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} width={Math.min(800, window.innerWidth - 100)} className="mb-4" />
              ))}
            </Document>
          ) : (
            <div className="text-center text-gray-500">Could not generate PDF preview.</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/30 bg-white/20 flex justify-end gap-3">
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
  );
}
