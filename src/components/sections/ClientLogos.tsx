import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { supabase } from "@/integrations/supabase/client";

interface Company {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
  display_order: number;
  is_active: boolean;
}

export function ClientLogos() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching companies:', error);
        return;
      }

      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback static data if no companies in database
  const fallbackLogos = [
    { name: "TechCorp", logo_url: null, initials: "TC" },
    { name: "InnovateLab", logo_url: null, initials: "IL" },
    { name: "DataSoft", logo_url: null, initials: "DS" },
    { name: "CloudMax", logo_url: null, initials: "CM" },
    { name: "WebFlow", logo_url: null, initials: "WF" },
    { name: "StartupHub", logo_url: null, initials: "SH" },
    { name: "DigitalPro", logo_url: null, initials: "DP" },
    { name: "CyberSpace", logo_url: null, initials: "CS" },
  ];

  const displayCompanies = companies.length > 0 ? companies : fallbackLogos;

  const getDisplayContent = (company: any) => {
    if (company.logo_url) {
      return (
        <img 
          src={company.logo_url} 
          alt={company.name}
          className="max-w-full max-h-10 object-contain"
        />
      );
    }
    
    // Show initials if no logo
    const initials = company.initials || company.name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return (
      <div className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
        {initials}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-background border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Нам доверяют
            </h2>
            <p className="text-muted-foreground">
              Загрузка компаний...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Нам доверяют
          </h2>
          <p className="text-muted-foreground">
            Компании, которые доверили нам свои проекты
          </p>
        </div>
        
        <div 
          ref={ref}
          className="relative overflow-hidden"
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent"></div>
          
          {/* Logos container */}
          <div className={`flex gap-8 ${inView ? 'animate-scroll' : ''}`}>
            {/* First set of logos */}
            <div className="flex gap-8 min-w-max">
              {displayCompanies.map((company, index) => (
                <div
                  key={`first-${company.id || index}`}
                  className="flex items-center justify-center w-24 h-16 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                  title={company.name}
                >
                  {getDisplayContent(company)}
                </div>
              ))}
            </div>
            
            {/* Duplicate set for infinite scroll effect */}
            <div className="flex gap-8 min-w-max">
              {displayCompanies.map((company, index) => (
                <div
                  key={`second-${company.id || index}`}
                  className="flex items-center justify-center w-24 h-16 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                  title={company.name}
                >
                  {getDisplayContent(company)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}