const exportService = require('../services/export');

async function exportPdf(req, res) {
  try {
    const data = req.body;
    if (!data || !data.shortSummary) {
      return res.status(400).json({ error: 'Invalid analysis data provided for export.' });
    }

    const pdfBuffer = await exportService.generatePdfBuffer(data);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=NewsSaar_Analysis.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF.' });
  }
}

async function exportTxt(req, res) {
  try {
    const data = req.body;
    if (!data || !data.shortSummary) {
      return res.status(400).json({ error: 'Invalid analysis data provided for export.' });
    }

    const txtContent = exportService.generateTxtContent(data);
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=NewsSaar_Analysis.txt');
    res.send(txtContent);
  } catch (error) {
    console.error('TXT Export Error:', error);
    res.status(500).json({ error: 'Failed to generate TXT.' });
  }
}

module.exports = {
  exportPdf,
  exportTxt
};
