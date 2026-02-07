import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import CarParts from "./pages/CarParts";
import PartDetails from "./pages/PartDetails";
import Cart from "./pages/Cart";
import BuyAccidentCars from "./pages/BuyAccidentCars";
import SecondHandCars from "./pages/SecondHandCars";
import CarDetails from "./pages/CarDetails";
import WorkshopServices from "./pages/WorkshopServices";
import BookService from "./pages/BookService";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import Checkout from "./pages/Checkout";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminParts from "./pages/admin/AdminParts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/parts" element={<CarParts />} />
              <Route path="/parts/:id" element={<PartDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/buy-cars" element={<BuyAccidentCars />} />
              <Route path="/second-hand-cars" element={<SecondHandCars />} />
              <Route path="/car-details/:id" element={<CarDetails />} />
              <Route path="/workshop" element={<WorkshopServices />} />
              <Route path="/book-service" element={<BookService />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/parts" element={<AdminParts />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
