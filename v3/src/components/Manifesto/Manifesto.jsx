import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const text = t('manifesto-text', 'We do not just build structures. We engineer enduring legacies in the Saudi landscape, blending absolute precision with uncompromising luxury.');
  const words = text.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = gsap.utils.toArray('.manifesto-word');
      
      gsap.fromTo(wordElements, 
        { color: '#EAE3D5' },
        {
          color: '#1A1A1A',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [text]); // Re-run effect when text changes (language switch)

  return (
    <section ref={sectionRef} className="py-40 lg:py-64 bg-white flex items-center justify-center relative z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-display uppercase leading-[1.2] tracking-tight"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {words.map((word, index) => (
            <span key={index} className="manifesto-word inline-block me-3 md:me-6 lg:me-8 mb-4">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
