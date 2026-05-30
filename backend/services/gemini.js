const { GoogleGenAI } = require('@google/genai');

const PROMPT_TEMPLATE = `You are a Senior Telugu News Editor and Content Strategist.
Your task is to analyze the following news article and generate a structured analysis in Telugu (except for standard English terms where appropriate, though the primary content should be Telugu).

Provide the output strictly as a JSON object matching this exact schema, without any markdown formatting or code blocks outside the JSON:

{
  "shortSummary": "1-2 sentences summary",
  "mediumSummary": "3-4 sentences summary",
  "detailedSummary": "Comprehensive summary covering all key aspects",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "headlines": {
    "breaking": ["headline 1", "headline 2"],
    "editorial": ["headline 1", "headline 2"],
    "seo": ["headline 1", "headline 2"],
    "social": ["headline 1", "headline 2"]
  },
  "quotes": [
    { "quote": "The actual quote", "speaker": "Speaker Name", "source": "Context or Source" }
  ],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "whatsappSummary": "A format suitable for WhatsApp forwarding, including emojis and bullet points",
  "socialMedia": {
    "twitter": "Twitter post content with hashtags",
    "facebook": "Facebook post content",
    "instagram": "Instagram caption",
    "linkedin": "Professional LinkedIn post"
  }
}

Article Content:
"""
{{ARTICLE_TEXT}}
"""
`;

async function analyzeArticleText(articleText) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = PROMPT_TEMPLATE.replace('{{ARTICLE_TEXT}}', articleText);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    // In @google/genai v2+, response.text is a property, not a function
    const rawText = response.text;
    return JSON.parse(rawText);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze article with Gemini AI: ' + error.message);
  }
}

module.exports = {
  analyzeArticleText
};
