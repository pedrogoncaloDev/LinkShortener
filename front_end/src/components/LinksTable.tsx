import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, RefreshCw, Loader2, ListX } from "lucide-react";
import { toast } from "sonner";
import { ShortenedLink } from "@/types/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LinksTableProps {
  links: ShortenedLink[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function LinksTable({ links, isLoading, error, onRefresh }: LinksTableProps) {
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copiado!");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Meus Links</h2>
          <p className="text-muted-foreground mt-1">
            Histórico de todos os links que você encurtou
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh} 
          disabled={isLoading}
          className="border-border"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span className="ml-2">Atualizar</span>
        </Button>
      </div>

      {error && (
        <div className="text-center py-12 bg-card rounded-2xl border border-border">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" size="sm" onClick={onRefresh} className="mt-4">
            Tentar novamente
          </Button>
        </div>
      )}

      {!error && links.length === 0 && !isLoading && (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <ListX className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-lg font-medium text-foreground">Nenhum link encurtado ainda</p>
          <p className="text-muted-foreground mt-1">
            Encurte seu primeiro link na aba "Encurtar"
          </p>
        </div>
      )}

      {!error && (links.length > 0 || isLoading) && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">ID</TableHead>
                <TableHead className="text-muted-foreground font-medium">Link Encurtado</TableHead>
                <TableHead className="text-muted-foreground font-medium">Link Original</TableHead>
                <TableHead className="text-muted-foreground font-medium">Data de Criação</TableHead>
                <TableHead className="text-muted-foreground font-medium text-center">Expirado</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && links.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : (
                links.map((link) => (
                  <TableRow key={link.id} className="border-border">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {link.id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a
                          href={link.shortened_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {truncateUrl(link.shortened_url, 25)}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <div className="flex items-center gap-2">
                        <span 
                          className="truncate text-muted-foreground text-sm" 
                          title={link.original_url}
                        >
                          {truncateUrl(link.original_url, 35)}
                        </span>
                        <a
                          href={link.original_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(link.created_at)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={link.expired ? "destructive" : "secondary"}
                        className={link.expired ? "" : "bg-primary/20 text-primary border-0"}
                      >
                        {link.expired ? "Sim" : "Não"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-secondary"
                        onClick={() => handleCopy(link.shortened_url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
