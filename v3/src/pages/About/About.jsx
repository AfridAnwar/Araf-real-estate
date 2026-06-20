import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const heroBgRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Background Parallax
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Hero Text Reveal
      gsap.from('.hero-reveal', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
      });

      // Section Reveals
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((sec) => {
        gsap.from(sec.querySelectorAll('.sec-reveal'), {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 75%',
          }
        });
      });

      // Gallery Images Reveal
      gsap.from('.gallery-img', {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top 70%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-bg-primary" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="about-hero relative pt-48 pb-32 lg:pt-64 lg:pb-48 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div ref={heroBgRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
            <img 
              src="/v3/assets/img/inner-pages/about-hero.jpg" 
              alt="About Araf" 
              className="w-full h-full object-cover grayscale-[30%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90 z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <span className="text-white/70 font-mono tracking-widest uppercase text-sm block mb-6 hero-reveal">
            {t('about-subtitle', 'Your Local Real Estate Authority')}
          </span>
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display text-white tracking-wider leading-tight max-w-5xl hero-reveal"
            dangerouslySetInnerHTML={{ __html: t('about-hero-title', 'Building <i>relationships</i>,<br>Building homes.') }}
          ></h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 lg:py-40 reveal-section overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className={`lg:col-span-5 ${isRTL ? 'lg:order-2' : 'lg:order-1'} relative sec-reveal`}>
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img 
                  src="/v3/assets/img/inner-pages/story-side.jpg" 
                  alt="Araf Quality" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className={`lg:col-span-7 ${isRTL ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest mb-10 text-text-primary sec-reveal">
                {t('about-story-label', 'Our Story')}
              </h2>
              <p className="text-2xl text-text-primary leading-relaxed font-light mb-8 sec-reveal">
                {t('about-text-1', 'We are Araf Real Estate Company, a national company specialized in real estate development. We place quality and innovation at the heart of every project we execute.')}
              </p>
              <p className="text-lg text-text-secondary leading-relaxed font-body sec-reveal">
                {t('about-text-2', 'Since our establishment more than 6 years ago, we have charted our path with confidence toward leadership in providing urban solutions that keep pace with the aspirations of individuals and investors, contributing to building modern and sustainable communities.')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="flex flex-col lg:flex-row min-h-[80vh] reveal-section">
        
        {/* Vision Panel */}
        <div className="flex-1 bg-[#F5F0E8] p-12 lg:p-24 flex items-center justify-center relative border-b lg:border-b-0 border-e-0 lg:border-e border-black/10">
          <div className="max-w-xl relative z-10 w-full">
            <span className="text-accent font-mono tracking-widest uppercase text-sm block mb-6 sec-reveal">
              {t('vision-title', 'Our Vision')}
            </span>
            <h3 className="text-3xl md:text-4xl font-display leading-tight text-text-primary sec-reveal">
              {t('vision-text', 'To be among the leading real estate development companies in the Kingdom, relied upon to deliver high-quality projects, smart designs, and an inspiring environment for living, working, and investing.')}
            </h3>
          </div>
        </div>

        {/* Mission Panel */}
        <div className="flex-1 bg-black text-white p-12 lg:p-24 flex items-center justify-center relative overflow-hidden">
          <div className={`absolute -bottom-16 ${isRTL ? '-left-16 scale-x-[-1]' : '-right-16'} h-[120%] opacity-5 pointer-events-none`}>
            <img src="/v3/assets/img/logo/logo.png" alt="Araf Logo" className="h-full object-contain invert" />
          </div>
          <div className="max-w-xl relative z-10 w-full">
            <span className="text-white/50 font-mono tracking-widest uppercase text-sm block mb-6 sec-reveal">
              {t('mission-title', 'Our Mission')}
            </span>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white sec-reveal">
              {t('mission-text', 'To contribute to developing the Kingdom\'s urban landscape through qualitative projects that reflect the spirit of urban development, meet residents\' needs, and achieve long-term economic and social value.')}
            </p>
          </div>
        </div>

      </section>

      {/* Gallery Section */}
      <section className="py-24 lg:py-40 gallery-section reveal-section overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-accent font-mono tracking-widest uppercase text-sm block mb-4 sec-reveal">
              {t('about-gallery-subtitle', 'Aesthetics & Design')}
            </span>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-text-primary sec-reveal">
              {t('about-gallery-title', 'Our Portfolio Highlights')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="gallery-img aspect-[4/5] lg:aspect-auto overflow-hidden">
              <img src="/v3/assets/img/inner-pages/gallery_1_1781627210877.png" alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
            <div className="gallery-img lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img src="/v3/assets/img/inner-pages/gallery_4_1781627261369.png" alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
            <div className="gallery-img aspect-[4/5] lg:aspect-auto overflow-hidden">
              <img src="/v3/assets/img/inner-pages/gallery_3_1781627238999.png" alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
