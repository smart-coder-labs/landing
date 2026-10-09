import { useState } from 'react';
import { Menu, Moon, Network, Sun, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { localeHref, pathWithoutLocale, useLanguage, useTheme } from '../i18n';

const navItems = [['about', '/#about'], ['services', '/#services'], ['insights', '/#blog'], ['contact', '/#contact']] as const;

function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  // The switcher navigates instead of flipping state, so each language has a real
  // URL that can be linked, shared and indexed.
  const otherLocaleHref = localeHref(locale === 'en' ? 'es' : 'en', pathWithoutLocale(pathname));

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to={localeHref(locale)} onClick={closeMenu} aria-label={t.nav.home}>
          <span className="brand-mark" aria-hidden="true"><Network size={17} /></span>
          SmartCoderLabs
        </Link>
        <nav className="desktop-nav" aria-label={t.nav.primary}>
          {navItems.map(([key, to]) => <Link key={to} to={localeHref(locale, to)}>{t.nav[key]}</Link>)}
        </nav>
        <div className="language-switcher" aria-label={t.language}>
          {locale === 'en'
            ? <><span className="is-active" aria-current="true">EN</span><span aria-hidden="true">/</span><Link to={otherLocaleHref} hrefLang="es" onClick={() => setLocale('es')}>ES</Link></>
            : <><Link to={otherLocaleHref} hrefLang="en" onClick={() => setLocale('en')}>EN</Link><span aria-hidden="true">/</span><span className="is-active" aria-current="true">ES</span></>}
        </div>
        <button className="theme-button" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.lightTheme : t.darkTheme} aria-pressed={theme === 'light'}>{theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}</button>
        <button className="menu-button" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={isMenuOpen ? t.nav.close : t.nav.open}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label={t.nav.mobile}>
        <div className="container">
          {navItems.map(([key, to]) => <Link key={to} to={localeHref(locale, to)} onClick={closeMenu}>{t.nav[key]}</Link>)}
        </div>
      </nav>
    </header>
  );
}

export default Header;
