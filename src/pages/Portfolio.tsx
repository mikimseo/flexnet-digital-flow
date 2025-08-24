import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrendingUp, Eye, FolderOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tags: string[];
  metrics?: any;
  is_featured: boolean;
  category_id?: string;
  project_url?: string;
  display_order: number;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch portfolio items
      const { data: items } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      // Fetch categories
      const { data: cats } = await supabase
        .from('portfolio_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (items) setPortfolioItems(items);
      if (cats) setCategories(cats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // If no data from DB, use fallback data
  const fallbackItems = [
    {
      id: "1",
      title: "Интернет-магазин электроники",
      description: "Разработка и оптимизация интернет-магазина с интеграцией CRM",
      image_url: "/api/placeholder/400/250",
      tags: ["React", "Node.js", "CRM", "Payment"],
      metrics: {
        "Рост продаж": "+127%",
        "Конверсия": "4.2%",
        "Время загрузки": "1.2с"
      },
      is_featured: true,
      category_id: "e-commerce",
      display_order: 1,
      is_active: true
    },
    {
      id: "2",
      title: "Корпоративный сайт юридической компании",
      description: "Премиум-сайт с интеграцией чат-бота для консультаций",
      image_url: "/api/placeholder/400/250",
      tags: ["WordPress", "AI-Bot", "SEO"],
      metrics: {
        "Лиды": "+85%",
        "SEO трафик": "+156%",
        "Время на сайте": "+45%"
      },
      is_featured: true,
      category_id: "corporate",
      display_order: 2,
      is_active: true
    },
    {
      id: "3",
      title: "Система управления ресторанами",
      description: "Веб-приложение для управления заказами и аналитики",
      image_url: "/api/placeholder/400/250",
      tags: ["Vue.js", "Dashboard", "API", "Analytics"],
      metrics: {
        "Экономия времени": "60%",
        "Точность заказов": "99.2%",
        "ROI": "+340%"
      },
      is_featured: false,
      category_id: "saas",
      display_order: 3,
      is_active: true
    },
    {
      id: "4",
      title: "Лендинг для IT-курсов",
      description: "Высококонверсионный лендинг с A/B тестированием",
      image_url: "/api/placeholder/400/250",
      tags: ["Landing", "A/B Tests", "Optimization"],
      metrics: {
        "Конверсия": "12.4%",
        "Заявки": "+280%",
        "CTR": "6.8%"
      },
      is_featured: true,
      category_id: "landing",
      display_order: 4,
      is_active: true
    },
    {
      id: "5",
      title: "Мобильное приложение доставки",
      description: "PWA приложение с real-time трекингом заказов",
      image_url: "/api/placeholder/400/250",
      tags: ["PWA", "Real-time", "Geolocation"],
      metrics: {
        "Active users": "25k+",
        "Retention": "78%",
        "Rating": "4.8/5"
      },
      is_featured: false,
      category_id: "mobile",
      display_order: 5,
      is_active: true
    },
    {
      id: "6",
      title: "CRM для агентства недвижимости",
      description: "Полная автоматизация процессов продаж и маркетинга",
      image_url: "/api/placeholder/400/250",
      tags: ["CRM", "Automation", "Integration"],
      metrics: {
        "Продуктивность": "+90%",
        "Качество лидов": "+65%",
        "Время сделки": "-30%"
      },
      is_featured: false,
      category_id: "crm",
      display_order: 6,
      is_active: true
    }
  ];

  const fallbackCategories = [
    { id: "landing", name: "Landing", slug: "landing", is_active: true },
    { id: "corporate", name: "Corporate", slug: "corporate", is_active: true },
    { id: "e-commerce", name: "E-commerce", slug: "e-commerce", is_active: true },
    { id: "saas", name: "SaaS", slug: "saas", is_active: true },
    { id: "mobile", name: "Mobile", slug: "mobile", is_active: true },
    { id: "crm", name: "CRM", slug: "crm", is_active: true }
  ];

  // Use DB data if available, otherwise fallback
  const displayItems = portfolioItems.length > 0 ? portfolioItems : fallbackItems;
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;
  
  const allCategories = ["Все", ...displayCategories.map(cat => cat.name)];

  const filteredItems = selectedCategory === "Все" 
    ? displayItems 
    : displayItems.filter(item => {
        const category = displayCategories.find(cat => cat.id === item.category_id);
        return category?.name === selectedCategory;
      });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Загрузка портфолио...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background/95 to-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FolderOpen className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary">Наши работы</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Портфолио <span className="gradient-text">проектов</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Каждый проект — это история успеха наших клиентов и подтверждение нашей экспертизы в разработке цифровых решений
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-gradient" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <Card 
                  key={item.id}
                  className="group card-hover overflow-hidden"
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
                        {displayCategories.find(cat => cat.id === item.category_id)?.name || "Проект"}
                      </Badge>
                      {item.is_featured && (
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
                    
                    {item.metrics && (
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        {Object.entries(item.metrics).slice(0, 2).map(([label, value]) => (
                          <div key={label} className="text-center">
                            <div className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {value as string}
                            </div>
                            <div className="text-xs text-muted-foreground">{label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Проекты не найдены</h3>
                <p className="text-muted-foreground">
                  В выбранной категории пока нет проектов. Выберите другую категорию или посмотрите все проекты.
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center mt-16 pt-16 border-t">
              <h3 className="text-2xl font-bold mb-4">
                Хотите создать проект мечты?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Обсудим ваши идеи и создадим решение, которое превзойдет ожидания
              </p>
              <Button size="lg" className="btn-gradient" asChild>
                <a href="#contacts">Обсудить ваш проект</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}