import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MortgageCalculator from "@/components/MortgageCalculator";
import MaxPriceCalculator from "@/components/MaxPriceCalculator";
import LeadForm from "@/components/LeadForm";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("cuota");

  // Definición de subtítulos mapeados al valor del tab
  const subtitles: Record<string, string> = {
    cuota: "Calcula tu cuota hipotecaria – Con o sin Bonificaciones según el ingreso neto",
    precio: "Precio máximo de compra según los ingresos netos",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            Calculadora Hipotecaria
          </h1>
        </div>
      </header>

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4">
        <AdBanner slot="TOP" className="py-3" />
      </div>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
            <TabsTrigger value="cuota">Cuota Hipotecaria</TabsTrigger>
            <TabsTrigger value="precio">Precio Máximo</TabsTrigger>
          </TabsList>

          {/* Subtitle - Dinámico según el Tab activo */}
          <p className="text-center text-muted-foreground text-sm mb-8 max-w-2xl mx-auto">
            {subtitles[activeTab]}
          </p>

          {/* Contenido: Cálculo de Cuota */}
          <TabsContent value="cuota" className="outline-none">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <MortgageCalculator />
              </div>
              <aside>
                <LeadForm />
              </aside>
            </div>
          </TabsContent>

          {/* Contenido: Precio Máximo */}
          <TabsContent value="precio" className="outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <MaxPriceCalculator />
              <aside>
                <LeadForm />
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4">
        <AdBanner slot="BOTTOM" className="py-6" />
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © {new Date().getFullYear()} calculadorahipotecaria.es — Herramienta informativa profesional.
          </p>

          <nav className="flex justify-center gap-6 flex-wrap text-sm font-medium">
            <a href="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </a>
            <a href="/aviso-legal" className="text-muted-foreground hover:text-primary transition-colors">
              Aviso Legal
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
