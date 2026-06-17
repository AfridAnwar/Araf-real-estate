import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Journal() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const articles = [
    {
      date: 'OCT 2026',
      titleEn: 'Araf wins "Best Luxury Developer" at Riyadh Real Estate Summit',
      titleAr: 'أراف تفوز بجائزة "أفضل مطور فاخر" في قمة الرياض العقارية',
      img: '/assets/img/projects/p1.jpg'
    },
    {
      date: 'SEP 2026',
      titleEn: 'The Future of Sustainable Urban Planning in KSA',
      titleAr: 'مستقبل التخطيط الحضري المستدام في المملكة',
      img: '/assets/img/projects/p2.jpg'
    },
    {
      date: 'AUG 2026',
      titleEn: 'Announcing our newest master-planned community',
      titleAr: 'الإعلان عن أحدث مجتمع مخطط لدينا',
      img: '/assets/img/projects/project3.PNG'
    },
    {
      date: 'JUL 2026',
      titleEn: 'Architectural integrity: Our material selection process',
      titleAr: 'النزاهة المعمارية: عملية اختيار المواد لدينا',
      img: '/assets/img/hero/home1-banner-img3.jpg'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      
      const totalWidth = container.scrollWidth - document.documentElement.clientWidth;

      gsap.to(container, {
        x: isRTL ? totalWidth : -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + container.scrollWidth,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] h-screen pt-[100px] lg:pt-[120px] pb-8 flex flex-col justify-center overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="px-6 lg:px-12 mb-6 lg:mb-8">
        <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-text-primary">
          {isRTL ? 'المجلة' : 'The Journal'}
        </h2>
      </div>

      <div className="relative">
        <div ref={scrollContainerRef} className="flex gap-8 lg:gap-12 px-6 lg:px-12 w-max">
          {articles.map((article, index) => (
            <div key={index} className="journal-card w-[320px] md:w-[400px] xl:w-[500px] shrink-0 group cursor-pointer view-project">
              <div className="overflow-hidden aspect-[4/3] relative bg-black">
                <img 
                  src={article.img} 
                  alt="Article" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-[0.76,0,0.24,1] group-hover:scale-110 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-500"></div>
                
                {/* Text Content */}
                <div className="absolute bottom-0 inset-x-0 w-full p-6 md:p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]">
                  <span className="text-xs font-mono tracking-widest uppercase text-white/70 block mb-3 transition-colors duration-300 group-hover:text-accent">
                    {article.date}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide text-white leading-tight">
                    {isRTL ? article.titleAr : article.titleEn}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
