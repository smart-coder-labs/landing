import { StrictMode } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomePage from "../../pages/HomePage";
import GlobantHeader from "./GlobantHeader";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("Globant landing interactions", () => {
  it("navigates all slides with buttons and keyboard, and removes timers on unmount", () => {
    vi.useFakeTimers();
    const scheduled = vi.spyOn(window, "setTimeout");
    const cleared = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(
      <StrictMode>
        <HomePage />
      </StrictMode>,
    );
    const first = screen.getByRole("button", {
      name: "Software e IA, diapositiva 1",
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Diapositiva siguiente" }),
    );
    expect(
      screen.getByRole("heading", { name: /Del primer problema/ }),
    ).toBeVisible();
    fireEvent.keyDown(
      screen.getByRole("group", { name: "Elegir diapositiva" }),
      { key: "End" },
    );
    expect(
      screen.getByRole("heading", { name: /Sistemas conectados/ }),
    ).toBeVisible();
    fireEvent.keyDown(
      screen.getByRole("group", { name: "Elegir diapositiva" }),
      { key: "Home" },
    );
    expect(first).toHaveAttribute("aria-pressed", "true");
    unmount();
    const carouselTimers = scheduled.mock.results.filter(
      (_, i) => scheduled.mock.calls[i][1] === 8500,
    );
    expect(carouselTimers.length).toBeGreaterThan(0);
    for (const timer of carouselTimers)
      expect(cleared).toHaveBeenCalledWith(timer.value);
  });

  it("respects reduced motion while retaining manual navigation", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    render(<HomePage />);
    expect(
      screen.getByRole("button", {
        name: "Movimiento reducido por la preferencia del dispositivo",
      }),
    ).toBeDisabled();
    act(() => vi.advanceTimersByTime(20_000));
    expect(
      screen.getByRole("heading", { name: /Ingeniería de software/ }),
    ).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: "Diapositiva siguiente" }),
    );
    expect(
      screen.getByRole("heading", { name: /Del primer problema/ }),
    ).toBeVisible();
  });

  it("closes the mobile menu with Escape and restores focus", () => {
    render(
      <StrictMode>
        <GlobantHeader />
      </StrictMode>,
    );
    const menu = screen.getByRole("button", { name: "Menú" });
    fireEvent.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(document.body).toHaveClass("g-menu-open");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(document.body).not.toHaveClass("g-menu-open");
    expect(menu).toHaveFocus();
  });
});
