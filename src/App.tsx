import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConsentProvider, MarketingScripts } from "@/components/ConsentManager";
import SiteLayout from "@/components/SiteLayout";
import Index from "@/pages/Index";
import Guides from "@/pages/Guides";
import GuideArticle from "@/pages/GuideArticle";
import Methodology from "@/pages/Methodology";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <ConsentProvider>
        <MarketingScripts />
        <Toaster />
        <Sonner />
        <SiteLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guias" element={<Guides />} />
            <Route path="/guias/:slug" element={<GuideArticle />} />
            <Route path="/metodologia" element={<Methodology />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/aviso-legal" element={<Legal />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SiteLayout>
      </ConsentProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
