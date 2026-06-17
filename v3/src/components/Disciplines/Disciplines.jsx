import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Disciplines() {
  const sectionRef = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [activeDiscipline, setActiveDiscipline] = useState(0);

  const disciplines = [
    {
      titleEn: 'Residential Development',
      titleAr: 'التطوير السكني',
      descEn: 'Engineering ultra-luxury private residences that redefine modern living.',
      descAr: 'هندسة مساكن خاصة فائقة الفخامة تعيد تعريف الحياة العصرية.',
      img: '/assets/img/hero/home1-banner-img3.jpg'
    },
    {
      titleEn: 'Commercial Architecture',
      titleAr: 'العمارة التجارية',
      descEn: 'Creating iconic corporate headquarters and premium retail spaces.',
      descAr: 'إنشاء مقرات رئيسية للشركات ومساحات تجزئة فاخرة.',
      img: '/assets/img/hero/home1-banner-img2.jpg'
    },
    {
      titleEn: 'Master Planning',
      titleAr: 'التخطيط الرئيسي',
      descEn: 'Developing sustainable, multi-use communities for the future of Saudi Arabia.',
      descAr: 'تطوير مجتمعات مستدامة متعددة الاستخدامات لمستقبل المملكة.',
      img: '/assets/img/projects/p1.jpg'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.disc-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      });
      
      gsap.from('.disc-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.disc-list',
          start: 'top 80%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 flex items-center overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Images */}
      {disciplines.map((disc, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeDiscipline === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={disc.img} alt={disc.titleEn} className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-bg-primary/90 backdrop-blur-[2px]"></div>
        </div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 disc-header">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent block mb-4">
            {isRTL ? 'الخبرات' : 'Expertise'}
          </span>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-widest text-text-primary">
            {isRTL ? 'تخصصاتنا' : 'The Disciplines'}
          </h2>
        </div>

        <div className="w-full border-t border-black/10 disc-list">
          {disciplines.map((disc, idx) => (
            <div 
              key={idx}
              className="disc-item border-b border-black/10 py-8 md:py-12 group cursor-pointer"
              onMouseEnter={() => setActiveDiscipline(idx)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h3 className={`text-3xl md:text-5xl font-display uppercase tracking-wider transition-colors duration-500 ${activeDiscipline === idx ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary/70'}`}>
                  <span className="text-sm font-mono tracking-widest me-6 opacity-50">0{idx + 1}</span>
                  {isRTL ? disc.titleAr : disc.titleEn}
                </h3>
                <div 
                  className={`mt-4 md:mt-0 w-full md:w-1/3 overflow-hidden transition-all duration-500 ease-[0.76,0,0.24,1] ${activeDiscipline === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-40 md:opacity-0 md:group-hover:opacity-100'}`}
                >
                  <p className="text-sm font-body text-text-secondary leading-relaxed">
                    {isRTL ? disc.descAr : disc.descEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
