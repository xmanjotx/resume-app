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

export function generatePDF(content, filename, title = '', asBlob = false) {
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
  if (asBlob) {
    return doc.output('blob');
  }

  const finalFilename = `${filename}_${timestamp}.pdf`;
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
export function generateCoverLetterPDF(coverLetterContent, asBlob = false) {
  return generatePDF(coverLetterContent, 'Cover_Letter', '', asBlob);
}

/**
 * Professional IT Architect Resume Template (ATS-Optimized)
 * Best practices for IT/Architecture roles with optimal font sizing and spacing
 * Based on 2024-2025 ATS standards and professional resume design
 */
const icons = {
  phone: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAFNJREFUOE9jZKAQMFKon4F4CyzHSAgAnz4s+A/F/4T4Hw1/NPxH438y/IfxP5L/V/B/I/83/j/D/2v+3wB/Bf5f9v8D/1/8/wP/X/z/A/9f/H8A/wD/X/z/A/8A/wD/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwx/AQAASs4z3d2/9ZAAAAAASUVORK5CYII=',
  email: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIJJREFUOE9jZKAQMFKon4F4CyzHSAgAnz4s+A/F/4T4Hw1/NPxH438y/IfxP5L/V/B/I/83/j/D/2v+3wB/Bf5f9v8D/1/8/wP/X/z/A/9f/H8A/wD/X/z/A/8A/wD/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwx/AQAASs4z3d2/9ZAAAAAASUVORK5CYII=',
  linkedin: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHBJREFUOE9jZKAQMFKon4F4CyzHSAgAnz4s+A/F/4T4Hw1/NPxH438y/IfxP5L/V/B/I/83/j/D/2v+3wB/Bf5f9v8D/1/8/wP/X/z/A/9f/H8A/wD/X/z/A/8A/wD/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwx/AQAASs4z3d2/9ZAAAAAASUVORK5CYII=',
  location: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHZJREFUOE9jZKAQMFKon4F4CyzHSAgAnz4s+A/F/4T4Hw1/NPxH438y/IfxP5L/V/B/I/83/j/D/2v+3wB/Bf5f9v8D/1/8/wP/X/z/A/9f/H8A/wD/X/z/A/8A/wD/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwz/Xwx/AQAASs4z3d2/9ZAAAAAASUVORK5CYII='
};

export function generateProfessionalResumePDF(resumeContent, filename = 'Professional_Resume', asBlob = false) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // --- TEMPLATE STYLING ---
  const NAME_FONT_SIZE = 24;
  const SUBTITLE_FONT_SIZE = 10;
  const SECTION_HEADING_SIZE = 9;
  const BODY_FONT_SIZE = 9;
  const CONTACT_FONT_SIZE = 9;

  const FONT_FAMILY_HEAVY = 'Helvetica'; // For name
  const FONT_FAMILY_NORMAL = 'Helvetica'; // For body

  const PRIMARY_COLOR = '#003366'; // Dark blue
  const TEXT_COLOR = '#333333';
  const LIGHT_TEXT_COLOR = '#666666';

  const LEFT_MARGIN = 15;
  const RIGHT_MARGIN = 15;
  const TOP_MARGIN = 15;
  const BOTTOM_MARGIN = 15;
  const COLUMN_GAP = 10;
  const LEFT_COLUMN_WIDTH = 60;

  const pageWidth = doc.internal.pageSize.getWidth();
  const rightColumnWidth = pageWidth - LEFT_MARGIN - RIGHT_MARGIN - LEFT_COLUMN_WIDTH - COLUMN_GAP;
  const rightColumnX = LEFT_MARGIN + LEFT_COLUMN_WIDTH + COLUMN_GAP;

  let leftY = TOP_MARGIN + 30; // Start Y position for left column
  let rightY = TOP_MARGIN + 30; // Start Y position for right column

  // --- HEADER ---
  const lines = resumeContent.split('\n');
  const name = lines.shift() || 'Your Name';
  const subtitle = lines.shift() || 'Your Professional Title';
  const contactInfo = lines.splice(0, 3);

  doc.setFont(FONT_FAMILY_HEAVY, 'bold');
  doc.setFontSize(NAME_FONT_SIZE);
  doc.setTextColor(PRIMARY_COLOR);
  doc.text(name.toUpperCase(), LEFT_MARGIN, TOP_MARGIN + 5);

  doc.setFont(FONT_FAMILY_NORMAL, 'normal');
  doc.setFontSize(SUBTITLE_FONT_SIZE);
  doc.setTextColor(TEXT_COLOR);
  doc.text(subtitle, LEFT_MARGIN, TOP_MARGIN + 12);

  doc.setDrawColor(PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.line(LEFT_MARGIN, TOP_MARGIN + 15, pageWidth - RIGHT_MARGIN, TOP_MARGIN + 15);

  doc.setFontSize(CONTACT_FONT_SIZE);
  doc.setTextColor(LIGHT_TEXT_COLOR);
  let contactX = LEFT_MARGIN;
  const contactItems = contactInfo.map(info => {
    if (info.includes('@')) return { text: info, icon: icons.email };
    if (info.includes('linkedin')) return { text: info, icon: icons.linkedin };
    if (info.match(/\d{3}/)) return { text: info, icon: icons.phone };
    return { text: info, icon: icons.location };
  });

  contactItems.forEach(item => {
    if (item.text.trim()) {
      doc.addImage(item.icon, 'PNG', contactX, TOP_MARGIN + 19, 4, 4);
      doc.text(item.text.trim(), contactX + 5, TOP_MARGIN + 22);
      contactX += doc.getTextWidth(item.text.trim()) + 15;
    }
  });

  // --- BODY ---
  const sections = {};
  let currentSection = 'SUMMARY'; // Default section
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.endsWith(':') && trimmedLine.length < 30) {
      currentSection = trimmedLine.slice(0, -1).toUpperCase();
      sections[currentSection] = sections[currentSection] || [];
    } else if (trimmedLine) {
      sections[currentSection] = sections[currentSection] || [];
      sections[currentSection].push(line);
    }
  });

  const drawSection = (title, content, column) => {
    let yPos = column === 'left' ? leftY : rightY;
    const xPos = column === 'left' ? LEFT_MARGIN : rightColumnX;
    const colWidth = column === 'left' ? LEFT_COLUMN_WIDTH : rightColumnWidth;

    doc.setFont(FONT_FAMILY_HEAVY, 'bold');
    doc.setFontSize(SECTION_HEADING_SIZE);
    doc.setTextColor(PRIMARY_COLOR);
    doc.text(title, xPos, yPos);
    doc.setDrawColor(PRIMARY_COLOR);
    doc.setLineWidth(0.2);
    doc.line(xPos, yPos + 1, xPos + colWidth, yPos + 1);
    yPos += 5;

    doc.setFont(FONT_FAMILY_NORMAL, 'normal');
    doc.setFontSize(BODY_FONT_SIZE);
    doc.setTextColor(TEXT_COLOR);

    content.forEach(line => {
      const splitLines = doc.splitTextToSize(line, colWidth);
      splitLines.forEach(l => {
        doc.text(l, xPos, yPos);
        yPos += 4;
      });
    });
    yPos += 5;

    if (column === 'left') leftY = yPos;
    else rightY = yPos;
  };

  // Draw sections into columns
  if (sections['SUMMARY']) drawSection('SUMMARY', sections['SUMMARY'], 'left');
  if (sections['PROJECTS']) drawSection('PROJECTS', sections['PROJECTS'], 'left');
  if (sections['KEY ACHIEVEMENTS']) drawSection('KEY ACHIEVEMENTS', sections['KEY ACHIEVEMENTS'], 'left');
  if (sections['SKILLS']) drawSection('SKILLS', sections['SKILLS'], 'left');
  
  if (sections['EXPERIENCE']) drawSection('EXPERIENCE', sections['EXPERIENCE'], 'right');
  if (sections['EDUCATION']) drawSection('EDUCATION', sections['EDUCATION'], 'right');

  // --- FOOTER / SAVE ---
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  if (asBlob) {
    return doc.output('blob');
  }
  const finalFilename = `${filename}_${timestamp}.pdf`;
  doc.save(finalFilename);
}
