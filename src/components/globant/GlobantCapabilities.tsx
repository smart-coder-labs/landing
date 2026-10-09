export default function GlobantCapabilities() {
  return (
    <section
      className="g-capabilities g-wide"
      id="capacidades"
      aria-labelledby="g-capabilities-heading"
    >
      <header className="g-section-heading">
        <h2 id="g-capabilities-heading">Tecnología para tu siguiente paso.</h2>
        <p>
          <strong>El problema marca el punto de partida.</strong>
          <br />
          El producto, las conexiones y la inteligencia se construyen como un
          sistema.
        </p>
      </header>
      <div className="g-service-grid">
        <article className="g-service-card">
          <img
            src="/assets/globant-inspired/product.webp"
            width="2172"
            height="724"
            loading="lazy"
            alt="Imagen conceptual de profesionales colaborando en un producto digital"
          />
          <h3>Productos de software</h3>
          <p>
            Aplicaciones y herramientas alrededor de las personas que las usan.
            Del descubrimiento y el diseño a la construcción, integración y
            evolución.
          </p>
          <a href="#contacto" className="g-text-link">
            Hablemos de tu producto
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </a>
        </article>
        <article className="g-service-card">
          <img
            src="/assets/globant-inspired/backend.webp"
            width="2172"
            height="724"
            loading="lazy"
            alt="Imagen conceptual de infraestructura y conexiones de un servidor"
          />
          <h3>Backend, APIs y datos</h3>
          <p>
            Fundamentos para conectar sistemas sin perder claridad. Contratos,
            integraciones, modelos de datos y decisiones que se pueden explicar.
          </p>
          <a href="#proyectos" className="g-text-link">
            Explora la arquitectura
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </a>
        </article>
        <article className="g-service-card">
          <img
            src="/assets/globant-inspired/ai.webp"
            width="2172"
            height="724"
            loading="lazy"
            alt="Visual conceptual de flujos de información verdes sobre fondo oscuro"
          />
          <h3>Inteligencia artificial</h3>
          <p>
            Contexto, memoria y herramientas para incorporar IA al trabajo. Con
            evaluación, límites y revisión humana según lo que el producto
            necesita.
          </p>
          <a href="#ideas" className="g-text-link">
            Conoce el criterio
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </a>
        </article>
      </div>
    </section>
  );
}
