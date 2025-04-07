
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Downloads from "./pages/Downloads";
import NotFound from "./pages/NotFound";
import BlogAIImpact from "./pages/BlogAIImpact";
import BlogNoCodeWebsites from "./pages/BlogNoCodeWebsites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/blogs/ai-impact-on-students" element={<BlogAIImpact />} />
          <Route path="/blogs/no-code-websites-2025" element={<BlogNoCodeWebsites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
