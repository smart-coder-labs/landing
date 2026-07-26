import { Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-primary">
          <div className="footer-brand">
            <div className="brand"><span className="brand-mark" aria-hidden="true"><Network size={17} /></span>SmartCoderLabs</div>
            <p>{t.footer.built}</p>
          </div>
          <nav className="footer-navigation" aria-label={t.nav.footer}>
            <p className="footer-label">{t.footer.navigation}</p>
            <div className="footer-nav"><Link to="/#about">{t.nav.about}</Link><Link to="/#services">{t.nav.services}</Link><Link to="/#blog">{t.nav.insights}</Link><Link to="/#contact">{t.nav.contact}</Link></div>
          </nav>
        </div>
        <div className="footer-meta">
          <span>© {year} SmartCoderLabs</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
