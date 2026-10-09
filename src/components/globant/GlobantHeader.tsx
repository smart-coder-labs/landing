import { useRef } from "react";
import { useNavigation } from "./useNavigation";

export default function GlobantHeader() {
  const ref = useRef<HTMLElement>(null);
  useNavigation(ref);
  return (
    <>
      <a className="g-skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="g-header" ref={ref}>
        <div className="g-nav-wrap">
          <a className="g-brand" href="/" aria-label="SmartCoderLabs, inicio">
            SmartCoder<span>Labs</span>
            <svg viewBox="0 0 20 24" aria-hidden="true">
              <path d="M2 3h5l8 9-8 9H2l8-9Z" />
            </svg>
          </a>
          <button
            className="g-menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="g-navigation"
          >
            <span>Menú</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <nav id="g-navigation" aria-label="Navegación principal">
            <a href="/#capacidades">
              Qué hacemos
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="m2 4 4 4 4-4" />
              </svg>
            </a>
            <a href="/#enfoque">Nuestro enfoque</a>
            <a href="/#proyectos">Proyectos</a>
            <a href="/#ideas">Ideas</a>
            <a className="g-nav-contact" href="/#contacto">
              Hablemos
            </a>
            <a
              className="g-review-link"
              href="/#proyectos"
              aria-label="Explorar proyectos"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
              </svg>
              <span>Proyectos</span>
            </a>
            <span className="g-language" lang="es">
              ES
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}
