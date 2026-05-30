const geminiService = require('../services/gemini');
const axios = require('axios');
const cheerio = require('cheerio');

async function analyzeArticle(req, res) {
  try {
    const { text, url } = req.body;

    if (!text && !url) {
      return res.status(400).json({ error: 'Please provide article text or URL.' });
    }

    let articleText = text;

    // If URL is provided but no text, try to scrape it
    if (url && !text) {
      try {
        const { data } = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        const $ = cheerio.load(data);
        // Remove scripts and styles
        $('script, style, nav, header, footer, aside').remove();
        articleText = $('body').text().replace(/\s+/g, ' ').trim();
      } catch (scrapeError) {
        console.error('Scraping Error:', scrapeError);
        return res.status(400).json({ error: 'Failed to extract text from the provided URL. Please paste the article text manually.' });
      }
    }

    if (!articleText) {
      return res.status(400).json({ error: 'Could not extract any text. Please paste the text manually.' });
    }

    const analysisResult = await geminiService.analyzeArticleText(articleText);

    res.json(analysisResult);
  } catch (error) {
    console.error('Analysis Controller Error:', error);
    // Determine if it's an API key error
    if (error.message && error.message.includes('API_KEY')) {
      return res.status(500).json({ error: 'Gemini API Key is missing or invalid. Please check backend/.env file.' });
    }
    res.status(500).json({ error: 'Failed to generate analysis. Ensure your Gemini API Key is valid and try again.' });
  }
}

module.exports = {
  analyzeArticle
};
