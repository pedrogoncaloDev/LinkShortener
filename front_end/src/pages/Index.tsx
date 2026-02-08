import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkShortenerForm } from "@/components/LinkShortenerForm";
import { LinksTable } from "@/components/LinksTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLinks } from "@/hooks/useLinks";
import { Link2, List } from "lucide-react";

const Index = () => {
  const { links, isLoading, error, fetchLinks, shortenLink } = useLinks();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">LinkShort</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Tabs defaultValue="shorten" className="w-full">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="container mx-auto px-4">
              <TabsList className="h-auto p-0 bg-transparent rounded-none border-0">
                <TabsTrigger 
                  value="shorten" 
                  className="gap-2 px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  <Link2 className="h-4 w-4" />
                  Encurtar
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="gap-2 px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  <List className="h-4 w-4" />
                  Meus Links
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Shorten Tab - Hero Layout */}
          <TabsContent value="shorten" className="mt-0">
            <div className="container mx-auto px-4 py-16 lg:py-24">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Side - Hero Text */}
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                    Encurtador de URL{" "}
                    <span className="text-primary">simples e rápido</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-lg">
                    Transforme links longos em URLs curtas e fáceis de compartilhar. 
                    Gerencie todos os seus links em um só lugar.
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">Rápido</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">Seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">Gratuito</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex justify-center lg:justify-end">
                  <LinkShortenerForm onShorten={shortenLink} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-0">
            <div className="container mx-auto px-4 py-8">
              <LinksTable
                links={links}
                isLoading={isLoading}
                error={error}
                onRefresh={fetchLinks}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          LinkShort © {new Date().getFullYear()} — Encurtador de Links
        </div>
      </footer>
    </div>
  );
};

export default Index;
