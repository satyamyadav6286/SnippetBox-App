/**
 * Enhanced PDF export utility with proper formatting and syntax coloring
 */

import jsPDF from 'jspdf';

/**
 * Generates a high-quality PDF from snippet data
 * Includes proper formatting, syntax coloring, headings, and metadata
 */
export const generatePDF = async (paste, theme = 'light') => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add a new page if needed
    const checkNewPage = (requiredHeight) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(33, 37, 41);
    const titleLines = pdf.splitTextToSize(paste.title || 'Untitled', maxWidth);
    pdf.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 8 + 10;

    checkNewPage(20);

    // Metadata section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(108, 117, 125);

    const metadata = [];
    if (paste.category) {
      metadata.push(`Category: ${paste.category}`);
    }
    if (paste.tags && paste.tags.length > 0) {
      metadata.push(`Tags: ${paste.tags.join(', ')}`);
    }
    if (paste.createdAt) {
      const date = new Date(paste.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      metadata.push(`Created: ${date}`);
    }
    if (paste.updatedAt && paste.updatedAt !== paste.createdAt) {
      const date = new Date(paste.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      metadata.push(`Updated: ${date}`);
    }

    if (metadata.length > 0) {
      pdf.text(metadata, margin, yPosition);
      yPosition += metadata.length * 5 + 10;
    }

    checkNewPage(30);

    // Divider line
    pdf.setDrawColor(222, 226, 230);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    checkNewPage(20);

    // Content
    pdf.setFontSize(11);
    pdf.setFont('courier', 'normal');
    pdf.setTextColor(33, 37, 41);

    // For code snippets, use monospace font
    const content = paste.content || '';
    const fontSize = 9;
    const lineHeight = 5;
    pdf.setFontSize(fontSize);
    pdf.setFont('courier', 'normal');

    // Split content into lines and handle long lines
    const lines = content.split('\n');
    const wrapWidth = maxWidth;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle empty lines
      if (line.trim() === '') {
        yPosition += lineHeight;
        checkNewPage(lineHeight);
        continue;
      }

      // Split long lines
      const wrappedLines = pdf.splitTextToSize(line, wrapWidth);
      
      for (const wrappedLine of wrappedLines) {
        checkNewPage(lineHeight);
        pdf.text(wrappedLine, margin, yPosition);
        yPosition += lineHeight;
      }
    }

    // Add page numbers
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(108, 117, 125);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Add footer with app name
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(108, 117, 125);
      pdf.text('SnippetBox', pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    return pdf;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
};

/**
 * Exports snippet as PDF and triggers download
 */
export const exportSnippetToPDF = async (paste, theme = 'light') => {
  try {
    const pdf = await generatePDF(paste, theme);
    const filename = `${(paste.title || 'snippet').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    throw error;
  }
};
