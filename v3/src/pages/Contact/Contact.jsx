import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const heroBgRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.contact-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Hero Reveal
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Form & Info Reveal
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((sec) => {
        gsap.from(sec.querySelectorAll('.sec-reveal'), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-bg-primary min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="contact-hero relative pt-48 pb-32 lg:pt-64 lg:pb-48 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div ref={heroBgRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
            <img 
              src="/v3/assets/img/inner-pages/contact-hero.jpg" 
              alt="Contact Araf" 
              className="w-full h-full object-cover grayscale-[30%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90 z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <span className="text-white/70 font-mono tracking-widest uppercase text-sm block mb-6 hero-reveal">
            {t('contact-banner-subtitle', 'Any Question With Us')}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase tracking-widest hero-reveal">
            {t('contact-banner-title', 'Get in touch.')}
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-40 bg-[#F5F0E8] reveal-section">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Info Block */}
            <div className="lg:col-span-5 flex flex-col gap-12">
              <h3 className="text-3xl lg:text-4xl font-display text-text-primary sec-reveal">
                {t('contact-section-title', 'Connect with our team.')}
              </h3>
              
              <div className="flex flex-col gap-8">
                <div className="sec-reveal">
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('contact-list-inquiry', 'To More Inquiry')}</h4>
                  <a href="tel:+966533101111" dir="ltr" className="text-2xl font-display text-text-primary hover:text-accent transition-colors">
                    +966 53 310 1111
                  </a>
                </div>
                
                <div className="sec-reveal">
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('contact-list-mail', 'To Send Mail')}</h4>
                  <a href="mailto:info@araf.sa" className="text-2xl font-body text-text-primary hover:text-accent transition-colors">
                    info@araf.sa
                  </a>
                </div>
                
                <div className="sec-reveal">
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('sidebar-address-label', 'ADDRESS')}</h4>
                  <p className="text-xl text-text-primary">
                    {t('footer-address', 'Dammam, Saudi Arabia')}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Block */}
            <div className="lg:col-span-7 sec-reveal">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
                
                <div className="relative group">
                  <input type="text" id="fullName" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-lg text-text-primary focus:border-text-primary outline-none transition-colors peer" placeholder=" " />
                  <label htmlFor="fullName" className="absolute left-0 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-text-primary peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-text-secondary peer-placeholder-shown:lowercase peer-placeholder-shown:tracking-normal peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text pointer-events-none">
                    {t('contact-form-name', 'Full Name *')}
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="email" id="email" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-lg text-text-primary focus:border-text-primary outline-none transition-colors peer" placeholder=" " />
                    <label htmlFor="email" className="absolute left-0 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-text-primary peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-text-secondary peer-placeholder-shown:lowercase peer-placeholder-shown:tracking-normal peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text pointer-events-none">
                      {t('contact-form-email', 'Email *')}
                    </label>
                  </div>

                  <div className="relative group">
                    <input type="text" id="phone" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-lg text-text-primary focus:border-text-primary outline-none transition-colors peer" placeholder=" " />
                    <label htmlFor="phone" className="absolute left-0 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-text-primary peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-text-secondary peer-placeholder-shown:lowercase peer-placeholder-shown:tracking-normal peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text pointer-events-none">
                      {t('contact-form-phone', 'Phone *')}
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <select className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-lg text-text-primary focus:border-text-primary outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled selected>{t('contact-form-service', 'Select Service Type')}</option>
                    <option value="Conceptual Design">{t('contact-form-option-1', 'Conceptual Design')}</option>
                    <option value="Project Planning">{t('contact-form-option-2', 'Project Planning')}</option>
                    <option value="Site Analysis">{t('contact-form-option-3', 'Site Analysis')}</option>
                  </select>
                </div>

                <div className="relative group">
                  <textarea id="message" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-lg text-text-primary focus:border-text-primary outline-none transition-colors resize-none h-32 peer" placeholder=" "></textarea>
                  <label htmlFor="message" className="absolute left-0 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-text-primary peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-text-secondary peer-placeholder-shown:lowercase peer-placeholder-shown:tracking-normal peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text pointer-events-none">
                    {t('contact-form-message', 'Message *')}
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="terms" className="w-5 h-5 accent-text-primary cursor-pointer" required />
                  <label htmlFor="terms" className="text-sm text-text-secondary cursor-pointer">
                    {t('contact-form-terms', 'I have read & accepted Terms & Conditions.')}
                  </label>
                </div>

                <button type="submit" className="bg-text-primary text-white py-4 px-8 text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-300 w-full md:w-auto self-start mt-4">
                  {t('contact-form-submit', 'Submit Now')}
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Image Section */}
      <section className="py-24 lg:py-40 bg-text-primary text-white reveal-section overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="sec-reveal">
              <div className="aspect-[4/3] w-full overflow-hidden shadow-2xl">
                <img src="/v3/assets/img/inner-pages/office-reception.jpg" alt="Araf HQ" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col justify-center sec-reveal">
              <span className="text-white/60 font-mono tracking-widest uppercase text-sm mb-4">
                {t('office-subtitle', 'Headquarters')}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8">
                {t('office-title', 'Welcome to Araf')}
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-light mb-10">
                {t('office-desc', 'Experience our commitment to excellence firsthand. Our headquarters in Dammam is designed to reflect the quality, innovation, and architectural beauty we bring to every real estate project.')}
              </p>
              <a href="tel:+966533101111" className="inline-block border border-white text-white py-4 px-8 text-sm uppercase tracking-widest hover:bg-white hover:text-text-primary transition-colors duration-300 w-fit">
                {t('office-btn', 'Call for Directions')}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Map Embed */}
      <div className="h-[60vh] w-full filter grayscale contrast-125 sepia-[.2] hover:filter-none transition-all duration-[1s]">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114275.17491807285!2d49.92595852225084!3d26.484750143048384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fd003a48f599%3A0xc96d7abdaa1accfd!2z2KfYsdin2YEg2KfZhNi52YLYp9ix2YrYqSAtIEFSQUY!5e0!3m2!1sen!2ssa!4v1766995874864!5m2!1sen!2ssa"
            className="w-full h-full border-0"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
}
