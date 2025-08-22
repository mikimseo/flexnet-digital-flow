import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category_id?: string;
  tags: string[];
  metrics: any;
  image_url?: string;
  project_url?: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

export function PortfolioManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
  
  // Categories state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    slug: '',
    display_order: 0,
  });
  
  // Portfolio items state
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [itemFormData, setItemFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    tags: '',
    metrics: '',
    image_url: '',
    project_url: '',
    is_featured: false,
    display_order: 0,
  });
  
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        supabase.from('portfolio_categories').select('*').order('display_order'),
        supabase.from('portfolio_items').select('*').order('display_order')
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      if (itemsRes.error) throw itemsRes.error;

      setCategories(categoriesRes.data || []);
      setPortfolioItems(itemsRes.data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить данные",
      });
    } finally {
      setLoading(false);
    }
  };

  // Category management
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('portfolio_categories')
          .update(categoryFormData)
          .eq('id', editingCategory.id);
        
        if (error) throw error;
        
        toast({
          title: "Успешно",
          description: "Категория обновлена",
        });
      } else {
        const { error } = await supabase
          .from('portfolio_categories')
          .insert([categoryFormData]);
        
        if (error) throw error;
        
        toast({
          title: "Успешно",
          description: "Категория добавлена",
        });
      }
      
      setCategoryDialogOpen(false);
      setEditingCategory(null);
      setCategoryFormData({ name: '', slug: '', display_order: 0 });
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      slug: category.slug,
      display_order: category.display_order,
    });
    setCategoryDialogOpen(true);
  };

  const handleCategoryDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;
    
    try {
      const { error } = await supabase
        .from('portfolio_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Успешно",
        description: "Категория удалена",
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  // Portfolio item management
  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = itemFormData.tags
      .split(',')
      .filter(t => t.trim())
      .map(t => t.trim());
    
    let metricsObj = {};
    try {
      if (itemFormData.metrics) {
        metricsObj = JSON.parse(itemFormData.metrics);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Некорректный JSON в метриках",
      });
      return;
    }
    
    const itemData = {
      title: itemFormData.title,
      description: itemFormData.description,
      category_id: itemFormData.category_id || null,
      tags: tagsArray,
      metrics: metricsObj,
      image_url: itemFormData.image_url || null,
      project_url: itemFormData.project_url || null,
      is_featured: itemFormData.is_featured,
      display_order: itemFormData.display_order,
    };
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(itemData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        
        toast({
          title: "Успешно",
          description: "Проект обновлен",
        });
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([itemData]);
        
        if (error) throw error;
        
        toast({
          title: "Успешно",
          description: "Проект добавлен",
        });
      }
      
      setItemDialogOpen(false);
      setEditingItem(null);
      setItemFormData({ title: '', description: '', category_id: '', tags: '', metrics: '', image_url: '', project_url: '', is_featured: false, display_order: 0 });
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  const handleItemEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setItemFormData({
      title: item.title,
      description: item.description,
      category_id: item.category_id || '',
      tags: item.tags.join(', '),
      metrics: JSON.stringify(item.metrics, null, 2),
      image_url: item.image_url || '',
      project_url: item.project_url || '',
      is_featured: item.is_featured,
      display_order: item.display_order,
    });
    setItemDialogOpen(true);
  };

  const handleItemDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;
    
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Успешно",
        description: "Проект удален",
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  const toggleItemActive = async (item: PortfolioItem) => {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update({ is_active: !item.is_active })
        .eq('id', item.id);
      
      if (error) throw error;
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление портфолио</CardTitle>
        <CardDescription>
          Управляйте проектами и категориями портфолио
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="items">Проекты</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Проекты портфолио</h3>
              <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingItem(null);
                    setItemFormData({ title: '', description: '', category_id: '', tags: '', metrics: '', image_url: '', project_url: '', is_featured: false, display_order: 0 });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить проект
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Редактировать проект' : 'Добавить проект'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleItemSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Название</Label>
                        <Input
                          id="title"
                          value={itemFormData.title}
                          onChange={(e) => setItemFormData({ ...itemFormData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Категория</Label>
                        <Select
                          value={itemFormData.category_id}
                          onValueChange={(value) => setItemFormData({ ...itemFormData, category_id: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={itemFormData.description}
                        onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tags">Теги (через запятую)</Label>
                        <Input
                          id="tags"
                          value={itemFormData.tags}
                          onChange={(e) => setItemFormData({ ...itemFormData, tags: e.target.value })}
                          placeholder="React, TypeScript, API"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="display_order">Порядок</Label>
                        <Input
                          id="display_order"
                          type="number"
                          value={itemFormData.display_order}
                          onChange={(e) => setItemFormData({ ...itemFormData, display_order: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="image_url">URL изображения</Label>
                        <Input
                          id="image_url"
                          value={itemFormData.image_url}
                          onChange={(e) => setItemFormData({ ...itemFormData, image_url: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project_url">URL проекта</Label>
                        <Input
                          id="project_url"
                          value={itemFormData.project_url}
                          onChange={(e) => setItemFormData({ ...itemFormData, project_url: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metrics">Метрики (JSON)</Label>
                      <Textarea
                        id="metrics"
                        value={itemFormData.metrics}
                        onChange={(e) => setItemFormData({ ...itemFormData, metrics: e.target.value })}
                        placeholder='{"performance": "+45%", "users": "10K+"}'
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_featured"
                        checked={itemFormData.is_featured}
                        onCheckedChange={(checked) => setItemFormData({ ...itemFormData, is_featured: checked as boolean })}
                      />
                      <Label htmlFor="is_featured">Рекомендуемый проект</Label>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingItem ? 'Обновить' : 'Добавить'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Рекомендуемый</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioItems.map((item) => {
                  const category = categories.find(c => c.id === item.category_id);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{category?.name || 'Без категории'}</TableCell>
                      <TableCell>{item.is_featured ? 'Да' : 'Нет'}</TableCell>
                      <TableCell>
                        <Button
                          variant={item.is_active ? "default" : "secondary"}
                          size="sm"
                          onClick={() => toggleItemActive(item)}
                        >
                          {item.is_active ? "Активен" : "Неактивен"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleItemEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleItemDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Категории портфолио</h3>
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingCategory(null);
                    setCategoryFormData({ name: '', slug: '', display_order: 0 });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить категорию
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название</Label>
                      <Input
                        id="name"
                        value={categoryFormData.name}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Слаг</Label>
                      <Input
                        id="slug"
                        value={categoryFormData.slug}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="display_order">Порядок отображения</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={categoryFormData.display_order}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingCategory ? 'Обновить' : 'Добавить'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Слаг</TableHead>
                  <TableHead>Порядок</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.display_order}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCategoryEdit(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCategoryDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}