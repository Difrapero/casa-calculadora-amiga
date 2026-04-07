import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MortgageCalculator from "@/components/MortgageCalculator";
import MaxPriceCalculator from "@/components/MaxPriceCalculator";
import LeadForm from "@/components/LeadForm";
import AdBanner from "@/components/AdBanner";

// 👇 Definimos el tipo correcto
type TabType = "cuota" | "precio";

const Index = () => {
  // 👇 Tipamos correctamente el estado
  const [activeTab, setActiveTab] = useState<TabType>("cuota");

  // 👇 Ahora TypeScript sabe que las claves coinciden
  const subtitles: Record<TabType, string> = {
    cuota: "Calcula tu cuota hipotecaria – Con o sin bonificaciones según el ingreso neto",
    precio: "Precio máximo de compra según los ingresos netos",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            Calculadora Hipotecaria
          </h1>
        </div>
      </header>

      {/* Top Ad Banner */}
      <AdBanner slot="TOP" className="py-3" />

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-2">
            <TabsTrigger value="cuota">Calcular Cuota Hipotecaria</TabsTrigger>
            <TabsTrigger value="precio">Precio Máximo de Compra</TabsTrigger>
          </TabsList>

          {/* Subtitle */}
          <p className="text-center text-muted-foreground text-sm mb-6">
            {subtitles[activeTab]}
          </p>

          <TabsContent value="cuota">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <MortgageCalculator />
              </div>
              <div>
                <LeadForm />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="precio">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <MaxPriceCalculator />
              <LeadForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Ad Banner */}
      <AdBanner slot="BOTTOM" className="py-6" />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          © {new Date().getFullYear()} calculadorahipotecaria.es — Herramienta informativa. Consulta con un profesional.
        </p>

        <div className="flex justify-center gap-4 flex-wrap text-sm">
          <a href="/privacidad" className="hover:underline">
            Política de Privacidad
          </a>
          <a href="/cookies" className="hover:underline">
            Cookies
          </a>
          <a href="/aviso-legal" className="hover:underline">
            Aviso Legal
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
