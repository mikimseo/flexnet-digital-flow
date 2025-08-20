import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Алексей Петров",
    position: "Директор по маркетингу",
    company: "TechCorp",
    avatar: "AP",
    text: "FLEXNET создали для нас потрясающий интернет-магазин. Продажи выросли на 127% за первые 3 месяца. Команда профессионалов высочайшего уровня!",
    rating: 5,
    project: "Интернет-магазин электроники"
  },
  {
    id: 2,
    name: "Мария Исаева",
    position: "Управляющий партнер",
    company: "LegalPro",
    avatar: "МИ",
    text: "Превосходный корпоративный сайт с ИИ-чатботом. Количество обращений увеличилось в 2 раза, а качество лидов стало намного выше.",
    rating: 5,
    project: "Корпоративный сайт + ИИ-бот"
  },
  {
    id: 3,
    name: "Дмитрий Ковалев",
    position: "CEO",
    company: "RestaurantChain",
    avatar: "ДК",
    text: "Система управления ресторанами от FLEXNET помогла нам автоматизировать все процессы. Экономим 60% времени на рутинных задачах.",
    rating: 5,
    project: "CRM система для ресторанов"
  },
  {
    id: 4,
    name: "Анна Смирнова",
    position: "Основатель",
    company: "EduTech",
    avatar: "АС",
    text: "Лендинг для наших IT-курсов показал конверсию 12.4%! Это в 3 раза больше, чем у предыдущего сайта. Рекомендуем всем!",
    rating: 5,
    project: "Лендинг для IT-курсов"
  },
  {
    id: 5,
    name: "Сергей Волков",
    position: "Операционный директор",
    company: "DeliveryFast",
    avatar: "СВ",
    text: "PWA приложение для доставки работает безупречно. 25k+ активных пользователей и рейтинг 4.8 говорят сами за себя.",
    rating: 5,
    project: "PWA приложение доставки"
  },
  {
    id: 6,
    name: "Елена Козлова",
    position: "Директор по продажам",
    company: "RealEstate+",
    avatar: "ЕК",
    text: "CRM система увеличила нашу продуктивность на 90%. Время закрытия сделок сократилось на 30%. Отличная работа!",
    rating: 5,
    project: "CRM для агентства недвижимости"
  }
];

export function Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev + slidesToShow >= reviews.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + slidesToShow >= reviews.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.max(0, reviews.length - slidesToShow) : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-muted text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Отзывы клиентов</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Что говорят о нас <span className="gradient-text">наши клиенты</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 98% наших клиентов остаются довольны результатами и рекомендуют нас
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Reviews container */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`w-full flex-shrink-0 px-4`}
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <Card className="h-full bg-gradient-card border-border/50 card-hover">
                    <CardContent className="p-6">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {renderStars(review.rating)}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-foreground mb-6 leading-relaxed relative">
                        <Quote className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
                        <span className="relative z-10">{review.text}</span>
                      </blockquote>
                      
                      {/* Project */}
                      <div className="text-sm text-primary font-medium mb-4 bg-primary/10 px-3 py-1 rounded-full inline-block">
                        {review.project}
                      </div>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{review.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.position}, {review.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(reviews.length / slidesToShow) }, (_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentSlide / slidesToShow) === i
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentSlide(i * slidesToShow)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Хотите такие же результаты?</h3>
            <p className="text-muted-foreground mb-6">
              Расскажите о вашем проекте — мы найдем лучшее решение
            </p>
            <Button size="lg" className="btn-gradient">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}