import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { LanguageProvider, ThemeProvider, type Locale } from '../i18n';

function renderHeader() {
  return render(<ThemeProvider><LanguageProvider><BrowserRouter><Header /></BrowserRouter></LanguageProvider></ThemeProvider>);
}

function renderHeaderAt(path: string, locale: Locale) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <LanguageProvider locale={locale}><Header /></LanguageProvider>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  document.documentElement.lang = 'en';
});

describe('Header', () => {
  it('exposes navigation and toggles the mobile menu accessibly', async () => {
    const user = userEvent.setup();
    renderHeader();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toHaveTextContent('How we work');
    const button = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toHaveTextContent('Contact');
  });

  it('exposes each language as a real URL so both can be linked and indexed', () => {
    renderHeaderAt('/', 'en');

    // English is served unprefixed, so every existing URL keeps working.
    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('href', '/es');
    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('hreflang', 'es');
    expect(screen.getByText('EN')).toHaveAttribute('aria-current', 'true');
    // The same items render in the desktop and mobile navs, so scope the query.
    const nav = within(screen.getByRole('navigation', { name: 'Primary navigation' }));
    expect(nav.getByRole('link', { name: 'How we work' })).toHaveAttribute('href', '/#about');
  });

  it('prefixes navigation with the locale and links back to English from Spanish', () => {
    renderHeaderAt('/es', 'es');

    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toHaveTextContent('Qué construimos');
    const nav = within(screen.getByRole('navigation', { name: 'Navegación principal' }));
    expect(nav.getByRole('link', { name: 'Cómo trabajamos' })).toHaveAttribute('href', '/es#about');
    expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/');
    expect(screen.getByText('ES')).toHaveAttribute('aria-current', 'true');
  });

  it('keeps the reader on the same article when switching language', () => {
    renderHeaderAt('/blog/clean-code', 'en');

    expect(screen.getByRole('link', { name: 'ES' })).toHaveAttribute('href', '/es/blog/clean-code');
  });

  it('toggles the theme, exposes its state, and persists it', async () => {
    const user = userEvent.setup();
    renderHeader();

    const toggle = screen.getByRole('button', { name: 'Use light theme' });
    await user.click(toggle);

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'));
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('smartcoder-theme')).toBe('light');
  });
});
