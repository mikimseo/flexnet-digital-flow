import { useInView } from "react-intersection-observer";

const clientLogos = [
  { name: "TechCorp", logo: "TC" },
  { name: "InnovateLab", logo: "IL" },
  { name: "DataSoft", logo: "DS" },
  { name: "CloudMax", logo: "CM" },
  { name: "WebFlow", logo: "WF" },
  { name: "StartupHub", logo: "SH" },
  { name: "DigitalPro", logo: "DP" },
  { name: "CyberSpace", logo: "CS" },
  { name: "FutureTech", logo: "FT" },
  { name: "SmartSys", logo: "SS" },
  { name: "NextGen", logo: "NG" },
  { name: "DevStudio", logo: "DS" },
];

export function ClientLogos() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Нам доверяют
          </h2>
          <p className="text-muted-foreground">
            Более 50 компаний выбрали нас для реализации своих проектов
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
              {clientLogos.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center justify-center w-24 h-16 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {client.logo}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Duplicate set for infinite scroll effect */}
            <div className="flex gap-8 min-w-max">
              {clientLogos.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center justify-center w-24 h-16 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {client.logo}
                  </div>
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