import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const pillars = [
    {
      number: '01',
      titleEn: 'Visionary Design',
      titleAr: 'تصميم رؤيوي',
      descEn: 'Pushing the boundaries of architectural aesthetics to create landmarks that define skylines.',
      descAr: 'دفع حدود الجماليات المعمارية لإنشاء معالم تحدد أفق المدن.'
    },
    {
      number: '02',
      titleEn: 'Sustainable Futures',
      titleAr: 'مستقبل مستدام',
      descEn: 'Integrating cutting-edge green technologies to ensure our developments stand the test of time.',
      descAr: 'دمج التقنيات الخضراء المتطورة لضمان صمود مشاريعنا أمام اختبار الزمن.'
    },
    {
      number: '03',
      titleEn: 'Uncompromising Luxury',
      titleAr: 'رفاهية لا تضاهى',
      descEn: 'Curating bespoke living experiences with the finest materials and meticulous attention to detail.',
      descAr: 'تصميم تجارب معيشية مخصصة بأجود المواد والاهتمام الدقيق بالتفاصيل.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-title', {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      gsap.from('.phil-pillar', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });

      gsap.from('.phil-line', {
        scaleX: 0,
        transformOrigin: isRTL ? 'right' : 'left',
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] py-24 lg:py-32 overflow-hidden relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Title Area */}
        <div className="mb-20 lg:mb-32">
          <span className="text-xs font-mono tracking-widest uppercase text-text-secondary block mb-6 phil-title">
            {isRTL ? 'فلسفتنا' : 'Our Philosophy'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display text-text-primary tracking-wide leading-tight phil-title max-w-5xl">
            {isRTL 
              ? 'مبادئنا الأساسية التي توجه كل تفصيل.' 
              : 'The core principles that guide every detail.'}
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="phil-pillar flex flex-col">
              <div className="w-full h-px bg-black/10 mb-8 phil-line"></div>
              <span className="text-accent font-mono text-sm mb-4 block">
                {pillar.number}
              </span>
              <h3 className="text-2xl lg:text-3xl font-display text-text-primary mb-4">
                {isRTL ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-text-secondary leading-relaxed font-body">
                {isRTL ? pillar.descAr : pillar.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
