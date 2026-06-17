import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Anatomy() {
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.anatomy-border', {
        scaleX: 0,
        transformOrigin: isRTL ? 'right' : 'left',
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
      
      gsap.from('.anatomy-border-v', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      gsap.from('.anatomy-content', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="py-24 bg-white text-text-primary relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 relative">
          <div className="absolute top-0 start-0 w-full h-px bg-black/10 anatomy-border"></div>
          <div className="absolute bottom-0 start-0 w-full h-px bg-black/10 anatomy-border"></div>
          
          <div className="md:col-span-1 p-8 border-s border-e md:border-e-0 border-black/10 anatomy-border-v">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-secondary anatomy-content block">{t('anatomy-index', 'Index 04')}</span>
          </div>
          <div className="md:col-span-3 p-8 md:border-s border-e border-black/10 anatomy-border-v">
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest anatomy-content">{t('anatomy-title', 'The Anatomy of Luxury')}</h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 relative mt-[-1px]">
          <div className="absolute bottom-0 start-0 w-full h-px bg-black/10 anatomy-border"></div>
          
          <div className="md:col-span-2 p-8 lg:p-16 border-s border-e border-black/10 anatomy-border-v flex flex-col justify-between min-h-[40vh]">
            <h3 className="text-2xl font-display uppercase tracking-widest mb-8 anatomy-content">{t('anatomy-material-title', 'Material Integrity')}</h3>
            <p className="text-sm font-body text-text-secondary leading-relaxed max-w-sm anatomy-content">
              {t('anatomy-material-desc', 'Every development is predicated on uncompromising material selection. From locally sourced Riyadh stone to imported Italian statuario, our supply chain ensures that surface aesthetics perfectly match structural longevity.')}
            </p>
          </div>
          
          <div className="md:col-span-1 p-8 lg:p-16 border-e border-black/10 anatomy-border-v flex flex-col justify-between min-h-[40vh]">
            <h3 className="text-2xl font-display uppercase tracking-widest mb-8 anatomy-content">{t('anatomy-spatial-title', 'Spatial Geometry')}</h3>
            <p className="text-sm font-body text-text-secondary leading-relaxed anatomy-content">
              {t('anatomy-spatial-desc', 'Volume is the ultimate luxury. Our layouts are engineered to maximize natural light refraction, ensuring every square meter serves a psychological and functional purpose.')}
            </p>
          </div>

          <div className="md:col-span-1 border-e border-black/10 anatomy-border-v relative overflow-hidden group min-h-[40vh]">
            <img 
              src="/assets/img/hero/home1-banner-img2.jpg" 
              alt="Material Detail"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
