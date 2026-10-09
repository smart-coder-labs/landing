import { useEffect, type RefObject } from "react";

// Preserve the design pack's carousel behavior; dispose all work on route changes.
export function useLandingInteractions(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const controller = new AbortController();
    const observers: IntersectionObserver[] = [];
    const $ = (selector: string, scope: ParentNode = root) =>
      scope.querySelector<HTMLElement>(selector)!;
    const $$ = (selector: string, scope: ParentNode = root) => [
      ...scope.querySelectorAll<HTMLElement>(selector),
    ];
    function listen<K extends keyof HTMLElementEventMap>(
      target: HTMLElement | Document | Window,
      event: K,
      callback: (event: HTMLElementEventMap[K]) => void,
    ) {
      target.addEventListener(event, callback as EventListener, {
        signal: controller.signal,
      });
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = $(".g-hero", root);
    const slides = $$(".g-slide", hero);
    const selectors = $$("[data-slide]", hero);
    const controls = $(".g-carousel-controls", hero);
    const prev = $(".g-hero-prev", hero);
    const next = $(".g-hero-next", hero);
    const motion = $(".g-motion-toggle", hero);
    const status = $(".g-slide-status", hero);
    let current = 0;
    let userPaused = false;
    let hovered = false;
    let focused = false;
    let inView = true;
    let timer: number | null = null;
    const isPaused = () => userPaused || reduce.matches;
    function clearTimer() {
      window.clearTimeout(timer ?? undefined);
      timer = null;
    }
    function schedule() {
      clearTimer();
      if (!isPaused() && !hovered && !focused && inView && !document.hidden) {
        timer = window.setTimeout(() => select(current + 1, false), 8500);
      }
    }
    function select(index: number, announce = true) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = i !== current;
        slide.classList.toggle("is-current", i === current);
        slide.classList.toggle("is-entering", i === current && !isPaused());
        selectors[i].setAttribute("aria-pressed", String(i === current));
      });
      hero.dataset.current = String(current);
      if (announce)
        status.textContent = slides[current].getAttribute("aria-label") || "";
      schedule();
    }
    function updateMotion() {
      const paused = isPaused();
      document.documentElement.classList.toggle("g-paused", paused);
      motion.setAttribute("aria-pressed", String(paused));
      $("span", motion).textContent = paused
        ? "Movimiento reducido"
        : "Pausar movimiento";
      motion.setAttribute(
        "aria-label",
        reduce.matches
          ? "Movimiento reducido por la preferencia del dispositivo"
          : paused
            ? "Activar movimiento"
            : "Pausar movimiento",
      );
      (motion as HTMLButtonElement).disabled = reduce.matches;
      schedule();
    }
    controls.hidden = false;
    prev.hidden = false;
    next.hidden = false;
    listen(prev, "click", () => select(current - 1));
    listen(next, "click", () => select(current + 1));
    selectors.forEach((button, i) => listen(button, "click", () => select(i)));
    listen($(".g-slide-tabs", hero), "keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const index =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? slides.length - 1
            : current + (event.key === "ArrowRight" ? 1 : -1);
      select(index);
      selectors[current].focus();
    });
    listen(motion, "click", () => {
      userPaused = !userPaused;
      updateMotion();
    });
    listen(hero, "pointerenter", (event) => {
      if (event.pointerType === "mouse") {
        hovered = true;
        clearTimer();
      }
    });
    listen(hero, "pointerleave", (event) => {
      if (event.pointerType === "mouse") {
        hovered = false;
        schedule();
      }
    });
    listen(hero, "focusin", () => {
      focused = true;
      clearTimer();
    });
    listen(hero, "focusout", (event) => {
      focused = hero.contains(event.relatedTarget as Node | null);
      schedule();
    });
    document.addEventListener("visibilitychange", schedule, {
      signal: controller.signal,
    });
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          inView = entries[0].isIntersecting;
          hero.classList.toggle("g-paused", !inView);
          schedule();
        },
        { threshold: 0.12 },
      );
      observer.observe(hero);
      observers.push(observer);
      const voice = $(".g-voice-visual", root);
      const voiceObserver = new IntersectionObserver(
        (entries) => {
          voice.classList.toggle("g-paused", !entries[0].isIntersecting);
        },
        { threshold: 0.1 },
      );
      voiceObserver.observe(voice);
      observers.push(voiceObserver);
    }
    reduce.addEventListener("change", updateMotion);
    updateMotion();
    const copy = $(".g-copy-email", root);
    if (navigator.clipboard && window.isSecureContext) {
      copy.hidden = false;
      listen(copy, "click", async () => {
        const feedback = $(".g-contact-status", root);
        try {
          await navigator.clipboard.writeText("founder@smartcoderlabs.com");
          feedback.textContent = "Correo copiado.";
        } catch {
          feedback.textContent =
            "No se pudo copiar. Selecciona el correo que aparece arriba.";
        }
      });
    }

    window.addEventListener("pagehide", clearTimer, {
      signal: controller.signal,
    });
    window.addEventListener("pageshow", schedule, {
      signal: controller.signal,
    });
    return () => {
      clearTimer();
      controller.abort();
      observers.forEach((observer) => observer.disconnect());
      reduce.removeEventListener("change", updateMotion);
      document.documentElement.classList.remove("g-paused");
    };
  }, [ref]);
}
