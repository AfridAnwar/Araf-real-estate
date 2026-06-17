import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Masterpieces() {
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const images = [
    { src: '/assets/img/projects/p1.jpg', speed: 0.1, aspect: 'aspect-[4/5]' },
    { src: '/assets/img/projects/p2.jpg', speed: 0.25, aspect: 'aspect-[3/4]' },
    { src: '/assets/img/projects/project3.PNG', speed: 0.15, aspect: 'aspect-square' },
    { src: '/assets/img/projects/araf4.PNG', speed: 0.3, aspect: 'aspect-[4/3]' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.parallax-item');
      
      items.forEach((item) => {
        const speed = parseFloat(item.dataset.speed);
        
        gsap.to(item, {
          y: () => -100 * speed * 3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#0A0A0A] text-white relative dark-section overflow-hidden">
      <div className="container mx-auto px-6 mb-16 lg:mb-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-[0.2em] text-white/90">
          {t('masterpieces-title', 'The Masterpieces')}
        </h2>
      </div>

      <div className="container mx-auto px-6 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-16 lg:gap-32">
            {[images[0], images[2]].map((img, index) => (
              <div 
                key={`col1-${index}`} 
                className="parallax-item group view-project w-full"
                data-speed={img.speed}
              >
                <div className={`overflow-hidden w-full relative ${img.aspect}`}>
                  <img 
                    src={img.src} 
                    alt="Masterpiece"
                    className="w-full h-full object-cover origin-center transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className={`absolute -bottom-8 ${isRTL ? 'start-0 text-start' : 'end-0 text-end'} text-xs font-mono tracking-widest uppercase text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <span>{t('masterpieces-fig', 'Fig.')} 0{index === 0 ? 1 : 3} &mdash; {t('masterpieces-estate', 'Araf Estate')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Staggered down) */}
          <div className="flex flex-col gap-16 lg:gap-32 md:mt-48">
            {[images[1], images[3]].map((img, index) => (
              <div 
                key={`col2-${index}`} 
                className="parallax-item group view-project w-full"
                data-speed={img.speed}
              >
                <div className={`overflow-hidden w-full relative ${img.aspect}`}>
                  <img 
                    src={img.src} 
                    alt="Masterpiece"
                    className="w-full h-full object-cover origin-center transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className={`absolute -bottom-8 ${isRTL ? 'start-0 text-start' : 'end-0 text-end'} text-xs font-mono tracking-widest uppercase text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <span>{t('masterpieces-fig', 'Fig.')} 0{index === 0 ? 2 : 4} &mdash; {t('masterpieces-estate', 'Araf Estate')}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
