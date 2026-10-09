export default function GlobantInsights() {
  return (
    <section
      className="g-insights g-wide"
      id="ideas"
      aria-labelledby="g-insights-heading"
    >
      <header className="g-section-heading">
        <h2 id="g-insights-heading">Ideas para construir con criterio.</h2>
        <p>IA y software, desde las decisiones que hay detrás.</p>
      </header>
      <div className="g-insight-grid">
        <a
          href="/blog/rag-en-produccion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="g-insight-art g-insight-rag" aria-hidden="true">
            <span>RAG</span>
          </span>
          <h3>RAG en producción</h3>
          <p>El trabajo empieza donde termina el prototipo.</p>
          <span className="g-text-link">
            Leer artículo
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </span>
        </a>
        <a
          href="/blog/evaluacion-sistemas-llm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="g-insight-art g-insight-eval" aria-hidden="true">
            <span>Evaluar.</span>
          </span>
          <h3>Evaluar sin engañarte</h3>
          <p>Cómo mirar el comportamiento de un sistema con LLM.</p>
          <span className="g-text-link">
            Leer artículo
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </span>
        </a>
        <a
          href="/blog/agentes-ia-cuando-sirven"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="g-insight-art g-insight-agent" aria-hidden="true">
            <span>¿Un agente?</span>
          </span>
          <h3>¿Necesitas un agente?</h3>
          <p>Dónde aporta autonomía y dónde añade complejidad.</p>
          <span className="g-text-link">
            Leer artículo
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
