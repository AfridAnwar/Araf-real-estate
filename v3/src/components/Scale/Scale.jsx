import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scale() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    { value: 15, suffix: '+', labelEn: 'Masterpieces Delivered', labelAr: 'تحفة معمارية منجزة' },
    { value: 2.5, suffix: 'B+', prefix: '$', labelEn: 'Asset Value', labelAr: 'قيمة الأصول' },
    { value: 6, suffix: '+', labelEn: 'Years of Excellence', labelAr: 'سنوات من التميز' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      const numbers = gsap.utils.toArray('.stat-number');
      
      numbers.forEach((num) => {
        const targetValue = parseFloat(num.dataset.val);
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetValue,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          onUpdate: () => {
            // Keep 1 decimal point if the target has it
            num.textContent = targetValue % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val);
          }
        });
      });
      
      // Text and Stats Reveal
      gsap.from('.fade-up', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // Divider Lines Animation
      gsap.from('.stat-divider', {
        scaleX: 0,
        transformOrigin: isRTL ? 'right' : 'left',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-40 bg-black overflow-hidden flex items-center min-h-[80vh]" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Immersive Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div ref={bgRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
          <img 
            src="/v3/assets/img/hero/home1-banner-img2.jpg" 
            alt="Araf Architecture" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale-[30%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90 z-10"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Narrative Column */}
          <div className={`lg:col-span-5 flex flex-col justify-center text-white ${isRTL ? 'lg:pl-16' : 'lg:pr-16'}`}>
            <span className="text-accent font-mono tracking-widest uppercase text-sm mb-6 block fade-up">
              {isRTL ? 'مقياس التميز' : 'The Measure of Excellence'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider leading-tight mb-8 fade-up">
              {isRTL ? 'نبني إرثاً لا يُنسى' : 'Architecting a Lasting Legacy'}
            </h2>
            <p className="text-white/70 text-lg font-body leading-relaxed fade-up">
              {isRTL 
                ? 'نحن لا نبني فقط مساحات؛ بل نصيغ إرثاً معمارياً يجسد الفخامة ويحقق نمواً استثنائياً. محفظتنا هي شهادة على الالتزام بالجودة وتجاوز التوقعات.'
                : 'We don’t just build spaces; we architect legacies. Our portfolio is a testament to uncompromising luxury, delivering visionary projects that define the future of living and yield extraordinary growth.'}
            </p>
          </div>
          
          {/* Statistics Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="w-full h-px bg-white/20 stat-divider mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
              {stats.map((stat, index) => (
                <div key={index} className={`flex flex-col md:px-8 py-6 md:py-0 fade-up ${index === 0 && !isRTL ? 'md:pl-0' : ''} ${index === 0 && isRTL ? 'md:pr-0' : ''} ${index === 2 && !isRTL ? 'md:pr-0' : ''} ${index === 2 && isRTL ? 'md:pl-0' : ''}`}>
                  <div className="text-5xl md:text-6xl lg:text-7xl font-display text-white tracking-tighter mb-4 flex items-start" dir="ltr">
                    {stat.prefix && <span className="text-3xl md:text-4xl mt-2 mr-1 text-accent">{stat.prefix}</span>}
                    <span className="stat-number" data-val={stat.value}>0</span>
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="text-sm font-mono tracking-widest uppercase text-white/60">
                    {isRTL ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full h-px bg-white/20 stat-divider mt-12"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
