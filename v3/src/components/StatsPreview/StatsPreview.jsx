import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsPreview() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const stats = [
    { target: 45, suffix: '+', label: 'stat-1-label' },
    { target: 15, suffix: '', label: 'stat-2-label' },
    { target: 10, suffix: '', label: 'stat-3-label' },
    { target: 50, suffix: '+', label: 'stat-4-label' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray('.stat-counter');
      
      counters.forEach((counter, i) => {
        const target = stats[i].target;
        
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        });
      });

      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-bg-primary text-text-primary border-t border-black/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item flex flex-col items-center text-center">
              <div className="flex items-baseline mb-4 text-accent">
                <span className="stat-counter text-6xl md:text-7xl font-display font-light">0</span>
                <span className="text-4xl md:text-5xl font-display font-light ml-1">{stat.suffix}</span>
              </div>
              <p className="text-sm tracking-widest uppercase text-text-secondary">
                {t(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
