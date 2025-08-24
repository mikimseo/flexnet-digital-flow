import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Reviews } from "@/components/sections/Reviews";
import { Contacts } from "@/components/sections/Contacts";
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav";
import { ThemeProvider } from "@/hooks/useTheme";
import { usePWA } from "@/hooks/usePWA";
import { useEffect } from "react";

const Index = () => {
  const { isStandalone } = usePWA();

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system">
      <div className={`min-h-screen bg-background ${isStandalone ? 'pb-16' : ''}`}>
        <Header />
        <main>
          <Hero />
          <ClientLogos />
          <Services />
          <Portfolio />
          <Reviews />
          <Contacts />
        </main>
        <Footer />
        {/* Mobile bottom navigation for PWA */}
        <MobileBottomNav />
      </div>
    </ThemeProvider>
  );
};

export default Index;
