import { Home, Briefcase, FolderOpen, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  className?: string;
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: 'Главная',
      onClick: () => scrollToSection('hero')
    },
    { 
      id: 'services', 
      icon: Briefcase, 
      label: 'Услуги',
      onClick: () => scrollToSection('services')
    },
    { 
      id: 'portfolio', 
      icon: FolderOpen, 
      label: 'Портфолио',
      onClick: () => scrollToSection('portfolio')
    },
    { 
      id: 'contacts', 
      icon: Phone, 
      label: 'Контакты',
      onClick: () => scrollToSection('contacts')
    }
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border",
      "md:hidden", // Hide on desktop
      className
    )}>
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors active:bg-muted/50"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}