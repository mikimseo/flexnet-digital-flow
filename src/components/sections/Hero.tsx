import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Digital-агентство полного цикла
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="gradient-text">FLEXNET</span> —<br />
            Digital-агентство:<br />
            <span className="text-3xl lg:text-5xl">
              сайты, ИИ-интеграции,<br />
              CRM и рост продаж
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Создаём сайты и внедряем ИИ-агентов, автоматизируем маркетинг и продажи 
            для устойчивого роста вашего бизнеса.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="btn-gradient group">
              Обсудить проект
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Play className="mr-2 h-4 w-4" />
              Портфолио
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Успешных проектов</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Поддержка</div>
            </div>
          </div>
        </div>
        
        {/* Right side - Chat Widget */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Decorative elements around chat */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent/20 rounded-full animate-ping delay-500"></div>
            
            {/* Chat widget positioned relatively for hero */}
            <div className="relative">
              <ChatWidget className="relative bottom-auto right-auto shadow-2xl" />
            </div>
            
            {/* Feature callouts */}
            <div className="absolute -left-16 top-16 hidden lg:block">
              <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
                <div className="text-sm font-medium">ИИ-консультант 24/7</div>
                <div className="text-xs text-muted-foreground">Моментальные ответы на ваши вопросы</div>
              </div>
            </div>
            
            <div className="absolute -right-16 bottom-16 hidden lg:block">
              <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
                <div className="text-sm font-medium">Бесплатная консультация</div>
                <div className="text-xs text-muted-foreground">Обсудим ваш проект прямо сейчас</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}