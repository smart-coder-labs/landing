import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./pages/HomePage', () => ({
  default: () => <section id="blog">Insights</section>,
}));

describe('App', () => {
  it('stops waiting for a hash target that never mounts and cleans up on unmount', () => {
    vi.useFakeTimers();
    const observe = vi.fn();
    const disconnect = vi.fn();
    const mutationObserver = vi.fn().mockImplementation(() => ({ observe, disconnect }));
    vi.stubGlobal('MutationObserver', mutationObserver);
    window.history.pushState({}, '', '/#missing');

    const { unmount } = render(<App />);

    expect(observe).toHaveBeenCalledWith(document.body, { childList: true, subtree: true });
    expect(vi.getTimerCount()).toBeGreaterThan(0);

    unmount();

    expect(disconnect).toHaveBeenCalledOnce();

    const secondRender = render(<App />);
    vi.advanceTimersByTime(1_000);

    expect(disconnect).toHaveBeenCalledTimes(2);

    secondRender.unmount();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('resets the inner scroll container, which is what actually scrolls', () => {
    // The shell scrolls .site-content, not the document, so resetting only the
    // window left the previous page's position and dropped readers near the end
    // of the article they had just opened.
    window.history.pushState({}, '', '/blog/some-article');
    const originalScrollTo = window.scrollTo;
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: vi.fn() });

    const { container } = render(<App />);
    const scrollContainer = container.querySelector('.site-content') as HTMLElement;
    scrollContainer.scrollTop = 2400;

    window.history.pushState({}, '', '/blog/another-article');
    render(<App />);

    expect((document.querySelector('.site-content') as HTMLElement).scrollTop).toBe(0);

    Object.defineProperty(window, 'scrollTo', { configurable: true, value: originalScrollTo });
  });

  it('renders HomePage without showing the application loading screen', () => {
    window.history.pushState({}, '', '/');
    const originalScrollTo = window.scrollTo;
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: vi.fn() });

    render(<App />);

    expect(screen.queryByText('Loading page...')).not.toBeInTheDocument();
    expect(document.getElementById('blog')).toBeInTheDocument();

    Object.defineProperty(window, 'scrollTo', { configurable: true, value: originalScrollTo });
  });
});
