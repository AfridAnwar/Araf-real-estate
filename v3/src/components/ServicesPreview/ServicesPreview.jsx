import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPreview() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    { key: 'service-1', image: '/v3/assets/img/hero/home1-banner-img1.jpg' },
    { key: 'service-2', image: '/v3/assets/img/hero/home1-banner-img2.jpg' },
    { key: 'service-3', image: '/v3/assets/img/hero/home1-banner-img3.jpg' },
    { key: 'service-4', image: '/v3/assets/img/projects/p1.jpg' },
    { key: 'service-5', image: '/v3/assets/img/projects/p2.jpg' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-item', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-bg-primary text-text-primary relative overflow-hidden min-h-screen flex items-center">
      
      {/* Background Hover Images (Optional: Adds extreme luxury feel) */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 opacity-20">
        {services.map((service, idx) => (
          <img 
            key={idx}
            src={service.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16 service-item">
          <span className="w-12 h-px bg-accent"></span>
          <span className="uppercase tracking-[0.2em] text-sm text-accent font-medium">
            {t('services-label')}
          </span>
        </div>

        <div className="flex flex-col border-t border-black/10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-item group border-b border-black/10 py-8 md:py-12 cursor-pointer flex items-center justify-between transition-colors duration-500 hover:bg-black/5 px-4 -mx-4"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className="text-4xl md:text-6xl font-display text-text-primary group-hover:translate-x-4 transition-transform duration-500">
                {t(service.key)}
              </h3>
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-2xl font-light">
                &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
