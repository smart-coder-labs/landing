import { useEffect, type RefObject } from "react";

// Preserve the design pack's carousel behavior; dispose all work on route changes.
export function useNavigation(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const controller = new AbortController();
    document.documentElement.classList.add("g-enhanced");
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
    const menu = $(".g-menu-toggle", root);
    const navigation = $("#g-navigation", root);
    const mobile = window.matchMedia("(max-width: 767px)");
    function closeMenu(restore = false) {
      menu.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      document.body.classList.remove("g-menu-open");
      if (restore) menu.focus();
    }
    listen(menu, "click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
      document.body.classList.toggle("g-menu-open", open);
    });
    $$("a", navigation).forEach((a) => listen(a, "click", () => closeMenu()));
    listen(document, "keydown", (event) => {
      if (
        event.key === "Escape" &&
        menu.getAttribute("aria-expanded") === "true"
      )
        closeMenu(true);
      if (
        event.key === "Tab" &&
        mobile.matches &&
        menu.getAttribute("aria-expanded") === "true"
      ) {
        const links = $$("a", navigation);
        if (event.shiftKey && document.activeElement === menu) {
          event.preventDefault();
          links.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault();
          menu.focus();
        }
      }
    });
    const breakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches) closeMenu();
    };
    mobile.addEventListener("change", breakpointChange);

    return () => {
      controller.abort();
      mobile.removeEventListener("change", breakpointChange);
      document.documentElement.classList.remove("g-enhanced");
      document.body.classList.remove("g-menu-open");
    };
  }, [ref]);
}
