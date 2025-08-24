import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompaniesManager } from '@/components/admin/CompaniesManager';
import { ServicesManager } from '@/components/admin/ServicesManager';
import { PortfolioManager } from '@/components/admin/PortfolioManager';
import { ReviewsManager } from '@/components/admin/ReviewsManager';
import { MenuManager } from '@/components/admin/MenuManager';
import { LogOut, Settings } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Админ панель</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="companies" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="companies">Компании</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="menu">Меню</TabsTrigger>
          </TabsList>
          
          <TabsContent value="companies" className="mt-6">
            <CompaniesManager />
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <ServicesManager />
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-6">
            <PortfolioManager />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <ReviewsManager />
          </TabsContent>
          
          <TabsContent value="menu" className="mt-6">
            <MenuManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}