import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Trash2, Sparkles, Link as LinkIcon, AlignLeft } from "lucide-react";

export default function InputPanel({ onAnalyze, isAnalyzing }) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [inputMode, setInputMode] = useState("text"); // 'text' | 'url'

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleClear = () => {
    setText("");
    setUrl("");
  };

  const handleGenerate = () => {
    onAnalyze({ text, url });
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <AlignLeft className="w-5 h-5 text-primary" />
          Article Workspace
        </h2>
        <div className="flex gap-2">
          <Button 
            variant={inputMode === 'text' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setInputMode('text')}
          >
            Text
          </Button>
          <Button 
            variant={inputMode === 'url' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setInputMode('url')}
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            URL
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        {inputMode === 'text' ? (
          <Textarea
            placeholder="Paste news article text here (Telugu or English)..."
            className="flex-1 min-h-[300px] resize-none border-0 focus-visible:ring-0 shadow-none text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <div className="flex-1 pt-4">
            <Input
              type="url"
              placeholder="https://example.com/news-article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-base"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Note: For the MVP, ensure the URL is accessible without a paywall, or simply paste the text instead.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {inputMode === 'text' && (
            <>
              <div><span className="font-medium text-foreground">{charCount}</span> chars</div>
              <div><span className="font-medium text-foreground">{wordCount}</span> words</div>
            </>
          )}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleClear} disabled={isAnalyzing || (!text && !url)} className="flex-1 sm:flex-none">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button 
            onClick={handleGenerate} 
            disabled={isAnalyzing || (inputMode === 'text' && !text) || (inputMode === 'url' && !url)}
            className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Analysis
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
