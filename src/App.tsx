import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// 🔴 Páginas legales
import Privacy from "./pages/Privacy.tsx";
import Cookies from "./pages/cookies.tsx";
import Legal from "./pages/Legal.tsx";

// 🍪 Banner cookies
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        {/* 🍪 Banner cookies */}
        <CookieBanner />

        <Routes>
          <Route path="/" element={<Index />} />

          {/* 🔴 Rutas legales */}
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/aviso-legal" element={<Legal />} />

          {/* NO TOCAR */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
