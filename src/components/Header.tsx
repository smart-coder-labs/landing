import { useState } from 'react';
import { Menu, Moon, Network, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, useTheme } from '../i18n';

function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={closeMenu} aria-label={t.nav.home}>
          <span className="brand-mark" aria-hidden="true"><Network size={17} /></span>
          SmartCoderLabs
        </Link>
        <nav className="desktop-nav" aria-label={t.nav.primary}>
          {([['about', '/#about'], ['services', '/#services'], ['insights', '/#blog'], ['contact', '/#contact']] as const).map(([key, to]) => <Link key={to} to={to}>{t.nav[key]}</Link>)}
        </nav>
        <div className="language-switcher" aria-label={t.language}><button type="button" className={locale === 'en' ? 'is-active' : ''} onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>EN</button><span aria-hidden="true">/</span><button type="button" className={locale === 'es' ? 'is-active' : ''} onClick={() => setLocale('es')} aria-pressed={locale === 'es'}>ES</button></div>
        <button className="theme-button" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.lightTheme : t.darkTheme} aria-pressed={theme === 'light'}>{theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}</button>
        <button className="menu-button" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={isMenuOpen ? t.nav.close : t.nav.open}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label={t.nav.mobile}>
        <div className="container">
          {([['about', '/#about'], ['services', '/#services'], ['insights', '/#blog'], ['contact', '/#contact']] as const).map(([key, to]) => <Link key={to} to={to} onClick={closeMenu}>{t.nav[key]}</Link>)}
        </div>
      </nav>
    </header>
  );
}

export default Header;
