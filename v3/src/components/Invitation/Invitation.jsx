import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Invitation() {
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.invitation-element', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-[70vh] bg-bg-primary flex flex-col justify-between pt-32 pb-12 relative z-10 border-t border-black/5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center">
        <span className="invitation-element text-xs font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
          {t('invitation-subtitle', 'Your Legacy Awaits')}
        </span>
        <h2 className="invitation-element text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-widest text-text-primary mb-16 leading-tight">
          {t('invitation-title', 'Begin your journey with Araf.')}
        </h2>
        
        <div className="invitation-element">
          <Link 
            to="/meeting" 
            className="group magnetic-btn relative inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border border-black/10 hover:border-accent transition-colors duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full ease-[0.76,0,0.24,1]"></div>
            <span className="relative z-10 text-xs font-display uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">
              {t('invitation-btn', 'Book a Meeting')}
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 flex justify-between items-end text-xs font-mono text-text-secondary uppercase tracking-[0.2em] invitation-element">
        <div>
          &copy; {new Date().getFullYear()} {t('masterpieces-estate')}
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-text-primary transition-colors">Twitter</a>
        </div>
      </div>
    </section>
  );
}
