import { useState } from 'react';
import { Mail, Edit } from 'lucide-react';
import PDFPreviewModal from './PDFPreviewModal';

export default function CoverLetterPreviewStep({ coverLetterContent, onNext, onBack, onContentChange, pdfGenerator }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(coverLetterContent);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    onContentChange(content);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-50 border border-primary-200">
            <Mail className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-base font-bold text-gray-900">Preview & Edit Cover Letter</h2>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-sm flex items-center gap-2">
          <Edit className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="p-5">
        {isEditing ? (
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-xs" />
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">{content}</pre>
        )}
      </div>

      <div className="p-5 border-t border-gray-200 flex justify-between">
        <button onClick={onBack} className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-sm">Back</button>
        <div className="flex gap-3">
          <button onClick={() => setShowPreview(true)} className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-sm">Full Preview</button>
          {isEditing ? (
            <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-bold text-sm">Save & Next</button>
          ) : (
            <button onClick={onNext} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-bold text-sm">Next</button>
          )}
        </div>
      </div>

      <PDFPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Cover Letter Preview"
        content={content}
        pdfGenerator={pdfGenerator}
      />
    </div>
  );
}
