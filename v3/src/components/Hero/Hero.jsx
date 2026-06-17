import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: '/assets/img/hero/home1-banner-img1.jpg' },
    { image: '/assets/img/hero/home1-banner-img2.jpg' },
    { image: '/assets/img/hero/home1-banner-img3.jpg' }
  ];

  useEffect(() => {
    // Initial reveal animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-headline-word', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      });
      
      gsap.from('.hero-action', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
      });
    }, heroRef);

    // Auto slideshow
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-[#1A1A1A]">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Subtle dark gradient overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 z-10" />
          <img 
            src={slide.image} 
            alt="Araf Development" 
            className={`w-full h-full object-cover origin-center transition-transform duration-[10000ms] ease-out ${index === currentSlide ? 'scale-105' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* Foreground Content */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center">
        <div ref={textRef} className="max-w-5xl mt-20">
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-display text-white leading-[1.05] tracking-tight uppercase">
            {/* We manually split the tagline to animate it elegantly */}
            <div className="overflow-hidden pb-4">
              <span className="hero-headline-word inline-block mr-4">Where</span>
              <span className="hero-headline-word inline-block mr-4">vision</span>
              <span className="hero-headline-word inline-block text-white/80 italic">meets</span>
            </div>
            <div className="overflow-hidden pb-4">
              <span className="hero-headline-word inline-block">structure.</span>
            </div>
          </h1>
          
          <div className="flex flex-wrap gap-6 mt-16 hero-action">
            <Link to="/meeting" className="px-10 py-5 bg-white text-bg-primary font-display uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-colors duration-300">
              {t('hero-btn-1')}
            </Link>
            <Link to="/projects" className="px-10 py-5 border border-white/30 text-white font-display uppercase tracking-widest text-sm hover:border-white hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
              {t('hero-btn-2')}
            </Link>
          </div>
        </div>
      </div>

      {/* Premium Slide Indicators */}
      <div className="absolute bottom-12 left-6 right-6 z-30 container mx-auto flex items-end justify-between hero-action">
        <div className="flex gap-4">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group py-4 flex flex-col gap-2"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className={`text-xs font-display tracking-widest uppercase transition-colors duration-300 ${index === currentSlide ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                0{index + 1}
              </span>
              <span className={`h-px transition-all duration-500 ${index === currentSlide ? 'w-16 bg-white' : 'w-8 bg-white/30 group-hover:bg-white/50'}`} />
            </button>
          ))}
        </div>
        
        <div className="flex flex-col items-end gap-6 text-white pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 rotate-90 origin-right translate-x-2 translate-y-[-20px]">{t('hero-discover')}</span>
            <div className="w-px h-24 bg-white/20 relative overflow-hidden">
              <div className="w-full h-full bg-white animate-scroll-down"></div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-down {
          animation: scroll-down 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
      `}} />
    </section>
  );
}
