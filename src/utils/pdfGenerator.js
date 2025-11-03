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
 * Generate resume PDF with custom filename
 * @param {string} resumeContent - The resume text content
 * @param {string} customFilename - Optional custom filename (without extension)
 */
export function generateResumePDF(resumeContent, customFilename = 'Tailored_Resume') {
  generatePDF(resumeContent, customFilename, '');
}

/**
 * Generate original resume PDF
 * @param {string} resumeContent - The original resume text content
 */
export function generateOriginalResumePDF(resumeContent) {
  generatePDF(resumeContent, 'Original_Resume', '');
}

/**
 * Generate cover letter PDF
 * @param {string} coverLetterContent - The cover letter text content
 */
export function generateCoverLetterPDF(coverLetterContent) {
  generatePDF(coverLetterContent, 'Cover_Letter', '');
}

/**
 * Professional IT Architect Resume Template (ATS-Optimized)
 * Best practices for IT/Architecture roles with optimal font sizing and spacing
 * Based on 2024-2025 ATS standards and professional resume design
 */
export function generateProfessionalResumePDF(resumeContent, filename = 'Professional_Resume') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // OPTIMAL SETTINGS FOR IT ARCHITECT RESUMES
  // Font: Calibri (best for IT/tech roles, highly ATS-friendly)
  // Based on Microsoft Word and LinkedIn best practices
  const FONT_FAMILY = 'Calibri';
  
  // Font Sizes (optimized for readability + ATS)
  const NAME_FONT_SIZE = 14;           // Professional, not too large
  const SECTION_HEADING_SIZE = 11;     // Clear section breaks
  const COMPANY_ROLE_SIZE = 10;        // Company name
  const BODY_FONT_SIZE = 10;           // Standard body text
  const DATE_FONT_SIZE = 9.5;          // Dates (slightly smaller)
  
  // Margins: 1 inch (25.4mm) standard for professional resumes
  const TOP_MARGIN = 12.7;      // 0.5 inch
  const LEFT_MARGIN = 12.7;     // 0.5 inch
  const RIGHT_MARGIN = 12.7;    // 0.5 inch
  const BOTTOM_MARGIN = 12.7;   // 0.5 inch
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (LEFT_MARGIN + RIGHT_MARGIN);
  
  // Spacing (optimized for readability)
  const LINE_HEIGHT = 4.8;              // 1.15 line spacing (professional standard)
  const SECTION_SPACING = 3;            // Space between sections
  const SUBSECTION_SPACING = 1.5;       // Space within sections
  const BULLET_INDENT = 4;              // Bullet point indentation

  let yPosition = TOP_MARGIN;
  let isFirstLine = true;

  const lines = resumeContent.split('\n');

  lines.forEach((line, index) => {
    // Smart page break (leave room for footer)
    if (yPosition > pageHeight - BOTTOM_MARGIN - 5) {
      doc.addPage();
      yPosition = TOP_MARGIN;
    }

    if (line.trim() === '') {
      yPosition += SUBSECTION_SPACING;
      return;
    }

    const trimmedLine = line.trim();
    const isAllCaps = trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3;
    const isBulletPoint = trimmedLine.startsWith('•') || trimmedLine.startsWith('-');
    const isNameOrTitle = isFirstLine && trimmedLine.length < 50;
    const hasDate = /\d{4}|January|February|March|April|May|June|July|August|September|October|November|December|Present|Current/.test(trimmedLine);
    const isCompanyRole = /^[A-Z][a-zA-Z\s]+$/.test(trimmedLine) && trimmedLine.length > 5 && trimmedLine.length < 60 && !isAllCaps;

    // Determine font and size
    if (isNameOrTitle) {
      // Name header - bold, professional size
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(NAME_FONT_SIZE);
      isFirstLine = false;
    } else if (isAllCaps && trimmedLine.length < 40) {
      // Section headers - bold, with visual separator
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(SECTION_HEADING_SIZE);
      yPosition += LINE_HEIGHT * 0.5;
      
      // Add subtle underline for section headers
      const textWidth = doc.getTextWidth(trimmedLine);
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.line(LEFT_MARGIN, yPosition + 1, LEFT_MARGIN + textWidth, yPosition + 1);
    } else if (isBulletPoint) {
      // Bullet points - regular weight, standard size
      doc.setFont(FONT_FAMILY, 'normal');
      doc.setFontSize(BODY_FONT_SIZE);
    } else if (hasDate) {
      // Dates and duration - slightly smaller, italic
      doc.setFont(FONT_FAMILY, 'italic');
      doc.setFontSize(DATE_FONT_SIZE);
    } else if (isCompanyRole) {
      // Company/Role names - bold, professional
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(COMPANY_ROLE_SIZE);
    } else {
      // Regular body text
      doc.setFont(FONT_FAMILY, 'normal');
      doc.setFontSize(BODY_FONT_SIZE);
    }

    // Split long lines for proper wrapping
    const splitLines = doc.splitTextToSize(trimmedLine, maxWidth - (isBulletPoint ? BULLET_INDENT : 0));

    splitLines.forEach((splitLine, splitIndex) => {
      // Check page break for wrapped lines
      if (yPosition > pageHeight - BOTTOM_MARGIN - 5) {
        doc.addPage();
        yPosition = TOP_MARGIN;
      }

      // Position text (indent bullets)
      const xPosition = isBulletPoint && splitIndex === 0 ? LEFT_MARGIN + BULLET_INDENT : LEFT_MARGIN;
      doc.text(splitLine, xPosition, yPosition);
      yPosition += LINE_HEIGHT;
    });

    // Add spacing after section headers
    if (isAllCaps && trimmedLine.length < 40) {
      yPosition += SECTION_SPACING;
    }
  });

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const finalFilename = `${filename}_${timestamp}.pdf`;
  doc.save(finalFilename);
}
