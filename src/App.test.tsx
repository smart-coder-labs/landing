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
