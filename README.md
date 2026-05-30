# NewsSaar AI

A production-quality AI-powered Telugu News Summarization Assistant designed for editors, journalists, and content teams. NewsSaar AI transforms raw news articles into structured, publish-ready content including summaries, headlines, social media posts, and WhatsApp updates.

## 🚀 Features

- **Multi-Level Summarization**: Generates short, medium, and detailed summaries of news articles.
- **Smart Headline Generation**: Creates breaking, editorial, SEO-optimized, and social media headlines.
- **Social Media Ready**: Instantly generates formatted posts for Twitter/X, Facebook, Instagram, and LinkedIn.
- **WhatsApp Integration**: Creates bulleted, emoji-rich summaries perfect for WhatsApp forwarding.
- **Key Quotes & Highlights**: Automatically extracts the most important quotes and key points from the text.
- **URL Scraping**: Simply paste a URL and the system will automatically extract and analyze the article.
- **Premium UI**: A sleek, Notion/Linear-inspired dark mode interface built with React, Framer Motion, and Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- shadcn/ui & Radix UI (Component primitives)
- Lucide React (Icons)

**Backend:**
- Node.js + Express.js
- Google Gemini 2.5 Flash API (AI Processing)
- Axios & Cheerio (URL Scraping)
- PDFKit (PDF Exporting - *Implementation in progress*)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js installed on your machine
- A free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anirudhmittaofficial-tech/NewsSaarAI.git
   cd NewsSaarAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   ```

3. **Configure Environment Variables:**
   - Navigate to the `backend` folder.
   - You will see a `.env` file (or create one if it's missing).
   - Add your Gemini API key:
     ```env
     PORT=5000
     GEMINI_API_KEY=your_actual_api_key_here
     ```

4. **Run the Application:**
   From the root folder (`NewsSaarAI`), start both the frontend and backend concurrently:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## 🌐 Deployment Guide

### Backend (Render)
1. Create a Web Service on [Render](https://render.com/).
2. Connect this repository.
3. Set Root Directory to `backend`.
4. Set Build Command to `npm install`.
5. Set Start Command to `node server.js`.
6. Add your `GEMINI_API_KEY` under Environment Variables.

### Frontend (Vercel)
1. Once the backend is deployed, update the `baseURL` in `frontend/src/services/api.js` to point to your new Render URL.
2. Push the changes to GitHub.
3. Import the repository into [Vercel](https://vercel.com/).
4. Set the **Root Directory** to `frontend`.
5. Deploy!

## 📝 License

This project is licensed under the MIT License.
