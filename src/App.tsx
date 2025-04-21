
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import VirtualBar from "./pages/VirtualBar";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import BartenderMode from "./pages/BartenderMode";
import CocktailDetail from "./pages/CocktailDetail";

// Settings Pages
import ProfileSettings from "./pages/settings/ProfileSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import DeleteAccount from "./pages/settings/DeleteAccount";
import ContactUs from "./pages/settings/ContactUs";

// Components
import Header from "./components/Header";
import MobileNavbar from "./components/MobileNavbar";

// Context
import { SettingsProvider } from "./contexts/SettingsContext";
import { ShoppingProvider } from "./contexts/ShoppingContext";
import { DeviceProvider } from "./contexts/DeviceContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <ShoppingProvider>
        <DeviceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/bar" element={<VirtualBar />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/profile" element={<ProfileSettings />} />
                    <Route path="/settings/security" element={<SecuritySettings />} />
                    <Route path="/settings/delete-account" element={<DeleteAccount />} />
                    <Route path="/settings/contact" element={<ContactUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/bartender" element={<BartenderMode />} />
                    <Route path="/cocktail/:id" element={<CocktailDetail />} />
                    {/* Linked Accounts route is removed */}
                    <Route path="/settings/linked-accounts" element={<Navigate to="/settings" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <MobileNavbar />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </DeviceProvider>
      </ShoppingProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
