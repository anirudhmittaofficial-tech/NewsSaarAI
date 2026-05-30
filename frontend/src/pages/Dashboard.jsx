import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import InputPanel from "../components/workspace/InputPanel";
import ResultsPanel from "../components/workspace/ResultsPanel";
import { analyzeArticle, exportToPdf, exportToTxt } from "../services/api";
import { Button } from "../components/ui/button";
import { Download, FileText, File } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async ({ text, url }) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeArticle(text, url);
      setResult(data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to connect to the server or generate analysis. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportPdf = async () => {
    if (!result) return;
    try {
      await exportToPdf(result);
    } catch (err) {
      console.error("PDF Export failed:", err);
    }
  };

  const handleExportTxt = async () => {
    if (!result) return;
    try {
      await exportToTxt(result);
    } catch (err) {
      console.error("TXT Export failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container max-w-screen-2xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Analyze and transform Telugu news articles instantly.</p>
          </div>
          
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 mt-4 md:mt-0"
            >
              <Button variant="outline" size="sm" onClick={handleExportTxt}>
                <FileText className="w-4 h-4 mr-2" />
                Export TXT
              </Button>
              <Button size="sm" onClick={handleExportPdf}>
                <File className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </motion.div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
          {/* Left Panel: Input */}
          <div className="lg:col-span-5 h-full">
            <InputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* Right Panel: Results */}
          <div className="lg:col-span-7 h-full">
            <ResultsPanel result={result} />
          </div>
        </div>
      </main>
    </div>
  );
}
