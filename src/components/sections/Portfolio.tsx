import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, TrendingUp } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Интернет-магазин электроники",
    category: "E-commerce",
    description: "Разработка и оптимизация интернет-магазина с интеграцией CRM",
    image: "/api/placeholder/400/250",
    tags: ["React", "Node.js", "CRM", "Payment"],
    metrics: [
      { label: "Рост продаж", value: "+127%" },
      { label: "Конверсия", value: "4.2%" },
      { label: "Время загрузки", value: "1.2с" }
    ],
    slug: "electronics-store",
    featured: true
  },
  {
    id: 2,
    title: "Корпоративный сайт юридической компании",
    category: "Corporate",
    description: "Премиум-сайт с интеграцией чат-бота для консультаций",
    image: "/api/placeholder/400/250",
    tags: ["WordPress", "AI-Bot", "SEO"],
    metrics: [
      { label: "Лиды", value: "+85%" },
      { label: "SEO трафик", value: "+156%" },
      { label: "Время на сайте", value: "+45%" }
    ],
    slug: "law-firm-website",
    featured: true
  },
  {
    id: 3,
    title: "Система управления ресторанами",
    category: "SaaS",
    description: "Веб-приложение для управления заказами и аналитики",
    image: "/api/placeholder/400/250",
    tags: ["Vue.js", "Dashboard", "API", "Analytics"],
    metrics: [
      { label: "Экономия времени", value: "60%" },
      { label: "Точность заказов", value: "99.2%" },
      { label: "ROI", value: "+340%" }
    ],
    slug: "restaurant-management",
    featured: false
  },
  {
    id: 4,
    title: "Лендинг для IT-курсов",
    category: "Landing",
    description: "Высококонверсионный лендинг с A/B тестированием",
    image: "/api/placeholder/400/250",
    tags: ["Landing", "A/B Tests", "Optimization"],
    metrics: [
      { label: "Конверсия", value: "12.4%" },
      { label: "Заявки", value: "+280%" },
      { label: "CTR", value: "6.8%" }
    ],
    slug: "it-courses-landing",
    featured: true
  },
  {
    id: 5,
    title: "Мобильное приложение доставки",
    category: "Mobile",
    description: "PWA приложение с real-time трекингом заказов",
    image: "/api/placeholder/400/250",
    tags: ["PWA", "Real-time", "Geolocation"],
    metrics: [
      { label: "Active users", value: "25k+" },
      { label: "Retention", value: "78%" },
      { label: "Rating", value: "4.8/5" }
    ],
    slug: "delivery-app",
    featured: false
  },
  {
    id: 6,
    title: "CRM для агентства недвижимости",
    category: "CRM",
    description: "Полная автоматизация процессов продаж и маркетинга",
    image: "/api/placeholder/400/250",
    tags: ["CRM", "Automation", "Integration"],
    metrics: [
      { label: "Продуктивность", value: "+90%" },
      { label: "Качество лидов", value: "+65%" },
      { label: "Время сделки", value: "-30%" }
    ],
    slug: "real-estate-crm",
    featured: false
  }
];

const categories = ["Все", "Landing", "Corporate", "E-commerce", "SaaS", "Mobile", "CRM"];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const filteredItems = selectedCategory === "Все" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Портфолио</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Наши <span className="gradient-text">успешные проекты</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Каждый проект — это история успеха наших клиентов и подтверждение нашей экспертизы
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className={`group card-hover overflow-hidden ${item.featured ? 'lg:col-span-1 lg:row-span-1' : ''}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🚀</div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.featured && (
                    <Badge className="text-xs bg-gradient-to-r from-primary to-accent text-white">
                      Популярный
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  {item.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="mr-4">
            Все проекты
          </Button>
          <Button size="lg" className="btn-gradient">
            Обсудить ваш проект
          </Button>
        </div>
      </div>
    </section>
  );
}