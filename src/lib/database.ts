// Конфигурация для подключения к MySQL через API
// Замените URL на адрес вашего API

const API_BASE_URL = 'https://yourdomain.com/api'; // Замените на ваш домен

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  key: string;
  is_external: boolean;
  is_active: boolean;
  display_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug?: string;
  price?: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category_id?: string;
  image_url?: string;
  project_url?: string;
  tags: string[];
  metrics: any;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

export interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  avatar_url?: string;
  project?: string;
  display_order: number;
  is_active: boolean;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  logo_url?: string;
  display_order: number;
  is_active: boolean;
}

// API функции
export const api = {
  async getMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menu-items.php`);
    return response.json();
  },

  async getServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services.php`);
    return response.json();
  },

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    const response = await fetch(`${API_BASE_URL}/portfolio.php`);
    return response.json();
  },

  async getReviews(): Promise<Review[]> {
    const response = await fetch(`${API_BASE_URL}/reviews.php`);
    return response.json();
  },

  async getCompanies(): Promise<Company[]> {
    const response = await fetch(`${API_BASE_URL}/companies.php`);
    return response.json();
  },

  async addMessage(sessionId: string, senderType: string, content: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/messages.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        sender_type: senderType,
        content: content
      })
    });
    return response.ok;
  }
};