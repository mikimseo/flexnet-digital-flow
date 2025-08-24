-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  project TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Anyone can view active reviews" 
ON public.reviews 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage reviews" 
ON public.reviews 
FOR ALL 
USING (is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample reviews
INSERT INTO public.reviews (name, position, company, text, rating, project, display_order) VALUES
(
  'Алексей Петров',
  'Директор по маркетингу',
  'TechCorp',
  'Отличная работа! Сайт превзошел все ожидания. Конверсия выросла на 180%, а время загрузки сократилось в 3 раза. Команда очень профессиональная.',
  5,
  'Корпоративный сайт',
  1
),
(
  'Мария Иванова',
  'CEO',
  'StartupHub',
  'Внедрили ИИ-чат бота для нашего интернет-магазина. Теперь 70% вопросов клиентов обрабатывается автоматически. Рекомендую!',
  5,
  'ИИ-интеграция для e-commerce',
  2
),
(
  'Дмитрий Козлов',
  'Руководитель отдела продаж',
  'SalesForce Pro',
  'CRM система полностью автоматизировала наши процессы. Продуктивность команды выросла на 90%. Спасибо за качественную работу!',
  5,
  'CRM для агентства недвижимости',
  3
),
(
  'Анна Волкова',
  'Маркетолог',
  'EduTech',
  'Лендинг для наших курсов показывает невероятные результаты - конверсия 12.4%! Это в 4 раза больше чем было раньше.',
  5,
  'Лендинг для IT-курсов',
  4
),
(
  'Сергей Морозов',
  'Технический директор',
  'LogisticsPro',
  'PWA приложение работает как часы. 25000+ активных пользователей и рейтинг 4.8/5. Пользователи в восторге от скорости.',
  5,
  'Мобильное приложение доставки',
  5
),
(
  'Елена Смирнова',
  'Владелец бизнеса',
  'RetailChain',
  'Благодаря SEO-оптимизации органический трафик вырос на 156%. Сайт теперь на первых позициях по ключевым запросам.',
  5,
  'SEO-продвижение',
  6
);