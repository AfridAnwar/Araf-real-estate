import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandFilm() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the video
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Text reveal
      gsap.from('.film-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={videoRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
          <video 
            src="/v3/assets/video/araf-journey.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-black/40 to-black/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8 film-reveal justify-center">
            <span className="w-8 h-px bg-accent"></span>
            <span className="uppercase tracking-[0.2em] text-sm text-accent font-medium">
              {t('film-label', 'The Journey')}
            </span>
            <span className="w-8 h-px bg-accent"></span>
          </div>
          
          <h2 className="film-reveal text-4xl md:text-5xl lg:text-6xl font-display text-white uppercase tracking-widest mb-10 leading-[1.2]">
            {t('film-title', 'Forging A Legacy in Steel and Glass')}
          </h2>
          
          <p className="film-reveal text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
            {t('film-desc', 'Araf Real Estate operates at the intersection of architectural brilliance and unwavering execution. We bring visions to life by sculpting the future of Saudi Arabia, blending uncompromising luxury with absolute precision.')}
          </p>
        </div>
      </div>
    </section>
  );
}
