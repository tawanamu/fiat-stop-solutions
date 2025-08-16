import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import CarParts from "./pages/CarParts";
import PartDetails from "./pages/PartDetails";
import Cart from "./pages/Cart";
import BuyAccidentCars from "./pages/BuyAccidentCars";
import WorkshopServices from "./pages/WorkshopServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/parts" element={<CarParts />} />
            <Route path="/parts/:id" element={<PartDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buy-cars" element={<BuyAccidentCars />} />
            <Route path="/workshop" element={<WorkshopServices />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
