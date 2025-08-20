import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Bot, 
  Settings, 
  TrendingUp, 
  Smartphone, 
  BarChart3,
  ArrowRight,
  Zap
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Разработка сайтов",
    description: "Лендинги, корпоративные сайты и интернет-магазины с современным дизайном и высокой конверсией",
    features: ["Адаптивный дизайн", "SEO-оптимизация", "Высокая скорость"],
    price: "от 150,000 ₸",
    slug: "web-development"
  },
  {
    icon: Bot,
    title: "Интеграция ИИ-агентов",
    description: "Чат-боты и виртуальные ассистенты для автоматизации клиентского сервиса и увеличения продаж",
    features: ["24/7 поддержка", "Обработка заявок", "Квалификация лидов"],
    price: "от 200,000 ₸",
    slug: "ai-integration"
  },
  {
    icon: Settings,
    title: "Внедрение CRM",
    description: "Настройка CRM-систем для управления клиентами, автоматизации продаж и маркетинга",
    features: ["Настройка процессов", "Интеграции", "Обучение команды"],
    price: "от 300,000 ₸",
    slug: "crm-implementation"
  },
  {
    icon: TrendingUp,
    title: "SEO и Analytics",
    description: "Поисковое продвижение и аналитика для увеличения трафика и конверсий",
    features: ["Техническое SEO", "Контент-маркетинг", "Настройка аналитики"],
    price: "от 100,000 ₸/мес",
    slug: "seo-analytics"
  },
  {
    icon: Smartphone,
    title: "PWA и мобильные решения",
    description: "Прогрессивные веб-приложения и мобильные решения для лучшего пользовательского опыта",
    features: ["Офлайн-режим", "Push-уведомления", "Установка как приложение"],
    price: "от 250,000 ₸",
    slug: "mobile-pwa"
  },
  {
    icon: BarChart3,
    title: "Аналитика и оптимизация",
    description: "Анализ данных, A/B тестирование и оптимизация конверсий для роста бизнеса",
    features: ["Веб-аналитика", "A/B тесты", "Отчеты и дашборды"],
    price: "от 80,000 ₸/мес",
    slug: "analytics-optimization"
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Наши услуги</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Полный спектр <span className="gradient-text">digital-решений</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            От создания сайтов до внедрения ИИ и автоматизации — всё для роста вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.slug}
                className="group card-hover bg-gradient-card border-border/50"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {service.price}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="btn-gradient">
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
}