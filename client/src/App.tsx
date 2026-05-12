import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import PodcastPage from "@/pages/Podcast";
import ClipsPage from "@/pages/Clips";
import LoginPage from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import ChatBot from "@/components/ChatBot";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";


import { useLocation } from "wouter";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/podcast"} component={PodcastPage} />
      <Route path={"/clips"} component={ClipsPage} />
      <Route path={"/admin-login"} component={LoginPage} />
      <Route path={"/admin-dashboard"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminPage = location.toLowerCase().includes("admin");

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              {!isAdminPage && <ChatBot />}
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
