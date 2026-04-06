import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Tables from "@/pages/Tables";
import Reservations from "@/pages/Reservations";
import Orders from "@/pages/Orders";
import Menu from "@/pages/Menu";
import Staff from "@/pages/Staff";
import NotFound from "./pages/NotFound.tsx";
import { seedDatabase } from "@/lib/seed";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Seed database on app start (only in development)
    if (import.meta.env.DEV) {
      seedDatabase();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/staff" element={<Staff />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
