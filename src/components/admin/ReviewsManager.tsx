import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  avatar_url?: string;
  project?: string;
  is_active: boolean;
  display_order: number;
}

interface ReviewFormData {
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  avatar_url: string;
  project: string;
  display_order: number;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: "1",
    name: "Алексей Петров",
    position: "Директор по маркетингу",
    company: "TechCorp",
    text: "Отличная работа! Сайт превзошел все ожидания. Конверсия выросла на 180%, а время загрузки сократилось в 3 раза. Команда очень профессиональная.",
    rating: 5,
    project: "Корпоративный сайт",
    is_active: true,
    display_order: 1
  },
  {
    id: "2",
    name: "Мария Иванова",
    position: "CEO",
    company: "StartupHub",
    text: "Внедрили ИИ-чат бота для нашего интернет-магазина. Теперь 70% вопросов клиентов обрабатывается автоматически. Рекомендую!",
    rating: 5,
    project: "ИИ-интеграция для e-commerce",
    is_active: true,
    display_order: 2
  },
  {
    id: "3",
    name: "Дмитрий Козлов",
    position: "Руководитель отдела продаж",
    company: "SalesForce Pro",
    text: "CRM система полностью автоматизировала наши процессы. Продуктивность команды выросла на 90%. Спасибо за качественную работу!",
    rating: 5,
    project: "CRM для агентства недвижимости",
    is_active: true,
    display_order: 3
  },
  {
    id: "4",
    name: "Анна Волкова",
    position: "Маркетолог",
    company: "EduTech",
    text: "Лендинг для наших курсов показывает невероятные результаты - конверсия 12.4%! Это в 4 раза больше чем было раньше.",
    rating: 5,
    project: "Лендинг для IT-курсов",
    is_active: true,
    display_order: 4
  },
  {
    id: "5",
    name: "Сергей Морозов",
    position: "Технический директор",
    company: "LogisticsPro",
    text: "PWA приложение работает как часы. 25000+ активных пользователей и рейтинг 4.8/5. Пользователи в восторге от скорости.",
    rating: 5,
    project: "Мобильное приложение доставки",
    is_active: true,
    display_order: 5
  },
  {
    id: "6",
    name: "Елена Смирнова",
    position: "Владелец бизнеса",
    company: "RetailChain",
    text: "Благодаря SEO-оптимизации органический трафик вырос на 156%. Сайт теперь на первых позициях по ключевым запросам.",
    rating: 5,
    project: "SEO-продвижение",
    is_active: true,
    display_order: 6
  }
];

export function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    position: "",
    company: "",
    text: "",
    rating: 5,
    avatar_url: "",
    project: "",
    display_order: 0
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingReview) {
        setReviews(reviews.map(review => 
          review.id === editingReview.id 
            ? { ...review, ...formData }
            : review
        ));
        
        toast({
          title: "Успешно",
          description: "Отзыв обновлен",
        });
      } else {
        const newReview: Review = {
          ...formData,
          id: Date.now().toString(),
          is_active: true
        };
        setReviews([...reviews, newReview]);
        
        toast({
          title: "Успешно",
          description: "Отзыв добавлен",
        });
      }

      setIsDialogOpen(false);
      setEditingReview(null);
      setFormData({
        name: "",
        position: "",
        company: "",
        text: "",
        rating: 5,
        avatar_url: "",
        project: "",
        display_order: 0
      });
    } catch (error) {
      console.error('Error saving review:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить отзыв",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      position: review.position,
      company: review.company,
      text: review.text,
      rating: review.rating,
      avatar_url: review.avatar_url || "",
      project: review.project || "",
      display_order: review.display_order
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    try {
      setReviews(reviews.filter(review => review.id !== id));
      
      toast({
        title: "Успешно",
        description: "Отзыв удален",
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить отзыв",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      setReviews(reviews.map(review => 
        review.id === id 
          ? { ...review, is_active: !currentStatus }
          : review
      ));
      
      toast({
        title: "Успешно",
        description: `Отзыв ${!currentStatus ? 'активирован' : 'деактивирован'}`,
      });
    } catch (error) {
      console.error('Error toggling review status:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус отзыва",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Управление отзывами</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingReview(null);
                setFormData({
                  name: "",
                  position: "",
                  company: "",
                  text: "",
                  rating: 5,
                  avatar_url: "",
                  project: "",
                  display_order: reviews.length + 1
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить отзыв
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingReview ? "Редактировать отзыв" : "Добавить отзыв"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Должность</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Проект</Label>
                    <Input
                      id="project"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Текст отзыва</Label>
                  <Textarea
                    id="text"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Рейтинг</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Порядок отображения</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar_url">URL аватара</Label>
                  <Input
                    id="avatar_url"
                    type="url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingReview ? "Сохранить" : "Добавить"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Рейтинг</TableHead>
              <TableHead>Проект</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.position}</div>
                  </div>
                </TableCell>
                <TableCell>{review.company}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate">{review.project}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={review.is_active ? "default" : "secondary"}>
                    {review.is_active ? "Активен" : "Неактивен"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(review.id, review.is_active)}
                    >
                      {review.is_active ? "Скрыть" : "Показать"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {reviews.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Отзывы не найдены. Добавьте первый отзыв.
          </div>
        )}
      </CardContent>
    </Card>
  );
}