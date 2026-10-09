export default function GlobantHero() {
  return (
    <section
      className="g-hero"
      aria-label="Lo que construimos"
      aria-roledescription="carrusel"
    >
      <div className="g-hero-wash" aria-hidden="true"></div>
      <div
        className="g-slide is-current"
        id="g-slide-1"
        role="group"
        aria-roledescription="diapositiva"
        aria-label="1 de 3: software e IA"
      >
        <div className="g-hero-copy">
          <div className="g-hero-brand" aria-hidden="true">
            SmartCoder<span>Labs</span>
          </div>
          <h1>
            Ingeniería de software.
            <br />
            IA aplicada a tu negocio.
          </h1>
          <p>
            Productos que resuelven. Sistemas que se conectan.
            <br className="g-desktop-break" /> Equipos que pueden seguir
            construyendo.
          </p>
          <a className="g-button g-button-lime" href="#contacto">
            Construyamos lo que sigue
          </a>
        </div>
        <div className="g-hero-art g-service-scene" aria-hidden="true">
          <article className="g-float-card g-float-backend">
            <span className="g-card-icon">
              <svg viewBox="0 0 24 24">
                <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" />
              </svg>
            </span>
            <h2>Backend &amp; APIs</h2>
            <p>La base que conecta tu producto.</p>
            <ul>
              <li>Contratos claros</li>
              <li>Integración de sistemas</li>
              <li>Datos y observabilidad</li>
            </ul>
            <div className="g-card-foot">
              Diseñado para evolucionar
              <svg viewBox="0 0 20 20">
                <path d="M4 10h12m-5-5 5 5-5 5" />
              </svg>
            </div>
          </article>
          <article className="g-float-card g-float-ai">
            <span className="g-card-icon">
              <svg viewBox="0 0 24 24">
                <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />
              </svg>
            </span>
            <h2>IA aplicada</h2>
            <p>Inteligencia dentro del trabajo real.</p>
            <ul>
              <li>Contexto y herramientas</li>
              <li>Evaluación continua</li>
              <li>Revisión humana</li>
            </ul>
            <div className="g-card-foot">
              Del prototipo al producto
              <svg viewBox="0 0 20 20">
                <path d="M4 10h12m-5-5 5 5-5 5" />
              </svg>
            </div>
          </article>
          <div className="g-scene-caption">
            Producto + ingeniería + conocimiento
          </div>
        </div>
      </div>
      <div
        className="g-slide"
        id="g-slide-2"
        role="group"
        aria-roledescription="diapositiva"
        aria-label="2 de 3: producto y personas"
        hidden
      >
        <div className="g-hero-copy">
          <div className="g-hero-brand" aria-hidden="true">
            SmartCoder<span>Labs</span>
          </div>
          <h2>
            Del primer problema
            <br />a un producto que funciona.
          </h2>
          <p>
            Diseño, desarrollo y operación.
            <br className="g-desktop-break" /> Una misma conversación, de
            extremo a extremo.
          </p>
          <a className="g-button g-button-lime" href="#enfoque">
            Conoce nuestro enfoque
          </a>
        </div>
        <div className="g-hero-art g-product-scene" aria-hidden="true">
          <img
            src="/assets/globant-inspired/product.webp"
            width="2172"
            height="724"
            alt=""
          />
          <div className="g-photo-label">Entender. Construir. Evolucionar.</div>
        </div>
      </div>
      <div
        className="g-slide"
        id="g-slide-3"
        role="group"
        aria-roledescription="diapositiva"
        aria-label="3 de 3: arquitectura y conexiones"
        hidden
      >
        <div className="g-hero-copy">
          <div className="g-hero-brand" aria-hidden="true">
            SmartCoder<span>Labs</span>
          </div>
          <h2>
            Sistemas conectados.
            <br />
            Responsabilidades claras.
          </h2>
          <p>
            Backend, APIs y datos con límites explícitos.
            <br className="g-desktop-break" /> La arquitectura también es parte
            del producto.
          </p>
          <a className="g-button g-button-lime" href="#proyectos">
            Explora las decisiones
          </a>
        </div>
        <div className="g-hero-art g-architecture-scene" aria-hidden="true">
          <div className="g-architecture-heading">
            De la intención al sistema
          </div>
          <div className="g-architecture-node">
            Producto<span>Personas y propósito</span>
          </div>
          <div className="g-connection-line"></div>
          <div className="g-architecture-node g-node-accent">
            API<span>Contratos y responsabilidades</span>
          </div>
          <div className="g-connection-line"></div>
          <div className="g-architecture-node">
            Datos<span>Contexto y acceso</span>
          </div>
        </div>
      </div>
      <button
        className="g-hero-arrow g-hero-prev"
        type="button"
        aria-label="Diapositiva anterior"
        hidden
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m14 5-7 7 7 7" />
        </svg>
      </button>
      <button
        className="g-hero-arrow g-hero-next"
        type="button"
        aria-label="Diapositiva siguiente"
        hidden
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>
      <div className="g-carousel-controls" hidden>
        <div
          className="g-slide-tabs"
          role="group"
          aria-label="Elegir diapositiva"
        >
          <button
            type="button"
            data-slide="0"
            aria-label="Software e IA, diapositiva 1"
            aria-pressed="true"
          >
            <span></span>
          </button>
          <button
            type="button"
            data-slide="1"
            aria-label="Producto y personas, diapositiva 2"
            aria-pressed="false"
          >
            <span></span>
          </button>
          <button
            type="button"
            data-slide="2"
            aria-label="Arquitectura, diapositiva 3"
            aria-pressed="false"
          >
            <span></span>
          </button>
        </div>
        <button className="g-motion-toggle" type="button" aria-pressed="false">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 4v12M14 4v12" />
          </svg>
          <span>Pausar movimiento</span>
        </button>
      </div>
      <p
        className="g-sr-only g-slide-status"
        role="status"
        aria-live="polite"
      ></p>
    </section>
  );
}
