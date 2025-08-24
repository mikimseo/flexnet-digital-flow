import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Reviews } from "@/components/sections/Reviews";
import { Contacts } from "@/components/sections/Contacts";
import { ThemeProvider } from "@/hooks/useTheme";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pb-16 lg:pb-0">
          <Hero />
          <ClientLogos />
          <Services />
          <Portfolio />
          <Reviews />
          <Contacts />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </ThemeProvider>
  );
};

export default Index;
