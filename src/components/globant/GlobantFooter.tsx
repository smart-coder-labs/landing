export default function GlobantFooter() {
  return (
    <footer className="g-footer">
      <div className="g-footer-inner g-wide">
        <div>
          <a className="g-brand" href="/#contenido">
            SmartCoder<span>Labs</span>
            <svg viewBox="0 0 20 24" aria-hidden="true">
              <path d="M2 3h5l8 9-8 9H2l8-9Z" />
            </svg>
          </a>
          <p>
            Productos de software.
            <br />
            Inteligencia aplicada. Conocimiento compartido.
          </p>
        </div>
        <div>
          <h2>Hablemos</h2>
          <a href="mailto:founder@smartcoderlabs.com">
            founder@smartcoderlabs.com
          </a>
        </div>
        <div>
          <h2>Conoce más</h2>
          <a href="/">SmartCoderLabs</a>
          <a
            href="https://cr8297408.github.io/backend-engineering-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portafolio de Cesar Ruiz
          </a>
        </div>
      </div>
      <div className="g-footer-bottom g-wide">
        <p>© SmartCoderLabs. Todos los derechos reservados.</p>
        <a href="/contacto">Formulario de contacto</a>
      </div>
    </footer>
  );
}
