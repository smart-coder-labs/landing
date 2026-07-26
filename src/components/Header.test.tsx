import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { LanguageProvider, ThemeProvider } from '../i18n';

function renderHeader() {
  return render(<ThemeProvider><LanguageProvider><BrowserRouter><Header /></BrowserRouter></LanguageProvider></ThemeProvider>);
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

  it('changes language, updates the document language, and persists the selection', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'ES' }));

    await waitFor(() => expect(document.documentElement.lang).toBe('es'));
    expect(localStorage.getItem('smartcoder-locale')).toBe('es');
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toHaveTextContent('Qué construimos');
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
