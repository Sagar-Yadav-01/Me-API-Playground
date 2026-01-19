import "./globals.css";
import Link from "next/link";
import { Home, FolderCode, HeartPulse, Github, Linkedin, ExternalLink } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: "Sagar Yadav | Portfolio",
  description: "B.Tech Electrical Engineering student at NIT Delhi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-teal-100 selection:text-teal-900 bg-blueprint">
        <ScrollProgress />
        <BackToTop />
        <ThemeProvider>


          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center">
              <Link href="/" className="font-extrabold text-xl tracking-tighter hover:text-teal-600 transition-colors uppercase italic technical-mono">
                Sagar<span className="text-teal-600">.SY</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="/" className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
                  <Home size={16} />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                <Link href="/projects" className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
                  <FolderCode size={16} />
                  <span className="hidden sm:inline">Projects</span>
                </Link>
                <Link href="/api/health" className="flex items-center gap-1.5 text-slate-400 hover:text-teal-600 transition-colors">
                  <HeartPulse size={16} />
                  <span className="hidden md:inline">Health Check</span>
                </Link>
                <div className="h-6 w-px bg-border mx-2" />
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-6 py-12 max-w-5xl">
            {children}
          </main>
          <footer className="border-t border-border py-12 bg-muted/50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest technical-mono">Sagar Yadav</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <a href="https://github.com/Sagar-Yadav-01" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/sagar-yadav-96560a321/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
