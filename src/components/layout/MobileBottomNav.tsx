import { Home, Briefcase, Folder, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    key: "home",
    label: "Главная",
    href: "#hero",
    icon: Home,
    external: true
  },
  {
    key: "services", 
    label: "Услуги",
    href: "#services",
    icon: Briefcase,
    external: true
  },
  {
    key: "portfolio",
    label: "Портфолио", 
    href: "/portfolio",
    icon: Folder,
    external: false
  },
  {
    key: "contacts",
    label: "Контакты",
    href: "#contacts", 
    icon: MessageCircle,
    external: true
  }
];

export function MobileBottomNav() {
  const location = useLocation();

  const handleClick = (href: string, external: boolean) => {
    if (external && href.startsWith('#')) {
      // For hash links, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border lg:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.external 
            ? false // Hash links don't have active state
            : location.pathname === item.href;

          if (item.external) {
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={() => handleClick(item.href, item.external)}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                  "hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.key}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                "hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}