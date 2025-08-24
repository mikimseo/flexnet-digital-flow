import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Bot, 
  Settings, 
  TrendingUp, 
  Smartphone, 
  BarChart3,
  ArrowRight,
  Zap,
  Check,
  icons
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  slug?: string;
  is_active: boolean;
  display_order: number;
}

// Fallback services data
const fallbackServices = [
  {
    id: "1",
    icon: "Globe",
    title: "Разработка сайтов",
    description: "Лендинги, корпоративные сайты и интернет-магазины с современным дизайном и высокой конверсией",
    detailedDescription: "Создаем продающие лендинги, корпоративные сайты и интернет-магазины с современным дизайном. Все сайты адаптированы под мобильные устройства, оптимизированы для поисковых систем и загружаются максимально быстро. Используем современные технологии: React, TypeScript, Tailwind CSS для frontend и Node.js, PostgreSQL для backend.",
    features: ["Адаптивный дизайн", "SEO-оптимизация", "Высокая скорость"],
    detailedFeatures: [
      "Адаптивный дизайн для всех устройств",
      "SEO-оптимизация для поисковых систем",
      "Высокая скорость загрузки (Google PageSpeed 90+)",
      "Интеграция с CRM и аналитикой",
      "Система управления контентом",
      "SSL-сертификат и защита от взлома",
      "Резервное копирование данных",
      "Техническая поддержка 24/7"
    ],
    price: "от 150,000 ₸",
    slug: "web-development",
    is_active: true,
    display_order: 1
  },
  {
    id: "2",
    icon: "Bot",
    title: "Интеграция ИИ-агентов",
    description: "Чат-боты и виртуальные ассистенты для автоматизации клиентского сервиса и увеличения продаж",
    detailedDescription: "Внедряем умных ИИ-агентов для автоматизации клиентского сервиса. Наши чат-боты работают 24/7, обрабатывают заявки, квалифицируют лиды и передают горячих клиентов менеджерам. Используем современные языковые модели и интегрируем с вашими системами.",
    features: ["24/7 поддержка", "Обработка заявок", "Квалификация лидов"],
    detailedFeatures: [
      "Круглосуточная поддержка клиентов",
      "Автоматическая обработка заявок",
      "Квалификация и сегментация лидов",
      "Интеграция с CRM и мессенджерами",
      "Многоязычная поддержка",
      "Обучение на ваших данных",
      "Аналитика диалогов",
      "Постоянное улучшение алгоритмов"
    ],
    price: "от 200,000 ₸",
    slug: "ai-integration",
    is_active: true,
    display_order: 2
  },
  {
    id: "3",
    icon: "Settings",
    title: "Внедрение CRM",
    description: "Настройка CRM-систем для управления клиентами, автоматизации продаж и маркетинга",
    detailedDescription: "Внедряем и настраиваем CRM-системы под ваши бизнес-процессы. Автоматизируем продажи, маркетинг и клиентский сервис. Интегрируем с существующими системами и обучаем команду работе с новым инструментом.",
    features: ["Настройка процессов", "Интеграции", "Обучение команды"],
    detailedFeatures: [
      "Анализ и настройка бизнес-процессов",
      "Интеграция с сайтом и соцсетями",
      "Автоматизация воронки продаж",
      "Настройка отчетности и аналитики",
      "Обучение команды работе с CRM",
      "Техническая поддержка внедрения",
      "Миграция данных из старых систем",
      "Постоянная техническая поддержка"
    ],
    price: "от 300,000 ₸",
    slug: "crm-implementation",
    is_active: true,
    display_order: 3
  },
  {
    id: "4",
    icon: "TrendingUp",
    title: "SEO и Analytics",
    description: "Поисковое продвижение и аналитика для увеличения трафика и конверсий",
    detailedDescription: "Комплексное SEO-продвижение и настройка аналитики для роста органического трафика. Проводим технический аудит, оптимизируем контент, настраиваем аналитику и отслеживаем результаты.",
    features: ["Техническое SEO", "Контент-маркетинг", "Настройка аналитики"],
    detailedFeatures: [
      "Технический SEO-аудит сайта",
      "Оптимизация скорости загрузки",
      "Создание SEO-контента",
      "Линкбилдинг и внешняя оптимизация",
      "Настройка Google Analytics и Яндекс.Метрики",
      "Отслеживание конверсий",
      "Ежемесячные отчеты",
      "Консультации по контент-стратегии"
    ],
    price: "от 100,000 ₸/мес",
    slug: "seo-analytics",
    is_active: true,
    display_order: 4
  },
  {
    id: "5",
    icon: "Smartphone",
    title: "PWA и мобильные решения",
    description: "Прогрессивные веб-приложения и мобильные решения для лучшего пользовательского опыта",
    detailedDescription: "Создаем прогрессивные веб-приложения (PWA), которые работают как нативные мобильные приложения. Пользователи могут устанавливать их на устройства, получать push-уведомления и работать офлайн.",
    features: ["Офлайн-режим", "Push-уведомления", "Установка как приложение"],
    detailedFeatures: [
      "Работа в офлайн-режиме",
      "Push-уведомления",
      "Установка на домашний экран",
      "Быстрая загрузка и отзывчивость",
      "Интеграция с камерой и GPS",
      "Синхронизация данных",
      "Адаптивный дизайн",
      "Тестирование на всех устройствах"
    ],
    price: "от 250,000 ₸",
    slug: "mobile-pwa",
    is_active: true,
    display_order: 5
  },
  {
    id: "6",
    icon: "BarChart3",
    title: "Аналитика и оптимизация",
    description: "Анализ данных, A/B тестирование и оптимизация конверсий для роста бизнеса",
    detailedDescription: "Настраиваем системы аналитики и проводим A/B тестирование для оптимизации конверсий. Анализируем поведение пользователей, выявляем точки роста и внедряем улучшения.",
    features: ["Веб-аналитика", "A/B тесты", "Отчеты и дашборды"],
    detailedFeatures: [
      "Настройка веб-аналитики",
      "Воронки конверсий и целей",
      "A/B тестирование элементов",
      "Анализ поведения пользователей",
      "Интерактивные дашборды",
      "Автоматические отчеты",
      "Рекомендации по оптимизации",
      "Мониторинг KPI в реальном времени"
    ],
    price: "от 80,000 ₸/мес",
    slug: "analytics-optimization",
    is_active: true,
    display_order: 6
  }
];

const iconMapping: { [key: string]: any } = {
  Globe,
  Bot,
  Settings,
  TrendingUp,
  Smartphone,
  BarChart3
};

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      
      // Use DB data if available, otherwise fallback
      const servicesData = data && data.length > 0 ? data : fallbackServices;
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }
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
            const IconComponent = iconMapping[service.icon] || Globe;
            const detailedDescription = service.detailedDescription || service.description;
            const detailedFeatures = service.detailedFeatures || service.features;
            
            return (
              <Card 
                key={service.id || service.slug}
                className="group card-hover bg-gradient-card border-border/50"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-6 w-6" />
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Подробнее
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <Badge variant="secondary" className="text-primary">
                            {service.price}
                          </Badge>
                        </div>
                        <DialogTitle className="text-2xl text-left">{service.title}</DialogTitle>
                        <DialogDescription className="text-left text-base leading-relaxed">
                          {detailedDescription}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold text-lg mb-4">Что входит в услугу:</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {detailedFeatures.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-8 pt-6 border-t">
                        <Button className="flex-1 btn-gradient">
                          Заказать услугу
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Получить консультацию
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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