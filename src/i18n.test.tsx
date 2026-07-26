import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { LanguageProvider, ThemeProvider, useLanguage, useTheme } from './i18n';

function ProviderControls() {
  const { locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return <>
    <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>Locale: {locale}</button>
    <button onClick={toggleTheme}>Theme: {theme}</button>
  </>;
}

describe('i18n providers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = '';
    document.documentElement.lang = 'en';
  });

  it('mounts and updates when storage access is denied', async () => {
    const securityError = () => {
      throw new DOMException('Storage access is denied', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(securityError);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(securityError);
    const user = userEvent.setup();

    render(<ThemeProvider><LanguageProvider><ProviderControls /></LanguageProvider></ThemeProvider>);

    expect(screen.getByRole('button', { name: 'Locale: en' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Theme: dark' })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dataset.theme).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'Locale: en' }));
    await user.click(screen.getByRole('button', { name: 'Theme: dark' }));

    expect(screen.getByRole('button', { name: 'Locale: es' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Theme: light' })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('restores saved preferences and persists subsequent changes', async () => {
    window.localStorage.setItem('smartcoder-locale', 'es');
    window.localStorage.setItem('smartcoder-theme', 'light');
    const user = userEvent.setup();

    render(<ThemeProvider><LanguageProvider><ProviderControls /></LanguageProvider></ThemeProvider>);

    expect(screen.getByRole('button', { name: 'Locale: es' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Theme: light' })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
    expect(document.documentElement.dataset.theme).toBe('light');

    await user.click(screen.getByRole('button', { name: 'Locale: es' }));
    await user.click(screen.getByRole('button', { name: 'Theme: light' }));

    expect(window.localStorage.getItem('smartcoder-locale')).toBe('en');
    expect(window.localStorage.getItem('smartcoder-theme')).toBe('dark');
  });
});
