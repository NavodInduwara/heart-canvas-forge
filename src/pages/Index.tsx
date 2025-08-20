import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Heart, Sparkles, Stars } from "lucide-react";
import * as htmlToImage from "html-to-image";
import { useToast } from "@/hooks/use-toast";

const PRESET_QUOTES = [
  "Until we meet again, I carry your love like a quiet sunrise in my heart.",
  "Your chair is empty, but your love fills the whole room.",
  "I talk to the sky because I know you're listening.",
  "Grief is love with nowhere to go—so I send it up to you.",
  "You taught me forever; now I practice it one day at a time.",
  "Some nights I swear the stars spell your name.",
  "Love didn't end; it learned to shine from a different place.",
  "I keep your laughter folded in my pocket for the hard days.",
  "Your hands let go; your love never did.",
  "Heaven holds you; my heart holds on.",
  "I won't say goodbye to your love—only goodnight for now.",
  "In every gentle thing, I find you again."
];

const BACKGROUNDS: Record<string, string> = {
  "Candle Glow": "bg-gradient-candleglow",
  "Soft Sky": "bg-gradient-softsky", 
  "Lavender Dawn": "bg-gradient-lavender",
  "Starlight": "bg-gradient-starlight",
  "Simple White": "bg-white"
};

const TEXT_COLORS: Record<string, string> = {
  "Auto": "",
  "Dark": "text-slate-800",
  "Soft": "text-slate-600", 
  "Light": "text-white"
};

const RATIOS: Record<string, { w: number; h: number; label: string }> = {
  Square: { w: 1080, h: 1080, label: "Square (1080×1080)" },
  Portrait: { w: 1080, h: 1350, label: "Portrait (1080×1350)" },
  Story: { w: 1080, h: 1920, label: "Story (1080×1920)" },
  Post: { w: 1200, h: 630, label: "Link Post (1200×630)" }
};

const Index = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [quote, setQuote] = useState(PRESET_QUOTES[0]);
  const [groupTitle, setGroupTitle] = useState("My Husband in Heaven");
  const [bg, setBg] = useState<keyof typeof BACKGROUNDS>("Soft Sky");
  const [textColor, setTextColor] = useState<keyof typeof TEXT_COLORS>("Auto");
  const [ratioKey, setRatioKey] = useState<keyof typeof RATIOS>("Square");
  const [signature, setSignature] = useState("— With all my love");

  const ratio = RATIOS[ratioKey];

  async function downloadPng() {
    if (!nodeRef.current) return;
    
    try {
      const dataUrl = await htmlToImage.toPng(nodeRef.current, {
        pixelRatio: 2,
        backgroundColor: bg === "Starlight" ? "#0f172a" : undefined,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const link = document.createElement("a");
      link.download = `husband-in-heaven-${ratioKey.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Download successful!",
        description: "Your memorial quote card has been saved.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  }

  function copyText() {
    const full = `${groupTitle}\n\n${quote}\n\n${signature}`;
    navigator.clipboard.writeText(full);
    
    toast({
      title: "Text copied!",
      description: "The quote text has been copied to your clipboard.",
    });
  }

  const computedTextColor =
    textColor === "Auto"
      ? bg === "Starlight" ? "text-white" : "text-slate-800"
      : TEXT_COLORS[textColor];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 bg-background">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-6">
        {/* Main Card Creator */}
        <Card className="shadow-elegant rounded-2xl border-0 bg-card">
          <CardContent className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-xl md:text-2xl font-display font-semibold tracking-tight flex items-center gap-2 text-foreground">
                <Stars className="w-5 h-5 text-primary" /> 
                Create Memorial Quote
              </h1>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={copyText} className="transition-gentle">
                  <Copy className="w-4 h-4 mr-2" /> Copy Text
                </Button>
                <Button onClick={downloadPng} className="transition-gentle">
                  <Download className="w-4 h-4 mr-2" /> Download PNG
                </Button>
              </div>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Preset quote</label>
                <Select onValueChange={(v) => setQuote(v)}>
                  <SelectTrigger className="transition-gentle">
                    <SelectValue placeholder="Choose a preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESET_QUOTES.map((q, i) => (
                      <SelectItem key={i} value={q}>
                        {q.length > 60 ? q.slice(0, 60) + "…" : q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Background</label>
                <Select value={bg} onValueChange={(v) => setBg(v as keyof typeof BACKGROUNDS)}>
                  <SelectTrigger className="transition-gentle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(BACKGROUNDS).map((k) => (
                      <SelectItem key={k} value={k}>
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Text color</label>
                <Select value={textColor} onValueChange={(v) => setTextColor(v as keyof typeof TEXT_COLORS)}>
                  <SelectTrigger className="transition-gentle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(TEXT_COLORS).map((k) => (
                      <SelectItem key={k} value={k}>
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Canvas size</label>
                <Select value={ratioKey} onValueChange={(v) => setRatioKey(v as keyof typeof RATIOS)}>
                  <SelectTrigger className="transition-gentle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(RATIOS).map(([k, r]) => (
                      <SelectItem key={k} value={k}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Your quote</label>
                <Textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="min-h-[100px] transition-gentle resize-none"
                  maxLength={280}
                  placeholder="Enter your heartfelt message..."
                />
                <p className="text-xs text-muted-foreground text-right">{quote.length}/280</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Group title</label>
                <Input 
                  value={groupTitle} 
                  onChange={(e) => setGroupTitle(e.target.value)}
                  className="transition-gentle"
                  placeholder="e.g., My Husband in Heaven"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Signature (optional)</label>
                <Input 
                  value={signature} 
                  onChange={(e) => setSignature(e.target.value)}
                  className="transition-gentle"
                  placeholder="e.g., — With all my love"
                />
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="w-full flex justify-center">
              <div className="relative">
                <div
                  ref={nodeRef}
                  className={`relative overflow-hidden rounded-2xl shadow-elegant border ${BACKGROUNDS[bg]} ${computedTextColor}`}
                  style={{ 
                    width: Math.min(ratio.w / 2, 400), 
                    height: Math.min(ratio.h / 2, 400 * (ratio.h / ratio.w)),
                    aspectRatio: `${ratio.w}/${ratio.h}`
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl bg-white/40" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 blur-2xl bg-white/30" />

                  <div className="flex flex-col items-center justify-between h-full p-8 text-center relative z-10">
                    <div className="flex items-center gap-2 text-xs tracking-widest uppercase opacity-80">
                      <Heart className="w-3 h-3" />
                      <span className="font-display">{groupTitle}</span>
                      <Sparkles className="w-3 h-3" />
                    </div>

                    <blockquote className="max-w-full mx-auto">
                      <p className="text-sm md:text-base leading-snug font-medium font-display">
                        {quote}
                      </p>
                    </blockquote>

                    <div className="opacity-80">
                      <span className="text-xs font-display">{signature}</span>
                    </div>
                  </div>

                  {/* Brand watermark */}
                  <div className="absolute bottom-2 right-2 opacity-50">
                    <span className="text-xs tracking-wide font-display">Bimmortal</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-center mt-4 text-muted-foreground">
              💡 Choose "Story" for WhatsApp/Instagram stories, "Square" for feed posts.
            </p>
          </CardContent>
        </Card>

        {/* Quotes Library */}
        <Card className="shadow-elegant rounded-2xl border-0 bg-card">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Beautiful Quotes Library
            </h2>
            <p className="text-sm text-muted-foreground">
              Click any quote below to use it in your memorial card.
            </p>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {PRESET_QUOTES.map((q, i) => (
                <div
                  key={i}
                  onClick={() => setQuote(q)}
                  className="p-4 rounded-xl bg-muted/50 border border-border/50 cursor-pointer transition-warm hover:bg-muted hover:shadow-soft group"
                >
                  <p className="text-sm text-foreground font-display leading-relaxed group-hover:text-primary transition-gentle">
                    "{q}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground border-t border-border/50 pt-4">
              <p className="font-display">
                💝 These heartfelt messages help you share beautiful memories and honor those we've lost.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;