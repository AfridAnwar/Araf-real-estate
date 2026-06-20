import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroEditorial() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline();
      
      tl.from('.hero-word', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });

      // Scroll Animation
      gsap.to(imgRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: false
        }
      });
      
      gsap.to(textRef.current, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'center top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]); // Re-run effect when RTL changes to recalculate layout

  return (
    <section ref={sectionRef} className="min-h-screen w-full relative bg-white overflow-hidden flex flex-col justify-center pt-32 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Left Text Content */}
      <div 
        ref={textRef} 
        className="w-full lg:w-3/5 px-6 lg:px-24 z-10 relative mt-16 md:mt-0"
      >
        <div className="flex items-center justify-between w-full mb-8 overflow-hidden pe-12">
          <span className="hero-word uppercase tracking-[0.3em] text-xs font-bold text-accent">
            {t('about-label', 'Araf Real Estate')}
          </span>
          <span className="hero-word hidden md:inline-block font-mono text-[10px] tracking-widest text-text-secondary uppercase">
            {isRTL ? 'تأسست 2018 — السعودية' : 'EST. 2018 — KSA'}
          </span>
        </div>
        
        <h1 className="text-[3.5rem] md:text-7xl xl:text-[7rem] font-display text-text-primary leading-[1] tracking-tighter uppercase relative mb-12">
          <div className="overflow-hidden pb-2">
            <span className="hero-word inline-block me-4 xl:me-6" dangerouslySetInnerHTML={{ __html: t('hero-tagline', 'Where vision meets <i>structure</i>') }}></span>
          </div>
          <span className={`hero-word absolute top-1/2 ${isRTL ? '-right-8 translate-x-full' : '-left-8 -translate-x-full'} -rotate-90 text-[10px] font-mono tracking-[0.4em] text-text-secondary hidden 2xl:block`}>
            LAT. 26.3927° N // LON. 50.1971° E
          </span>
        </h1>
        
        <div className="overflow-hidden max-w-md">
          <p className="hero-word text-text-secondary text-lg leading-relaxed">
            {t('about-body')}
          </p>
        </div>
      </div>

      {/* Right Image Content */}
      <div 
        ref={imgRef}
        className={`absolute top-0 ${isRTL ? 'left-0 origin-left' : 'right-0 origin-right'} w-full lg:w-2/5 h-full z-0 opacity-30 lg:opacity-100`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:hidden z-10"></div>
        <div className="absolute inset-0 bg-black/20 z-10 hidden lg:block"></div>
        <img 
          src="/v3/assets/img/projects/p2.jpg" 
          alt="Araf Architecture" 
          className="w-full h-full object-cover"
        />
      </div>
      
    </section>
  );
}
