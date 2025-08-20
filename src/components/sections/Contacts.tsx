import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function Contacts() {
  return (
    <section id="contacts" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Готовы обсудить <span className="gradient-text">ваш проект</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом — мы ответим в течение 30 минут
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Расскажите о вашем проекте</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя *</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Компания</label>
                  <Input placeholder="Название компании" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input type="email" placeholder="example@company.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <Input placeholder="+7 (000) 000-00-00" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Бюджет проекта</label>
                <select className="w-full p-3 border border-input rounded-md bg-background">
                  <option>До 200,000 ₸</option>
                  <option>200,000 - 500,000 ₸</option>
                  <option>500,000 - 1,000,000 ₸</option>
                  <option>Свыше 1,000,000 ₸</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Описание проекта *</label>
                <Textarea placeholder="Расскажите подробнее о ваших задачах и целях..." rows={4} />
              </div>
              <Button className="w-full btn-gradient" size="lg">
                Отправить заявку
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">hello@flexnet.kz</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-muted-foreground">+7 (000) 000-00-00</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">г. Алматы / Каскелен</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Часы работы</div>
                    <div className="text-muted-foreground">Пн-Пт: 9:00-18:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}