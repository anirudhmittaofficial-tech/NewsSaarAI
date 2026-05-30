const PDFDocument = require('pdfkit');

function generatePdfBuffer(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Add a header
      doc.fontSize(24).text('NewsSaar AI Analysis Report', { align: 'center' });
      doc.moveDown();

      // Summary Section
      doc.fontSize(16).text('Short Summary');
      doc.fontSize(12).text(data.shortSummary || 'N/A');
      doc.moveDown();

      doc.fontSize(16).text('Detailed Summary');
      doc.fontSize(12).text(data.detailedSummary || 'N/A');
      doc.moveDown();

      // Key Points
      doc.fontSize(16).text('Key Highlights');
      if (data.keyPoints && data.keyPoints.length > 0) {
        data.keyPoints.forEach(point => {
          doc.fontSize(12).text(`• ${point}`);
        });
      } else {
        doc.fontSize(12).text('N/A');
      }
      doc.moveDown();

      // Headlines
      doc.fontSize(16).text('Headlines');
      if (data.headlines) {
        Object.entries(data.headlines).forEach(([category, lines]) => {
          doc.fontSize(14).text(category.toUpperCase());
          if (Array.isArray(lines)) {
            lines.forEach(line => doc.fontSize(12).text(`- ${line}`));
          }
          doc.moveDown(0.5);
        });
      }
      doc.moveDown();

      // Quotes
      doc.fontSize(16).text('Quotes');
      if (data.quotes && data.quotes.length > 0) {
        data.quotes.forEach(q => {
          doc.fontSize(12).text(`"${q.quote}" - ${q.speaker} (${q.source})`);
          doc.moveDown(0.5);
        });
      } else {
        doc.fontSize(12).text('N/A');
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function generateTxtContent(data) {
  let txt = `=== NewsSaar AI Analysis Report ===\n\n`;
  
  txt += `[ SHORT SUMMARY ]\n${data.shortSummary || 'N/A'}\n\n`;
  txt += `[ MEDIUM SUMMARY ]\n${data.mediumSummary || 'N/A'}\n\n`;
  txt += `[ DETAILED SUMMARY ]\n${data.detailedSummary || 'N/A'}\n\n`;

  txt += `[ KEY HIGHLIGHTS ]\n`;
  if (data.keyPoints) {
    data.keyPoints.forEach(point => txt += `• ${point}\n`);
  }
  txt += `\n`;

  txt += `[ HEADLINES ]\n`;
  if (data.headlines) {
    Object.entries(data.headlines).forEach(([category, lines]) => {
      txt += `${category.toUpperCase()}:\n`;
      if (Array.isArray(lines)) {
        lines.forEach(line => txt += `- ${line}\n`);
      }
      txt += `\n`;
    });
  }

  txt += `[ QUOTES ]\n`;
  if (data.quotes) {
    data.quotes.forEach(q => txt += `"${q.quote}" - ${q.speaker} (${q.source})\n`);
  }
  txt += `\n`;

  txt += `[ KEYWORDS ]\n`;
  if (data.keywords) {
    txt += data.keywords.join(', ') + '\n';
  }
  txt += `\n`;

  txt += `[ WHATSAPP SUMMARY ]\n${data.whatsappSummary || 'N/A'}\n\n`;

  txt += `[ SOCIAL MEDIA ]\n`;
  if (data.socialMedia) {
    Object.entries(data.socialMedia).forEach(([platform, content]) => {
      txt += `${platform.toUpperCase()}:\n${content}\n\n`;
    });
  }

  return txt;
}

module.exports = {
  generatePdfBuffer,
  generateTxtContent
};
