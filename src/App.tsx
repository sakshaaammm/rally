import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventsProvider } from "./context/EventsContext";
import Explore from "./pages/Explore";
import EventDetails from "./pages/EventDetails";
import Checkout from "./pages/Checkout";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EventsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/create" element={<CreateEvent />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EventsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
