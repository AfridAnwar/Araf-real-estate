import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const isRTL = i18n.language === 'ar';
  const isHome = location.pathname === '/' || location.pathname === '/v3' || location.pathname === '/v3/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const headerClasses = scrolled 
    ? 'bg-bg-primary/95 backdrop-blur-md py-4 shadow-sm text-text-primary border-black/5' 
    : isHome 
      ? 'bg-transparent py-6 text-white border-transparent mix-blend-difference'
      : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 text-white border-white/10';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${headerClasses}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="relative z-50">
            <img 
              src="/v3/assets/img/logo/logo.png" 
              alt="Araf Logo" 
              className={`transition-all duration-300 w-auto object-contain ${scrolled ? 'h-20' : 'h-28'} ${isRTL ? 'ml-8' : 'mr-8'} ${!scrolled ? (isHome ? 'invert' : 'invert brightness-0 filter drop-shadow-lg') : ''}`} 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className={`font-display text-[17px] tracking-widest uppercase transition-colors hover:opacity-60`}>
              {t('nav-home')}
            </Link>
            <Link to="/projects" className={`font-display text-[17px] tracking-widest uppercase transition-colors hover:opacity-60`}>
              {t('nav-projects')}
            </Link>
            <Link to="/about" className={`font-display text-[17px] tracking-widest uppercase transition-colors hover:opacity-60`}>
              {t('nav-about')}
            </Link>
            <Link to="/project-status" className={`font-display text-[17px] tracking-widest uppercase transition-colors hover:opacity-60`}>
              {t('nav-status')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-3 text-[13px] font-medium tracking-widest uppercase">
              <button 
                onClick={() => toggleLanguage('en')}
                className={`transition-opacity ${i18n.language === 'en' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}
              >
                EN
              </button>
              <span className="opacity-30">|</span>
              <button 
                onClick={() => toggleLanguage('ar')}
                className={`transition-opacity font-arabic text-[15px] ${i18n.language === 'ar' ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}
              >
                عربي
              </button>
            </div>
            
            <Link 
              to="/meeting" 
              className={`px-7 py-3 border transition-colors uppercase text-[13px] tracking-[0.2em] ${
                scrolled 
                  ? 'border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary' 
                  : 'border-current hover:bg-white hover:text-black'
              }`}
            >
              {t('nav-meeting')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-6 relative z-50">
            <button onClick={toggleMobileMenu} className="hover:opacity-60 transition-opacity">
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-bg-primary z-40 transition-transform duration-500 ease-[0.76,0,0.24,1] flex flex-col justify-center px-8 ${
          mobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
        }`}
      >
        <nav className="flex flex-col gap-8 text-4xl md:text-6xl font-display uppercase text-text-primary tracking-tight">
          <Link to="/" className="hover:text-accent transition-colors w-fit">
            {t('nav-home')}
          </Link>
          <Link to="/projects" className="hover:text-accent transition-colors w-fit">
            {t('nav-projects')}
          </Link>
          <Link to="/about" className="hover:text-accent transition-colors w-fit">
            {t('nav-about')}
          </Link>
          <Link to="/project-status" className="hover:text-accent transition-colors w-fit">
            {t('nav-status')}
          </Link>
          <Link to="/contact" className="hover:text-accent transition-colors mt-8 w-fit">
            {t('nav-contact')}
          </Link>
        </nav>
      </div>
    </>
  );
}
