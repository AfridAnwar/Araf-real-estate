import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { slug } = useParams();
  const containerRef = useRef(null);
  const heroBgRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const projectsData = {
    'araf-1': {
      titleKey: 'proj-1-title', titleDefault: 'Araf 1',
      descKey: 'proj-1-desc', descDefault: 'Redefining luxury living in Dammam with breathtaking architecture and premium amenities.',
      locKey: 'proj-1-loc', locDefault: 'Dammam, Saudi Arabia',
      typeKey: 'project-type-res', typeDefault: 'Residential',
      statusKey: 'status-completed', statusDefault: 'Completed',
      year: '2023',
      heroImg: '/v3/assets/img/projects/p1.jpg',
      gallery: ['/v3/assets/img/inner-pages/gallery_1_1781627210877.png', '/v3/assets/img/inner-pages/gallery_2_1781627224554.png', '/v3/assets/img/inner-pages/gallery_3_1781627238999.png', '/v3/assets/img/projects/p1.jpg']
    },
    'araf-2': {
      titleKey: 'proj-2-title', titleDefault: 'Araf 2',
      descKey: 'proj-1-desc', descDefault: 'Premium commercial development in the heart of Riyadh.',
      locKey: 'proj-2-loc', locDefault: 'Riyadh, Saudi Arabia',
      typeKey: 'project-type-com', typeDefault: 'Commercial',
      statusKey: 'status-completed', statusDefault: 'Completed',
      year: '2024',
      heroImg: '/v3/assets/img/projects/p2.jpg',
      gallery: ['/v3/assets/img/projects/araf2.png', '/v3/assets/img/projects/p2.jpg']
    },
    'araf-3': {
      titleKey: 'proj-3-title', titleDefault: 'Araf 3',
      descKey: 'proj-1-desc', descDefault: 'Exclusive residential community offering unmatched tranquility.',
      locKey: 'proj-3-loc', locDefault: 'Jeddah, Saudi Arabia',
      typeKey: 'project-type-res', typeDefault: 'Residential',
      statusKey: 'tab-construction', statusDefault: 'Under Construction',
      year: '2025',
      heroImg: '/v3/assets/img/projects/project3.PNG',
      gallery: ['/v3/assets/img/projects/project3.PNG']
    },
    'araf-4': {
      titleKey: 'proj-4-title', titleDefault: 'Araf 4',
      descKey: 'proj-1-desc', descDefault: 'Next-generation commercial workspaces for modern enterprises.',
      locKey: 'proj-4-loc', locDefault: 'Dammam, Saudi Arabia',
      typeKey: 'project-type-com', typeDefault: 'Commercial',
      statusKey: 'tab-construction', statusDefault: 'Under Construction',
      year: '2026',
      heroImg: '/v3/assets/img/projects/araf4.PNG',
      gallery: ['/v3/assets/img/projects/araf4.PNG']
    },
    'araf-5': {
      titleKey: 'proj-5-title', titleDefault: 'Araf 5',
      descKey: 'proj-1-desc', descDefault: 'A vibrant mixed-use development combining retail and living.',
      locKey: 'proj-5-loc', locDefault: 'Al Khobar, Saudi Arabia',
      typeKey: 'project-type-mix', typeDefault: 'Mixed-Use',
      statusKey: 'tab-construction', statusDefault: 'Under Construction',
      year: '2026',
      heroImg: '/v3/assets/img/projects/araf5.png',
      gallery: ['/v3/assets/img/projects/araf5.png']
    },
    'araf-narsis': {
      titleKey: 'proj-6-title', titleDefault: 'Araf Narsis',
      descKey: 'proj-1-desc', descDefault: 'An iconic residential tower setting a new skyline standard.',
      locKey: 'proj-6-loc', locDefault: 'Riyadh, Saudi Arabia',
      typeKey: 'project-type-res', typeDefault: 'Residential',
      statusKey: 'tab-available', statusDefault: 'Available',
      year: '2025',
      heroImg: '/v3/assets/img/projects/araf6.PNG',
      gallery: ['/v3/assets/img/projects/araf6.PNG']
    },
    'araf-7': {
      titleKey: 'proj-7-title', titleDefault: 'Araf 7',
      descKey: 'proj-1-desc', descDefault: 'A waterfront mixed-use marvel.',
      locKey: 'proj-7-loc', locDefault: 'Jeddah, Saudi Arabia',
      typeKey: 'project-type-mix', typeDefault: 'Mixed-Use',
      statusKey: 'tab-construction', statusDefault: 'Under Construction',
      year: '2027',
      heroImg: '/v3/assets/img/projects/araf7.png',
      gallery: ['/v3/assets/img/projects/araf7.png']
    },
    'araf-8': {
      titleKey: 'proj-8-title', titleDefault: 'Araf 8',
      descKey: 'proj-1-desc', descDefault: 'Modern suburban residential living.',
      locKey: 'proj-8-loc', locDefault: 'Dammam, Saudi Arabia',
      typeKey: 'project-type-res', typeDefault: 'Residential',
      statusKey: 'tab-construction', statusDefault: 'Under Construction',
      year: '2027',
      heroImg: '/v3/assets/img/projects/araf8.png',
      gallery: ['/v3/assets/img/projects/araf8.png']
    }
  };

  const project = projectsData[slug];

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.detail-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.fact-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.facts-strip',
          start: 'top 85%',
        }
      });

      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((sec) => {
        gsap.from(sec.querySelectorAll('.sec-reveal'), {
          y: 40,
          opacity: 0,
          duration: 1.2,
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
  }, [project, slug]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div ref={containerRef} className="bg-bg-primary" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="detail-hero relative h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div ref={heroBgRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
            <img 
              src={project.heroImg} 
              alt={t(project.titleKey, project.titleDefault)} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <span className="text-white/70 font-mono tracking-widest uppercase text-sm block mb-4 hero-reveal">
            {t(project.typeKey, project.typeDefault)}
          </span>
          <h1 className="text-6xl md:text-8xl font-display text-white uppercase tracking-widest mb-6 hero-reveal">
            {t(project.titleKey, project.titleDefault)}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-light leading-relaxed hero-reveal">
            {t(project.descKey, project.descDefault)}
          </p>
        </div>
      </section>

      {/* Facts Strip */}
      <div className="facts-strip bg-[#F5F0E8] py-16 border-b border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="fact-item flex flex-col">
              <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('fact-location', 'Location')}</span>
              <span className="text-lg font-medium text-text-primary">{t(project.locKey, project.locDefault)}</span>
            </div>
            <div className="fact-item flex flex-col">
              <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('fact-status', 'Status')}</span>
              <span className="text-lg font-medium text-text-primary">{t(project.statusKey, project.statusDefault)}</span>
            </div>
            <div className="fact-item flex flex-col">
              <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('fact-type', 'Property Type')}</span>
              <span className="text-lg font-medium text-text-primary">{t(project.typeKey, project.typeDefault)}</span>
            </div>
            <div className="fact-item flex flex-col">
              <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">{t('fact-year', 'Year')}</span>
              <span className="text-lg font-medium text-text-primary">{project.year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <section className="py-24 lg:py-40 reveal-section">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-widest mb-10 text-text-primary sec-reveal">
                {t('project-overview-title', 'The Overview')}
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed mb-8 sec-reveal">
                {t('proj-detail-text-1', `${t(project.titleKey, project.titleDefault)} is a landmark development designed for those who appreciate the finer things in life. Situated in a prime location, this project seamlessly blends modern architectural aesthetics with functional spaces.`)}
              </p>
              <p className="text-xl text-text-secondary leading-relaxed sec-reveal">
                {t('proj-detail-text-2', 'Every detail has been meticulously crafted to provide an unparalleled standard. From the grand entrance to the state-of-the-art facilities, it stands as a testament to our commitment to quality and innovation.')}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-text-primary text-white p-10 lg:p-12 text-center sec-reveal relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100 z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-display uppercase tracking-widest mb-6">{t('brochure-title', 'Project Brochure')}</h3>
                  <p className="text-white/70 mb-8 font-light">
                    {t('brochure-desc', 'Download the complete presentation to explore floor plans and specifications.')}
                  </p>
                  <a 
                    href="/v3/assets/أراف نارسس (1).pdf" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block border border-white text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-text-primary transition-colors duration-300 w-full"
                  >
                    {t('brochure-btn', 'Download PDF')}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="pb-24 lg:pb-40 reveal-section">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-display uppercase tracking-widest mb-12 text-text-primary sec-reveal">
            {t('gallery-title', 'Gallery')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((img, idx) => (
              <div 
                key={idx} 
                className={`overflow-hidden sec-reveal ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''} aspect-[4/3] lg:aspect-auto`}
              >
                <img 
                  src={img} 
                  alt={`${t(project.titleKey, project.titleDefault)} Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
