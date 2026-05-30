const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysis');
const exportController = require('../controllers/export');

// API Routes
router.post('/analyze', analysisController.analyzeArticle);
router.post('/export/pdf', exportController.exportPdf);
router.post('/export/txt', exportController.exportTxt);

module.exports = router;
