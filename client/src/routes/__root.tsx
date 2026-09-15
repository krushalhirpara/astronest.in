import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CosmicBackground } from "@/components/landing/CosmicBackground";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="relative min-h-screen bg-[#05010A] text-foreground font-poppins selection:bg-purple-500/30 overflow-x-hidden w-full max-w-full">
          <CosmicBackground />
          <Navbar />
          <main className="pt-0">
            <Outlet />
          </main>
          <Footer />
          <ThemeToggle />
          <Toaster position="top-center" richColors />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

