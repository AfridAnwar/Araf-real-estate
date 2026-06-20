import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectStatus() {
  const containerRef = useRef(null);
  const heroBgRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('construction');

  const tabs = [
    { id: 'construction', label: t('tab-construction', 'Under Construction') },
    { id: 'available', label: t('tab-available', 'Available') },
    { id: 'sold', label: t('tab-sold', 'Sold Out') },
  ];

  const projects = {
    construction: [
      {
        id: 'araf-5', title: t('proj-5-title', 'Araf 5'), loc: t('proj-5-loc', 'Al Khobar'), type: t('project-type-mix', 'Mixed-Use'),
        img: '/v3/assets/img/projects/araf5.png', progress: 75, eta: t('status-eta-1', 'Estimated Completion: Q3 2026')
      },
      {
        id: 'araf-narsis', title: t('proj-6-title', 'Araf Narsis'), loc: t('proj-6-loc', 'Riyadh'), type: t('project-type-res', 'Residential'),
        img: '/v3/assets/img/projects/araf6.PNG', progress: 40, eta: t('status-eta-4', 'Estimated Completion: Q1 2027')
      },
      {
        id: 'araf-7', title: t('proj-7-title', 'Araf 7'), loc: t('proj-7-loc', 'Jeddah'), type: t('project-type-res', 'Residential'),
        img: '/v3/assets/img/projects/araf7.png', progress: 25, eta: 'Estimated Completion: Q4 2027'
      },
      {
        id: 'araf-8', title: t('proj-8-title', 'Araf 8'), loc: t('proj-8-loc', 'Dammam'), type: t('project-type-res', 'Residential'),
        img: '/v3/assets/img/projects/araf8.png', progress: 10, eta: 'Estimated Completion: Q2 2028'
      }
    ],
    available: [
      {
        id: 'araf-4', title: t('proj-4-title', 'Araf 4'), loc: t('proj-4-loc', 'Dammam'), type: t('project-type-com', 'Commercial'),
        img: '/v3/assets/img/projects/araf4.PNG', unitsAvailable: '12 / 50', unitProgress: 24
      }
    ],
    sold: [
      {
        id: 'araf-1', title: t('proj-1-title', 'Araf 1'), loc: t('proj-1-loc', 'Dammam'), type: t('project-type-res', 'Residential'),
        img: '/v3/assets/img/projects/araff1.png', completedDate: t('status-completed-date', 'Completed: 2024')
      },
      {
        id: 'araf-2', title: t('proj-2-title', 'Araf 2'), loc: t('proj-2-loc', 'Riyadh'), type: t('project-type-com', 'Commercial'),
        img: '/v3/assets/img/projects/araf2.png', completedDate: 'Completed: 2023'
      },
      {
        id: 'araf-3', title: t('proj-3-title', 'Araf 3'), loc: t('proj-3-loc', 'Jeddah'), type: t('project-type-res', 'Residential'),
        img: '/v3/assets/img/projects/project3.PNG', completedDate: 'Completed: 2025'
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.status-hero',
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

    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.status-card', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );
      
      gsap.fromTo('.progress-fill',
        { width: 0 },
        { width: (i, target) => target.dataset.width + '%', duration: 1.5, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div ref={containerRef} className="bg-bg-primary min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="status-hero relative pt-48 pb-32 lg:pt-64 lg:pb-48 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div ref={heroBgRef} className="absolute inset-x-0 -top-[20%] h-[140%] w-full">
            <img 
              src="/v3/assets/img/projects/araf4.PNG" 
              alt="Project Status" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90 z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center lg:text-start">
          <span className="text-white/70 font-mono tracking-widest uppercase text-sm block mb-6 hero-reveal">
            {t('status-banner-subtitle', 'Real-Time Tracking')}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase tracking-widest hero-reveal">
            {t('status-banner-title', 'Project Status.')}
          </h1>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-24 bg-[#F5F0E8]">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Tabs */}
          <div className="flex gap-4 mb-16 border-b border-black/10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-8 text-sm uppercase tracking-widest whitespace-nowrap transition-colors duration-300 border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-text-primary text-text-primary font-medium' 
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex flex-col gap-8">
            {projects[activeTab].map((proj, idx) => (
              <div key={idx} className="status-card bg-white p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start border border-black/5 hover:border-accent transition-colors duration-300">
                
                <div className="w-full lg:w-1/3 aspect-[4/3] overflow-hidden">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="w-full lg:w-1/3 flex flex-col justify-center h-full">
                  <span className="inline-block px-4 py-2 bg-[#F5F0E8] text-text-primary text-xs tracking-widest uppercase w-fit mb-4">
                    {proj.type}
                  </span>
                  <h3 className="text-3xl font-display text-text-primary mb-2">{proj.title}</h3>
                  <div className="text-text-secondary font-body">{proj.loc}</div>
                </div>

                <div className="w-full lg:w-1/3 flex flex-col justify-center h-full">
                  
                  {activeTab === 'construction' && (
                    <div className="w-full">
                      <div className="flex justify-between text-sm uppercase tracking-widest text-text-secondary mb-3">
                        <span>{t('status-progress-label', 'Completion Progress')}</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-[#F5F0E8] rounded-full overflow-hidden mb-4">
                        <div className="progress-fill h-full bg-accent" data-width={proj.progress}></div>
                      </div>
                      <p className="text-sm text-text-secondary">{proj.eta}</p>
                    </div>
                  )}

                  {activeTab === 'available' && (
                    <div className="w-full">
                      <div className="flex justify-between text-sm uppercase tracking-widest text-text-secondary mb-3">
                        <span>{t('status-units-label', 'Units Available')}</span>
                        <span>{proj.unitsAvailable}</span>
                      </div>
                      <div className="w-full h-1 bg-[#F5F0E8] rounded-full overflow-hidden mb-6">
                        <div className="progress-fill h-full bg-accent" data-width={proj.unitProgress}></div>
                      </div>
                      <Link to={`/projects/${proj.id}`} className="block w-full text-center border border-text-primary text-text-primary py-3 px-6 text-sm uppercase tracking-widest hover:bg-text-primary hover:text-white transition-colors">
                        {t('btn-view-details', 'View Details')}
                      </Link>
                    </div>
                  )}

                  {activeTab === 'sold' && (
                    <div className="w-full">
                      <div className="flex justify-between text-sm uppercase tracking-widest text-text-secondary mb-3">
                        <span>{t('status-completed-label', 'Status')}</span>
                        <span className="text-text-primary font-medium">{t('status-sold-out', 'Sold Out')}</span>
                      </div>
                      <div className="w-full h-1 bg-[#F5F0E8] rounded-full overflow-hidden mb-4">
                        <div className="progress-fill h-full bg-text-primary" data-width={100}></div>
                      </div>
                      <p className="text-sm text-text-secondary">{proj.completedDate}</p>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
