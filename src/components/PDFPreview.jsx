import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, Copy, Eye, EyeOff, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFPreview({ title, content, onDownload, onCopy, copied, pdfGenerator }) {
  const [showPreview, setShowPreview] = useState(false);
  const [dividerPos, setDividerPos] = useState(50);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (showPreview && !pdfUrl && pdfGenerator) {
      setPdfLoading(true);
      const generate = async () => {
        const pdfBlob = await pdfGenerator(content);
        setPdfUrl(URL.createObjectURL(pdfBlob));
        setPdfLoading(false);
      };
      generate();
    }
  }, [showPreview, pdfUrl, content, pdfGenerator]);

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
            {pdfLoading ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm font-medium">Generating PDF Preview...</span>
              </div>
            ) : pdfUrl ? (
              <Document file={pdfUrl}>
                <Page pageNumber={1} width={containerRef.current ? (containerRef.current.clientWidth * (100 - dividerPos)) / 100 - 32 : 300} />
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
