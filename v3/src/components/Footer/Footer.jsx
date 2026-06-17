import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-bg-primary pt-24 pb-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <img src="/assets/img/logo/logo.png" alt="Araf Logo" className="h-16 object-contain self-start" />
            <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
              {t('footer-tagline')}
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Properties Col */}
          <div>
            <h4 className="font-display text-2xl mb-6 text-text-primary">{t('footer-col-1')}</h4>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li><Link to="/projects/araf-1" className="hover:text-accent transition-colors">{t('proj-1-title')}</Link></li>
              <li><Link to="/projects/araf-2" className="hover:text-accent transition-colors">{t('proj-2-title')}</Link></li>
              <li><Link to="/projects/araf-3" className="hover:text-accent transition-colors">{t('proj-3-title')}</Link></li>
              <li><Link to="/projects/araf-4" className="hover:text-accent transition-colors">{t('proj-4-title')}</Link></li>
              <li><Link to="/projects" className="text-accent hover:text-text-primary transition-colors flex items-center gap-2 mt-2">{t('footer-view-all')}</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="font-display text-2xl mb-6 text-text-primary">{t('footer-col-2')}</h4>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li><Link to="/about" className="hover:text-accent transition-colors">{t('nav-about')}</Link></li>
              <li><Link to="/project-status" className="hover:text-accent transition-colors">{t('nav-status')}</Link></li>
              <li><a href="/assets/أراف نارسس (1).pdf" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">{t('journey-btn')}</a></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">{t('nav-contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-display text-2xl mb-6 text-text-primary">{t('footer-col-3')}</h4>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li>
                <a href="tel:+966533101111" className="font-display text-xl text-text-primary hover:text-accent transition-colors tracking-wide">
                  +966 53 310 1111
                </a>
              </li>
              <li>
                <a href="mailto:info@araf.sa" className="hover:text-accent transition-colors">
                  info@araf.sa
                </a>
              </li>
              <li className="mt-4 leading-relaxed">
                {t('footer-address')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary/60">
          <p dangerouslySetInnerHTML={{ __html: t('footer-copyright') }}></p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-text-primary transition-colors">{t('footer-privacy')}</Link>
            <Link to="/terms" className="hover:text-text-primary transition-colors">{t('footer-terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
