import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2, Download, MessageCircle, Hash, Globe, Image as ImageIcon, Briefcase, Quote as QuoteIcon, CheckCircle2 } from "lucide-react";

export default function ResultsPanel({ result }) {
  const [copied, setCopied] = useState("");

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground border-2 border-dashed rounded-xl p-8 bg-card/50">
        <SparklesIcon className="w-12 h-12 mb-4 opacity-20" />
        <p>No analysis generated yet.</p>
        <p className="text-sm opacity-70">Paste an article and click Generate Analysis.</p>
      </div>
    );
  }

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const CopyButton = ({ text, id }) => (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(text, id)}>
      {copied === id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </Button>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/20">
        <h2 className="font-semibold text-lg">AI Analysis Results</h2>
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto bg-transparent p-0 gap-2 border-b rounded-none h-auto pb-px">
            <TabsTrigger value="summary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent py-2">Summary</TabsTrigger>
            <TabsTrigger value="highlights" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent py-2">Highlights</TabsTrigger>
            <TabsTrigger value="headlines" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent py-2">Headlines</TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent py-2">Social & PR</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="summary" className="m-0 focus-visible:ring-0 outline-none">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
                
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-semibold text-primary">Short Summary</CardTitle>
                      <CopyButton text={result.shortSummary} id="shortSummary" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm leading-relaxed">{result.shortSummary}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-semibold text-primary">Detailed Summary</CardTitle>
                      <CopyButton text={result.detailedSummary} id="detailedSummary" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm leading-relaxed">{result.detailedSummary}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords?.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1 font-medium">{kw}</Badge>
                    ))}
                  </div>
                </motion.div>

              </motion.div>
            </TabsContent>

            <TabsContent value="highlights" className="m-0 focus-visible:ring-0 outline-none">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
                <Card>
                  <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0 pb-2 border-b mb-4">
                    <CardTitle className="text-base font-semibold text-primary">Key Points</CardTitle>
                    <CopyButton text={result.keyPoints?.join('\n')} id="keyPoints" />
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.keyPoints?.map((point, i) => (
                        <motion.li variants={itemVariants} key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-4 border-b mb-4">
                    <CardTitle className="text-base font-semibold text-primary">Important Quotes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.quotes?.length > 0 ? result.quotes.map((q, i) => (
                      <motion.div variants={itemVariants} key={i} className="bg-muted/50 p-4 rounded-lg relative">
                        <QuoteIcon className="w-8 h-8 text-primary/20 absolute top-2 right-2" />
                        <p className="text-sm italic font-medium mb-2 leading-relaxed">"{q.quote}"</p>
                        <p className="text-xs text-muted-foreground">— <span className="font-semibold text-foreground">{q.speaker}</span>, {q.source}</p>
                      </motion.div>
                    )) : <p className="text-sm text-muted-foreground">No notable quotes found.</p>}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="headlines" className="m-0 focus-visible:ring-0 outline-none">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {Object.entries(result.headlines || {}).map(([category, lines], index) => (
                  <motion.div variants={itemVariants} key={index}>
                    <Card className="h-full">
                      <CardHeader className="py-3 bg-muted/30 border-b">
                        <CardTitle className="text-sm font-semibold capitalize flex items-center justify-between">
                          {category} Headlines
                          <CopyButton text={lines?.join('\n')} id={`hl_${category}`} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-3">
                          {lines?.map((line, i) => (
                            <li key={i} className="text-sm flex gap-2">
                              <span className="text-primary/50 font-bold">{i + 1}.</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

              </motion.div>
            </TabsContent>

            <TabsContent value="social" className="m-0 focus-visible:ring-0 outline-none">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
                
                <motion.div variants={itemVariants}>
                  <Card className="border-green-200 dark:border-green-900/50">
                    <CardHeader className="py-3 bg-green-50/50 dark:bg-green-900/10 border-b border-green-100 dark:border-green-900/50 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-500 font-semibold text-sm">
                        <MessageCircle className="w-4 h-4" /> WhatsApp Update
                      </div>
                      <CopyButton text={result.whatsappSummary} id="whatsapp" />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm whitespace-pre-wrap font-medium">{result.whatsappSummary}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(result.socialMedia || {}).map(([platform, content], index) => {
                    const icons = {
                      twitter: <Hash className="w-4 h-4 text-sky-500" />,
                      facebook: <Globe className="w-4 h-4 text-blue-600" />,
                      instagram: <ImageIcon className="w-4 h-4 text-pink-500" />,
                      linkedin: <Briefcase className="w-4 h-4 text-blue-700" />
                    };
                    return (
                      <motion.div variants={itemVariants} key={index}>
                        <Card className="h-full flex flex-col">
                          <CardHeader className="py-3 bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
                            <div className="flex items-center gap-2 font-semibold text-sm capitalize">
                              {icons[platform]} {platform}
                            </div>
                            <CopyButton text={content} id={`sm_${platform}`} />
                          </CardHeader>
                          <CardContent className="pt-4 flex-1">
                            <p className="text-sm whitespace-pre-wrap">{content}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
