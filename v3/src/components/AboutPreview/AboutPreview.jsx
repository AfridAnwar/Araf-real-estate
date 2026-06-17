import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
      
      gsap.from('.about-img', {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-bg-secondary text-text-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px] overflow-hidden about-img">
            <img 
              src="/assets/img/hero/home1-banner-img3.jpg" 
              alt="Araf Architecture" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8 about-reveal">
              <span className="w-12 h-px bg-accent"></span>
              <span className="uppercase tracking-[0.2em] text-sm text-accent font-medium">
                {t('about-label')}
              </span>
            </div>
            
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-display mb-10 leading-[1.1] text-text-primary about-reveal"
              dangerouslySetInnerHTML={{ __html: t('about-heading') }}
            />
            
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-12 max-w-2xl about-reveal">
              {t('about-body')}
            </p>
            
            <div className="about-reveal">
              <Link 
                to="/about" 
                className="inline-block border-b border-text-primary pb-2 uppercase tracking-[0.15em] text-sm font-medium hover:text-accent hover:border-accent transition-colors duration-300"
                dangerouslySetInnerHTML={{ __html: t('about-btn') }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
