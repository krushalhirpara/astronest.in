import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { CosmicBackground } from "@/components/landing/CosmicBackground";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AstroNest" },
      { name: "description", content: "AI Kundali, Rashifal, Guna Matching, Palm Reading & Tarot — all in one beautiful cosmic experience." },
      { property: "og:title", content: "AstroNest" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#05010A] text-foreground font-poppins selection:bg-purple-500/30 overflow-x-hidden w-full max-w-full">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="relative min-h-screen">
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

