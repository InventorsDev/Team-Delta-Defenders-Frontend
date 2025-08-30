import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/FarmersSignup";
import SignupStep2 from "./pages/auth/FarmersSignupStep2";
import SignupStep3 from "./pages/auth/FarmersSignupStep3";
import BuyerSignup from "./pages/auth/BuyerSignup";
import BuyerSignupStep2 from "./pages/auth/BuyerSignupStep2";
import BuyerSignupStep3 from "./pages/auth/BuyerSignupStep3";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/farmers-signup" element={<Signup />} />
          <Route path="/signup-step2" element={<SignupStep2 />} />
          <Route path="/farmers-signup-step2" element={<SignupStep2 />} />
          <Route path="/signup-step3" element={<SignupStep3 />} />
          <Route path="/farmers-signup-step3" element={<SignupStep3 />} />
          <Route path="/buyer-signup" element={<BuyerSignup />} />
          <Route path="/buyer-signup-step2" element={<BuyerSignupStep2 />} />
          <Route path="/buyer-signup-step3" element={<BuyerSignupStep3 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
