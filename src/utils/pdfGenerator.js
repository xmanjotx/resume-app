import { jsPDF } from 'jspdf';

/**
 * Generate a PDF from text content
 * @param {string} content - The text content to convert to PDF
 * @param {string} filename - The filename for the PDF
 * @param {string} title - Optional title for the document
 */
export function generatePDF(content, filename, title = '') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set font
  doc.setFont('helvetica');
  
  // Add title if provided
  if (title) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, 20);
    doc.setFont('helvetica', 'normal');
  }

  // Set body font size
  doc.setFontSize(11);
  
  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  const lineHeight = 7;
  
  let yPosition = title ? 30 : 20;

  // Split content into lines
  const lines = content.split('\n');
  
  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = 20;
    }

    // Handle empty lines
    if (line.trim() === '') {
      yPosition += lineHeight / 2;
      return;
    }

    // Check if line looks like a heading (all caps or short line)
    const isHeading = line === line.toUpperCase() && line.length < 50 && line.trim().length > 0;
    
    if (isHeading) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
    }

    // Split long lines to fit page width
    const splitLines = doc.splitTextToSize(line, maxWidth);
    
    splitLines.forEach((splitLine) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(splitLine, margin, yPosition);
      yPosition += lineHeight;
    });

    // Add extra space after headings
    if (isHeading) {
      yPosition += 3;
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
