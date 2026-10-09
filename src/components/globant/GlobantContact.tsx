export default function GlobantContact() {
  return (
    <section
      className="g-contact"
      id="contacto"
      aria-labelledby="g-contact-heading"
    >
      <div className="g-contact-art" aria-hidden="true"></div>
      <div className="g-contact-inner g-contained">
        <div>
          <h2 id="g-contact-heading">
            Cuéntanos
            <br /> qué necesitas
            <br /> hacer posible.
          </h2>
          <div className="g-contact-rule"></div>
        </div>
        <div className="g-contact-panel">
          <h3>Empecemos con una conversación.</h3>
          <p>
            El contexto, el reto y lo que tu equipo necesita poder hacer. Ese es
            un buen punto de partida.
          </p>
          <div className="g-contact-topics">
            <span>Un producto nuevo</span>
            <span>Un sistema que evoluciona</span>
            <span>IA en un proceso real</span>
          </div>
          <a className="g-email" href="mailto:founder@smartcoderlabs.com">
            founder@smartcoderlabs.com
          </a>
          <a
            className="g-button g-button-lime"
            href="mailto:founder@smartcoderlabs.com?subject=Conversemos%20sobre%20un%20proyecto"
          >
            Escríbenos
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 5h14v10H3zM3 5l7 6 7-6" />
            </svg>
          </a>
          <button className="g-copy-email" type="button" hidden>
            Copiar correo
          </button>
          <p className="g-contact-status" role="status" aria-live="polite"></p>
          <p className="g-contact-note">
            El enlace abre tu aplicación de correo.
          </p>
        </div>
      </div>
    </section>
  );
}
