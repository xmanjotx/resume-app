import { jsPDF } from 'jspdf';

/**
 * Professional PDF Templates for Resume & Cover Letter
 * All templates are ATS-optimized with standard fonts and spacing
 */

// ========================================
// TEMPLATE 1: CLASSIC PROFESSIONAL
// Best for: Traditional industries, formal positions
// Font: Times New Roman style (serif)
// Layout: Single column, generous spacing
// ========================================
export function generateClassicTemplate(content, filename, asBlob = false) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
  // Template Settings
  const FONT_FAMILY = 'Times';
  const NAME_SIZE = 16;
  const SECTION_SIZE = 12;
  const BODY_SIZE = 11;
  
  const MARGIN = 20; // 0.79 inches
  const LINE_HEIGHT = 6; // 1.5 spacing
  const SECTION_SPACING = 8;
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (MARGIN * 2);
  
  let yPos = MARGIN;
  
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Page break check
    if (yPos > pageHeight - MARGIN - 10) {
      doc.addPage();
      yPos = MARGIN;
    }
    
    const trimmed = line.trim();
    if (!trimmed) {
      yPos += SECTION_SPACING / 2;
      return;
    }
    
    // Detect line types
    const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length > 2;
    const isHeader = isAllCaps && trimmed.length < 50;
    const isName = index === 0 && trimmed.length < 50;
    
    // Set formatting
    if (isName) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(NAME_SIZE);
      doc.setTextColor(0, 0, 0);
    } else if (isHeader) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(SECTION_SIZE);
      doc.setTextColor(0, 0, 0);
      
      // Add underline for headers
      const textWidth = doc.getTextWidth(trimmed);
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
    } else {
      doc.setFont(FONT_FAMILY, 'normal');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(20, 20, 20);
    }
    
    // Handle text wrapping
    const splitLines = doc.splitTextToSize(trimmed, maxWidth);
    
    splitLines.forEach((splitLine) => {
      if (yPos > pageHeight - MARGIN - 10) {
        doc.addPage();
        yPos = MARGIN;
      }
      
      doc.text(splitLine, MARGIN, yPos);
      yPos += LINE_HEIGHT;
    });
    
    // Add underline after header text
    if (isHeader) {
      const textWidth = doc.getTextWidth(trimmed);
      doc.line(MARGIN, yPos - LINE_HEIGHT + 2, MARGIN + textWidth, yPos - LINE_HEIGHT + 2);
      yPos += 2;
    }
    
    if (isHeader || isName) {
      yPos += 2;
    }
  });
  
  if (asBlob) {
    return doc.output('blob');
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  doc.save(`${filename}_Classic_${timestamp}.pdf`);
  return true;
}

// ========================================
// TEMPLATE 2: MODERN CLEAN
// Best for: Tech, startups, creative roles
// Font: Arial (sans-serif)
// Layout: Clean lines, minimalist
// ========================================
export function generateModernTemplate(content, filename, asBlob = false) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
  // Template Settings
  const FONT_FAMILY = 'Helvetica';
  const NAME_SIZE = 18;
  const SECTION_SIZE = 11;
  const BODY_SIZE = 10;
  
  const MARGIN = 18;
  const LINE_HEIGHT = 5.5;
  const SECTION_SPACING = 6;
  
  const PRIMARY_COLOR = [0, 102, 204]; // Professional blue
  const TEXT_COLOR = [51, 51, 51]; // Dark gray
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (MARGIN * 2);
  
  let yPos = MARGIN;
  
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    if (yPos > pageHeight - MARGIN - 10) {
      doc.addPage();
      yPos = MARGIN;
    }
    
    const trimmed = line.trim();
    if (!trimmed) {
      yPos += SECTION_SPACING / 2;
      return;
    }
    
    const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length > 2;
    const isHeader = isAllCaps && trimmed.length < 50;
    const isName = index === 0 && trimmed.length < 50;
    
    if (isName) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(NAME_SIZE);
      doc.setTextColor(...PRIMARY_COLOR);
    } else if (isHeader) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(SECTION_SIZE);
      doc.setTextColor(...PRIMARY_COLOR);
    } else {
      doc.setFont(FONT_FAMILY, 'normal');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...TEXT_COLOR);
    }
    
    const splitLines = doc.splitTextToSize(trimmed, maxWidth);
    
    splitLines.forEach((splitLine) => {
      if (yPos > pageHeight - MARGIN - 10) {
        doc.addPage();
        yPos = MARGIN;
      }
      
      doc.text(splitLine, MARGIN, yPos);
      yPos += LINE_HEIGHT;
    });
    
    // Add accent line for headers
    if (isHeader) {
      doc.setDrawColor(...PRIMARY_COLOR);
      doc.setLineWidth(0.8);
      doc.line(MARGIN, yPos - LINE_HEIGHT + 2, MARGIN + 30, yPos - LINE_HEIGHT + 2);
      yPos += 2;
    }
    
    if (isName) {
      // Add horizontal line under name
      doc.setDrawColor(...PRIMARY_COLOR);
      doc.setLineWidth(0.3);
      doc.line(MARGIN, yPos - 2, pageWidth - MARGIN, yPos - 2);
      yPos += 4;
    }
  });
  
  if (asBlob) {
    return doc.output('blob');
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  doc.save(`${filename}_Modern_${timestamp}.pdf`);
  return true;
}

// ========================================
// TEMPLATE 3: EXECUTIVE
// Best for: Senior roles, management, consulting
// Font: Arial
// Layout: Bold sections, structured
// ========================================
export function generateExecutiveTemplate(content, filename, asBlob = false) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
  // Template Settings
  const FONT_FAMILY = 'Helvetica';
  const NAME_SIZE = 20;
  const SECTION_SIZE = 12;
  const BODY_SIZE = 10.5;
  
  const MARGIN = 20;
  const LINE_HEIGHT = 5.8;
  const SECTION_SPACING = 7;
  
  const HEADER_BG = [44, 62, 80]; // Dark blue-gray
  const SECTION_COLOR = [41, 128, 185]; // Professional blue
  const TEXT_COLOR = [44, 44, 44];
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (MARGIN * 2);
  
  let yPos = MARGIN;
  let isFirstPage = true;
  
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    if (yPos > pageHeight - MARGIN - 10) {
      doc.addPage();
      yPos = MARGIN;
      isFirstPage = false;
    }
    
    const trimmed = line.trim();
    if (!trimmed) {
      yPos += SECTION_SPACING / 2;
      return;
    }
    
    const isAllCaps = trimmed === trimmed.toUpperCase() && trimmed.length > 2;
    const isHeader = isAllCaps && trimmed.length < 50;
    const isName = index === 0 && trimmed.length < 50;
    
    if (isName && isFirstPage) {
      // Name with background bar
      doc.setFillColor(...HEADER_BG);
      doc.rect(0, yPos - 6, pageWidth, 14, 'F');
      
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(NAME_SIZE);
      doc.setTextColor(255, 255, 255);
      doc.text(trimmed, MARGIN, yPos);
      yPos += 12;
    } else if (isHeader) {
      doc.setFont(FONT_FAMILY, 'bold');
      doc.setFontSize(SECTION_SIZE);
      doc.setTextColor(...SECTION_COLOR);
      
      // Section header with background
      const textWidth = doc.getTextWidth(trimmed);
      doc.setFillColor(240, 240, 240);
      doc.rect(MARGIN - 2, yPos - 5, textWidth + 8, 7, 'F');
      
      doc.text(trimmed, MARGIN, yPos);
      yPos += LINE_HEIGHT + 2;
    } else {
      doc.setFont(FONT_FAMILY, 'normal');
      doc.setFontSize(BODY_SIZE);
      doc.setTextColor(...TEXT_COLOR);
      
      const splitLines = doc.splitTextToSize(trimmed, maxWidth);
      
      splitLines.forEach((splitLine) => {
        if (yPos > pageHeight - MARGIN - 10) {
          doc.addPage();
          yPos = MARGIN;
          isFirstPage = false;
        }
        
        doc.text(splitLine, MARGIN, yPos);
        yPos += LINE_HEIGHT;
      });
    }
  });
  
  if (asBlob) {
    return doc.output('blob');
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  doc.save(`${filename}_Executive_${timestamp}.pdf`);
  return true;
}

// ========================================
// TEMPLATE METADATA
// ========================================
export const TEMPLATES = {
  classic: {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional serif font, formal layout. Best for corporate, legal, finance.',
    font: 'Times New Roman',
    style: 'Formal & Traditional',
    generator: generateClassicTemplate,
    preview: {
      color: '#2c3e50',
      icon: '📋',
      features: ['Serif font', 'Underlined headers', 'Generous spacing', 'ATS-optimized']
    }
  },
  modern: {
    id: 'modern',
    name: 'Modern Clean',
    description: 'Sans-serif, minimalist design. Best for tech, startups, creative roles.',
    font: 'Arial / Helvetica',
    style: 'Clean & Minimal',
    generator: generateModernTemplate,
    preview: {
      color: '#0066cc',
      icon: '✨',
      features: ['Sans-serif font', 'Accent lines', 'Compact layout', 'Modern look']
    }
  },
  executive: {
    id: 'executive',
    name: 'Executive Bold',
    description: 'Bold headers, structured layout. Best for senior roles, management.',
    font: 'Arial / Helvetica',
    style: 'Bold & Structured',
    generator: generateExecutiveTemplate,
    preview: {
      color: '#2c3e50',
      icon: '💼',
      features: ['Bold sections', 'Background accents', 'Professional', 'Leadership roles']
    }
  }
};

// ========================================
// HELPER: Generate with selected template
// ========================================
export async function generateWithTemplate(content, filename, templateId = 'modern', asBlob = false) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        try {
          const template = TEMPLATES[templateId];
          if (!template) {
            reject(new Error(`Template "${templateId}" not found`));
            return;
          }
          
          const result = template.generator(content, filename, asBlob);
          resolve(result);
        } catch (error) {
          console.error('Error generating PDF:', error);
          reject(error);
        }
      }, 50);
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
}
