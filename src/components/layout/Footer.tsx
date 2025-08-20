import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const quickLinks = [
  { name: "О компании", href: "#about" },
  { name: "Услуги", href: "#services" },
  { name: "Портфолио", href: "#portfolio" },
  { name: "Блог", href: "#blog" },
  { name: "Контакты", href: "#contacts" },
  { name: "Политика конфиденциальности", href: "#privacy" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-3xl font-bold text-white">FLEXNET</span>
              <p className="mt-4 text-secondary-foreground/80 max-w-md">
                Digital-агентство полного цикла. Создаём сайты, внедряем ИИ-агентов, 
                автоматизируем маркетинг и продажи для роста вашего бизнеса.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>г. Алматы / Каскелен, Казахстан</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:hello@flexnet.kz" className="hover:text-primary transition-colors">
                  hello@flexnet.kz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+77000000000" className="hover:text-primary transition-colors">
                  +7 (000) 000-00-00
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA and social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Связаться с нами</h3>
            <Button className="w-full mb-6 btn-gradient">
              Обсудить проект
            </Button>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-secondary-foreground/60">
              © 2024 FLEXNET. Все права защищены. ИНН: 123456789012
            </div>
            <div className="text-sm text-secondary-foreground/60">
              Разработано с ❤️ командой FLEXNET
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}