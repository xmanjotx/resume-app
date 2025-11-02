import { jsPDF } from 'jspdf';

/**
 * ATS-Friendly PDF Generator
 * Uses standard fonts and sizing optimized for Applicant Tracking Systems
 * 
 * ATS Best Practices:
 * - Font: Arial, Calibri, or Times New Roman (standard fonts)
 * - Size: 10-12pt for body text
 * - Margins: 0.5-1 inch (12.7-25.4mm)
 * - Line spacing: 1.15-1.5
 * - No graphics, tables, or special formatting
 * - Simple text-based layout
 */

export function generatePDF(content, filename, title = '') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // ATS-Friendly Settings
  const FONT_FAMILY = 'Arial'; // Standard ATS-compatible font
  const BODY_FONT_SIZE = 11; // Standard resume font size
  const HEADING_FONT_SIZE = 12; // Slightly larger for section headings
  const NAME_FONT_SIZE = 14; // For name/title at top
  
  // Margins (0.75 inches = 19.05mm, standard for resumes)
  const TOP_MARGIN = 15;
  const LEFT_MARGIN = 15;
  const RIGHT_MARGIN = 15;
  const BOTTOM_MARGIN = 15;
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (LEFT_MARGIN + RIGHT_MARGIN);
  
  // Line height for better readability (1.15 spacing)
  const LINE_HEIGHT = 5.5; // ~1.15 line spacing at 11pt
  const SECTION_SPACING = 3; // Space between sections
  const HEADING_SPACING = 2; // Space after heading

  let yPosition = TOP_MARGIN;

  // Set default font
  doc.setFont(FONT_FAMILY, 'normal');
  doc.setFontSize(BODY_FONT_SIZE);

  // Split content into lines
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check if we need a new page (leave bottom margin)
    if (yPosition > pageHeight - BOTTOM_MARGIN - 5) {
      doc.addPage();
      yPosition = TOP_MARGIN;
    }

    // Handle empty lines
    if (line.trim() === '') {
      yPosition += SECTION_SPACING;
      return;
    }

    // Detect line type for formatting
    const trimmedLine = line.trim();
    const isAllCaps = trimmedLine === trimmedLine.toUpperCase();
    const isShortLine = trimmedLine.length < 60;
    const isHeading = isAllCaps && isShortLine && trimmedLine.length > 0;
    
    // Detect if it's a name/title (first non-empty line, usually short and capitalized)
    const isNameOrTitle = index < 5 && trimmedLine.length < 50 && /^[A-Z]/.test(trimmedLine);

    // Set font based on line type
    if (isNameOrTitle && index === 0) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(NAME_FONT_SIZE);
    } else if (isHeading) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(HEADING_FONT_SIZE);
    } else {
      doc.setFont(FONT_FAMILY, 'normal');
      doc.setFontSize(BODY_FONT_SIZE);
    }

    // Split long lines to fit page width
    const splitLines = doc.splitTextToSize(trimmedLine, maxWidth);

    splitLines.forEach((splitLine, lineIndex) => {
      // Check page break again for wrapped lines
      if (yPosition > pageHeight - BOTTOM_MARGIN - 5) {
        doc.addPage();
        yPosition = TOP_MARGIN;
      }

      // Draw text
      doc.text(splitLine, LEFT_MARGIN, yPosition);
      yPosition += LINE_HEIGHT;
    });

    // Add extra space after headings
    if (isHeading) {
      yPosition += HEADING_SPACING;
    }
  });

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const finalFilename = `${filename}_${timestamp}.pdf`;

  // Save the PDF
  doc.save(finalFilename);
}

/**
 * Generate resume PDF
 * @param {string} resumeContent - The resume text content
 */
export function generateResumePDF(resumeContent) {
  generatePDF(resumeContent, 'Tailored_Resume', '');
}

/**
 * Generate cover letter PDF
 * @param {string} coverLetterContent - The cover letter text content
 */
export function generateCoverLetterPDF(coverLetterContent) {
  generatePDF(coverLetterContent, 'Cover_Letter', '');
}
