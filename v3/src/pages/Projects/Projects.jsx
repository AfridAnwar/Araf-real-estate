import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const heroBgRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const projects = [
    { id: 'araf-1', title: t('proj-1-title', 'Araf 1'), loc: t('proj-1-loc', 'Dammam'), type: t('project-type-res', 'Residential'), img: '/assets/img/projects/araff1.png' },
    { id: 'araf-2', title: t('proj-2-title', 'Araf 2'), loc: t('proj-2-loc', 'Riyadh'), type: t('project-type-com', 'Commercial'), img: '/assets/img/projects/araf2.png' },
    { id: 'araf-3', title: t('proj-3-title', 'Araf 3'), loc: t('proj-3-loc', 'Jeddah'), type: t('project-type-res', 'Residential'), img: '/assets/img/projects/project3.PNG' },
    { id: 'araf-4', title: t('proj-4-title', 'Araf 4'), loc: t('proj-4-loc', 'Dammam'), type: t('project-type-com', 'Commercial'), img: '/assets/img/projects/araf4.PNG' },
    { id: 'araf-5', title: t('proj-5-title', 'Araf 5'), loc: t('proj-5-loc', 'Al Khobar'), type: t('project-type-mix', 'Mixed-Use'), img: '/assets/img/projects/araf5.png' },
    { id: 'araf-narsis', title: t('proj-6-title', 'Araf Narsis'), loc: t('proj-6-loc', 'Riyadh'), type: t('project-type-res', 'Residential'), img: '/assets/img/projects/araf6.PNG' },
    { id: 'araf-7', title: t('proj-7-title', 'Araf 7'), loc: t('proj-7-loc', 'Jeddah'), type: t('project-type-mix', 'Mixed-Use'), img: '/assets/img/projects/araf7.png' },
    { id: 'araf-8', title: t('proj-8-title', 'Araf 8'), loc: t('proj-8-loc', 'Dammam'), type: t('project-type-res', 'Residential'), img: '/assets/img/projects/araf8.png' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Background Parallax
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-hero',
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

      // Projects Grid Reveal
      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-bg-primary min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="projects-hero relative pt-48 pb-32 lg:pt-64 lg:pb-48 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div ref={heroBgRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
            <img 
              src="/assets/img/inner-pages/gallery_1_1781627210877.png" 
              alt="Projects Portfolio" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90 z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center lg:text-start">
          <span className="text-white/70 font-mono tracking-widest uppercase text-sm block mb-6 hero-reveal">
            {t('projects-banner-subtitle', 'Excellence in Development')}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase tracking-widest hero-reveal">
            {t('projects-banner-title', 'Our Portfolio')}
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 lg:py-40 bg-[#F5F0E8] projects-grid">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {projects.map((project, index) => (
              <Link 
                to={`/projects/${project.id}`} 
                key={index}
                className="project-card group block view-project"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 bg-white">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-accent font-mono tracking-widest uppercase text-xs mb-3">
                    {project.type}
                  </span>
                  <h3 className="text-3xl font-display text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-text-secondary font-body text-sm">
                    {project.loc}
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}
