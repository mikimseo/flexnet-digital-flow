import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  key: string;
  is_external: boolean;
  is_active: boolean;
  display_order: number;
}

interface MenuFormData {
  name: string;
  href: string;
  key: string;
  is_external: boolean;
  display_order: number;
}

// Sample menu data
const sampleMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Главная",
    href: "#hero",
    key: "home",
    is_external: false,
    is_active: true,
    display_order: 1
  },
  {
    id: "2",
    name: "Услуги",
    href: "#services",
    key: "services",
    is_external: false,
    is_active: true,
    display_order: 2
  },
  {
    id: "3",
    name: "Портфолио",
    href: "/portfolio",
    key: "portfolio",
    is_external: false,
    is_active: true,
    display_order: 3
  },
  {
    id: "4",
    name: "Отзывы",
    href: "#reviews",
    key: "reviews",
    is_external: false,
    is_active: true,
    display_order: 4
  },
  {
    id: "5",
    name: "Контакты",
    href: "#contacts",
    key: "contacts",
    is_external: false,
    is_active: true,
    display_order: 5
  }
];

export function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    href: "",
    key: "",
    is_external: false,
    display_order: 0
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        setMenuItems(menuItems.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        ));
        
        toast({
          title: "Успешно",
          description: "Пункт меню обновлен",
        });
      } else {
        const newItem: MenuItem = {
          ...formData,
          id: Date.now().toString(),
          is_active: true
        };
        setMenuItems([...menuItems, newItem]);
        
        toast({
          title: "Успешно",
          description: "Пункт меню добавлен",
        });
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({
        name: "",
        href: "",
        key: "",
        is_external: false,
        display_order: 0
      });
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить пункт меню",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      href: item.href,
      key: item.key,
      is_external: item.is_external,
      display_order: item.display_order
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот пункт меню?")) return;

    try {
      setMenuItems(menuItems.filter(item => item.id !== id));
      
      toast({
        title: "Успешно",
        description: "Пункт меню удален",
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пункт меню",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      setMenuItems(menuItems.map(item => 
        item.id === id 
          ? { ...item, is_active: !currentStatus }
          : item
      ));
      
      toast({
        title: "Успешно",
        description: `Пункт меню ${!currentStatus ? 'активирован' : 'деактивирован'}`,
      });
    } catch (error) {
      console.error('Error toggling menu item status:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус пункта меню",
        variant: "destructive",
      });
    }
  };

  const generateKey = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Menu className="h-5 w-5" />
            Управление меню
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingItem(null);
                setFormData({
                  name: "",
                  href: "",
                  key: "",
                  is_external: false,
                  display_order: menuItems.length + 1
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить пункт меню
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Редактировать пункт меню" : "Добавить пункт меню"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({ 
                        ...formData, 
                        name,
                        key: formData.key || generateKey(name)
                      });
                    }}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="href">Ссылка</Label>
                  <Input
                    id="href"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    placeholder="#section или /page"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key">Ключ (уникальный идентификатор)</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Порядок</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Внешняя ссылка</Label>
                    <div className="flex items-center pt-2">
                      <Switch
                        checked={formData.is_external}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_external: checked })}
                      />
                      <span className="ml-2 text-sm text-muted-foreground">
                        {formData.is_external ? "Да" : "Нет"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingItem ? "Сохранить" : "Добавить"}
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
              <TableHead>Название</TableHead>
              <TableHead>Ссылка</TableHead>
              <TableHead>Ключ</TableHead>
              <TableHead>Порядок</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.sort((a, b) => a.display_order - b.display_order).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {item.href}
                  {item.is_external && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Внешняя
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">{item.key}</code>
                </TableCell>
                <TableCell>{item.display_order}</TableCell>
                <TableCell>
                  <Badge variant={item.is_active ? "default" : "secondary"}>
                    {item.is_active ? "Активен" : "Скрыт"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(item.id, item.is_active)}
                    >
                      {item.is_active ? "Скрыть" : "Показать"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {menuItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Пункты меню не найдены. Добавьте первый пункт меню.
          </div>
        )}
      </CardContent>
    </Card>
  );
}