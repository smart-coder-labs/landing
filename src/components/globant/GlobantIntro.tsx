export default function GlobantIntro() {
  return (
    <section
      className="g-intro g-contained"
      id="enfoque"
      aria-labelledby="g-intro-heading"
    >
      <div
        className="g-delivery-visual"
        aria-label="Una entrega conecta propósito, ingeniería y operación"
      >
        <div className="g-visual-rail">
          <span></span>
          <span></span>
          <span></span>
          <b>SmartCoderLabs</b>
        </div>
        <div className="g-delivery-body">
          <h3>¿Qué necesita funcionar mejor?</h3>
          <div className="g-delivery-path">
            <span>Propósito</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
            <span>Ingeniería</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
            <span>Operación</span>
          </div>
          <div className="g-delivery-copy">
            <b>El producto no termina en la entrega.</b>
            <p>Quedan decisiones, pruebas y conocimiento para continuar.</p>
          </div>
        </div>
      </div>
      <div className="g-intro-copy">
        <h2 id="g-intro-heading">
          De la idea.
          <br />A lo que sigue.
        </h2>
        <p>
          Somos una fábrica de productos de software. Unimos diseño, ingeniería
          e IA aplicada para transformar problemas concretos en herramientas
          útiles.
        </p>
        <p>
          Construimos con tu contexto, pensando también en quién va a operar,
          mantener y evolucionar el resultado.
        </p>
        <a className="g-button g-button-outline" href="#capacidades">
          Explora lo que hacemos
        </a>
      </div>
    </section>
  );
}
