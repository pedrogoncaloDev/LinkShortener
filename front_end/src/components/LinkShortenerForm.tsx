import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Copy, Check, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface LinkShortenerFormProps {
  onShorten: (url: string) => Promise<string | null>;
  isLoading: boolean;
}

export function LinkShortenerForm({ onShorten, isLoading }: LinkShortenerFormProps) {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Por favor, insira um link válido");
      return;
    }

    const result = await onShorten(url);
    if (result) {
      setShortenedUrl(result);
      toast.success("Link encurtado com sucesso!");
    }
  };

  const handleCopy = async () => {
    if (shortenedUrl) {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setUrl("");
    setShortenedUrl(null);
  };

  return (
    <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow-xl border border-border">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Link2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Encurte seu link</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Cole seu URL longo aqui..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-secondary border-0 h-12 text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !url.trim()}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Encurtar
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Result */}
      {shortenedUrl && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs font-medium text-primary uppercase tracking-wide mb-3">
            Seu link curto:
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-lg px-4 py-3">
              <span className="font-mono text-sm text-foreground">
                {shortenedUrl}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-10 px-4 border-border"
            >
              {copied ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-2">{copied ? "Copiado" : "Copiar"}</span>
            </Button>
          </div>
          <button
            onClick={handleReset}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Encurtar outro link
          </button>
        </div>
      )}
    </div>
  );
}
