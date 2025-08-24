import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Instagram, Music, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  key: string;
  is_external: boolean;
  is_active: boolean;
  display_order: number;
}

// Fallback navigation items
const fallbackNavigation = [
  { name: "Главная", href: "#hero", key: "home" },
  { name: "Услуги", href: "#services", key: "services" },
  { name: "Портфолио", href: "#portfolio", key: "portfolio" },
  { name: "Отзывы", href: "#reviews", key: "reviews" },
  { name: "Контакты", href: "#contacts", key: "contacts" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState(fallbackNavigation);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      
      // Use DB data if available, otherwise fallback
      if (data && data.length > 0) {
        const menuItems = data.map((item: MenuItem) => ({
          name: item.name,
          href: item.href,
          key: item.key
        }));
        setNavigation(menuItems);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      // Keep fallback navigation on error
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-xl sm:text-2xl font-bold gradient-text">FLEXNET</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium leading-6 text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={item.href}
                  className="text-sm font-medium leading-6 text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Music className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <ThemeToggle />
            {user && isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Админ
                </Link>
              </Button>
            )}
            {!user && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">Войти</Link>
              </Button>
            )}
            <Button className="btn-gradient" asChild>
              <a href="#contacts">Обсудить проект</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 z-50 h-screen w-screen",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div className="absolute inset-y-0 right-0 h-full w-full sm:w-80 bg-background shadow-xl overflow-y-auto">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold gradient-text">FLEXNET</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex-1 px-6 py-6 space-y-6">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.key}
                      href={item.href}
                      className="block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-foreground hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.key}
                      to={item.href}
                      className="block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-foreground hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>
              
              {/* Social links */}
              <div className="flex items-center gap-2 px-3">
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <Music className="h-4 w-4" />
                  </a>
                </Button>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Bottom actions */}
            <div className="border-t border-border p-6 space-y-3">
              {user && isAdmin && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Админ панель
                  </Link>
                </Button>
              )}
              {!user && (
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Войти</Link>
                </Button>
              )}
              <Button className="w-full btn-gradient" asChild>
                <a href="#contacts" onClick={() => setMobileMenuOpen(false)}>Обсудить проект</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}