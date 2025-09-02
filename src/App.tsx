import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import CarParts from "./pages/CarParts";
import PartDetails from "./pages/PartDetails";
import Cart from "./pages/Cart";
import BuyAccidentCars from "./pages/BuyAccidentCars";
import SecondHandCars from "./pages/SecondHandCars";
import WorkshopServices from "./pages/WorkshopServices";
import BookService from "./pages/BookService";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop"; // added import
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop /> {/* ensure this is inside Router */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/parts" element={<CarParts />} />
            <Route path="/parts/:id" element={<PartDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} /> {/* new checkout route */}
            <Route path="/buy-cars" element={<BuyAccidentCars />} />
            <Route path="/second-hand-cars" element={<SecondHandCars />} />
            <Route path="/workshop" element={<WorkshopServices />} />
            <Route path="/book-service" element={<BookService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
