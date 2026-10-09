import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "smartcoder-landing-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // The inline bootstrap already selected the theme before first paint.
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      const next = event.newValue === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // Theme switching remains available when persistence is unavailable.
    }
  }

  return (
    <button
      className="g-theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="Modo oscuro"
      aria-pressed={theme === "dark"}
      title={
        theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
    >
      <svg className="g-theme-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 13a8.5 8.5 0 0 1-9.5-9.5A8.5 8.5 0 1 0 20.5 13Z" />
      </svg>
      <svg className="g-theme-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
    </button>
  );
}
