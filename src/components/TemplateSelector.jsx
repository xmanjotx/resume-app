import { Check, FileText } from 'lucide-react';
import { useState } from 'react';
import { TEMPLATES } from '../utils/pdfTemplates';

export default function TemplateSelector({ onTemplateSelect, selectedTemplate, onNext, onBack }) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const handleSelect = (templateId) => {
    onTemplateSelect(templateId);
  };

  return (
    <div className="glass rounded-xl p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-block p-3 rounded-full bg-primary-50 border border-primary-200">
          <FileText className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
        <p className="text-sm text-gray-600">
          Select a professional template for your resume and cover letter
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(TEMPLATES).map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => handleSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={`
                relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-200
                ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                }
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Template Preview Card */}
              <div className="space-y-4">
                {/* Icon & Name */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{template.preview.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-500">{template.style}</p>
                  </div>
                </div>

                {/* Visual Preview Box */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 h-40 overflow-hidden">
                  {template.id === 'classic' && (
                    <div className="space-y-2 text-left">
                      <div className="font-serif font-bold text-base border-b border-gray-400 pb-1">
                        JOHN DOE
                      </div>
                      <div className="font-serif text-xs text-gray-600">
                        john@email.com | 555-0100
                      </div>
                      <div className="font-serif font-bold text-xs underline mt-3">
                        SUMMARY
                      </div>
                      <div className="font-serif text-[10px] text-gray-700 leading-relaxed">
                        Experienced professional with expertise in...
                      </div>
                      <div className="font-serif font-bold text-xs underline">
                        EXPERIENCE
                      </div>
                      <div className="font-serif text-[10px] text-gray-700">
                        • Achievement one
                      </div>
                    </div>
                  )}

                  {template.id === 'modern' && (
                    <div className="space-y-2 text-left">
                      <div className="font-sans font-bold text-base text-blue-600">
                        JOHN DOE
                      </div>
                      <div className="h-px bg-blue-600 w-full"></div>
                      <div className="font-sans text-xs text-gray-600">
                        john@email.com | 555-0100
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="font-sans font-bold text-xs text-blue-600">
                          SUMMARY
                        </div>
                        <div className="h-px bg-blue-600 w-8"></div>
                      </div>
                      <div className="font-sans text-[10px] text-gray-700 leading-snug">
                        Experienced professional with expertise in...
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-sans font-bold text-xs text-blue-600">
                          EXPERIENCE
                        </div>
                        <div className="h-px bg-blue-600 w-8"></div>
                      </div>
                      <div className="font-sans text-[10px] text-gray-700">
                        • Achievement one
                      </div>
                    </div>
                  )}

                  {template.id === 'executive' && (
                    <div className="space-y-2 text-left">
                      <div className="bg-gray-800 -mx-3 -mt-3 px-3 py-2 mb-3">
                        <div className="font-sans font-bold text-sm text-white">
                          JOHN DOE
                        </div>
                      </div>
                      <div className="font-sans text-xs text-gray-600">
                        john@email.com | 555-0100
                      </div>
                      <div className="bg-gray-100 px-2 py-1 inline-block rounded">
                        <div className="font-sans font-bold text-xs text-blue-600">
                          SUMMARY
                        </div>
                      </div>
                      <div className="font-sans text-[10px] text-gray-700 leading-snug">
                        Experienced professional with expertise in...
                      </div>
                      <div className="bg-gray-100 px-2 py-1 inline-block rounded">
                        <div className="font-sans font-bold text-xs text-blue-600">
                          EXPERIENCE
                        </div>
                      </div>
                      <div className="font-sans text-[10px] text-gray-700">
                        • Achievement one
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {template.description}
                </p>

                {/* Features */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-700">Key Features:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {template.preview.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-primary-500"></div>
                        <span className="text-[10px] text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Font Info */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-[10px] text-gray-500">
                    <span className="font-semibold">Font:</span> {template.font}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 text-xl">💡</div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-semibold text-blue-900">
              All templates are ATS-optimized
            </p>
            <p className="text-xs text-blue-700">
              Standard fonts, proper spacing, and clean formatting ensure your resume passes
              Applicant Tracking Systems. You can preview the final PDF before downloading.
            </p>
          </div>
        </div>
      </div>

      {/* Template Details */}
      {selectedTemplate && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-primary-600" />
            <span className="font-semibold text-sm text-gray-900">
              Selected: {TEMPLATES[selectedTemplate].name}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Your resume and cover letter will be formatted with the {TEMPLATES[selectedTemplate].name.toLowerCase()} style.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-sm transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTemplate}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            selectedTemplate
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Preview →
        </button>
      </div>
    </div>
  );
}
