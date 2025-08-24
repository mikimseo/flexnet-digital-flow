-- Insert sample portfolio items from the website
INSERT INTO public.portfolio_items (title, description, image_url, tags, metrics, is_featured, is_active, display_order, project_url) VALUES
(
  'Интернет-магазин электроники',
  'Разработка и оптимизация интернет-магазина с интеграцией CRM',
  '/api/placeholder/400/250',
  ARRAY['React', 'Node.js', 'CRM', 'Payment'],
  '{"Рост продаж": "+127%", "Конверсия": "4.2%", "Время загрузки": "1.2с"}'::jsonb,
  true,
  true,
  1,
  '#'
),
(
  'Корпоративный сайт юридической компании',
  'Премиум-сайт с интеграцией чат-бота для консультаций',
  '/api/placeholder/400/250',
  ARRAY['WordPress', 'AI-Bot', 'SEO'],
  '{"Лиды": "+85%", "SEO трафик": "+156%", "Время на сайте": "+45%"}'::jsonb,
  true,
  true,
  2,
  '#'
),
(
  'Система управления ресторанами',
  'Веб-приложение для управления заказами и аналитики',
  '/api/placeholder/400/250',
  ARRAY['Vue.js', 'Dashboard', 'API', 'Analytics'],
  '{"Экономия времени": "60%", "Точность заказов": "99.2%", "ROI": "+340%"}'::jsonb,
  false,
  true,
  3,
  '#'
),
(
  'Лендинг для IT-курсов',
  'Высококонверсионный лендинг с A/B тестированием',
  '/api/placeholder/400/250',
  ARRAY['Landing', 'A/B Tests', 'Optimization'],
  '{"Конверсия": "12.4%", "Заявки": "+280%", "CTR": "6.8%"}'::jsonb,
  true,
  true,
  4,
  '#'
),
(
  'Мобильное приложение доставки',
  'PWA приложение с real-time трекингом заказов',
  '/api/placeholder/400/250',
  ARRAY['PWA', 'Real-time', 'Geolocation'],
  '{"Active users": "25k+", "Retention": "78%", "Rating": "4.8/5"}'::jsonb,
  false,
  true,
  5,
  '#'
),
(
  'CRM для агентства недвижимости',
  'Полная автоматизация процессов продаж и маркетинга',
  '/api/placeholder/400/250',
  ARRAY['CRM', 'Automation', 'Integration'],
  '{"Продуктивность": "+90%", "Качество лидов": "+65%", "Время сделки": "-30%"}'::jsonb,
  false,
  true,
  6,
  '#'
);