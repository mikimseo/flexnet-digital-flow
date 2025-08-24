-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  href TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  is_external BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_items
CREATE POLICY "Anyone can view active menu items" 
ON public.menu_items 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage menu items" 
ON public.menu_items 
FOR ALL 
USING (is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default menu items
INSERT INTO public.menu_items (name, href, key, is_external, display_order) VALUES
('Главная', '#hero', 'home', false, 1),
('Услуги', '#services', 'services', false, 2),
('Портфолио', '/portfolio', 'portfolio', false, 3),
('Отзывы', '#reviews', 'reviews', false, 4),
('Контакты', '#contacts', 'contacts', false, 5);