import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CommunitiesPreview() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  const projects = [
    { title: 'proj-1-title', loc: 'proj-1-loc', img: '/v3/assets/img/projects/project1.jpg', slug: 'araf-1' },
    { title: 'proj-2-title', loc: 'proj-2-loc', img: '/v3/assets/img/projects/project2.jpg', slug: 'araf-2' },
    { title: 'proj-3-title', loc: 'proj-3-loc', img: '/v3/assets/img/projects/project3.jpg', slug: 'araf-3' },
    { title: 'proj-4-title', loc: 'proj-4-loc', img: '/v3/assets/img/projects/project4.jpg', slug: 'araf-4' },
  ];

  useEffect(() => {
    // We only apply horizontal scroll on desktop
    let ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      
      if (isDesktop) {
        const sections = gsap.utils.toArray('.community-card');
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            pin: true,
            scrub: 1,
            end: () => '+=' + scrollWrapperRef.current.offsetWidth,
          }
        });
      }
      
      // Text reveals
      gsap.from('.comm-reveal', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-bg-secondary text-text-primary overflow-hidden">
      <div className="container mx-auto px-6 mb-16 lg:mb-24">
        <div className="flex items-center gap-4 mb-8 comm-reveal">
          <span className="w-12 h-px bg-accent"></span>
          <span className="uppercase tracking-[0.2em] text-sm text-accent font-medium">
            {t('communities-label')}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 
              className="text-5xl md:text-6xl font-display mb-6 leading-[1.1] text-text-primary comm-reveal"
              dangerouslySetInnerHTML={{ __html: t('communities-heading') }}
            />
            <p className="text-lg text-text-secondary comm-reveal">
              {t('communities-body')}
            </p>
          </div>
          <div className="comm-reveal shrink-0">
            <Link 
              to="/projects" 
              className="inline-block border-b border-text-primary pb-2 uppercase tracking-[0.15em] text-sm font-medium hover:text-accent hover:border-accent transition-colors duration-300"
              dangerouslySetInnerHTML={{ __html: t('communities-btn') }}
            />
          </div>
        </div>
      </div>

      <div ref={scrollWrapperRef} className="w-full relative">
        <div className="lg:h-screen lg:flex lg:flex-nowrap container mx-auto px-6 gap-8 lg:gap-12 pb-16 flex-col lg:flex-row">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="community-card lg:w-[45vw] lg:h-[70vh] shrink-0 group relative mb-12 lg:mb-0"
            >
              <Link to={`/projects/${project.slug}`} className="block w-full h-full overflow-hidden relative">
                <img 
                  src={project.img} 
                  alt={t(project.title)} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                  <div>
                    <span className="text-accent text-sm tracking-widest uppercase mb-2 block">{t(project.loc)}</span>
                    <h3 className="text-4xl font-display text-white">{t(project.title)}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white">
                    &rarr;
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
