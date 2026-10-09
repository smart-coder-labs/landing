export default function GlobantCore() {
  return (
    <section className="g-core g-wide" aria-labelledby="g-core-heading">
      <h2 id="g-core-heading">
        La tecnología funciona mejor
        <br />
        cuando el equipo puede hacerla suya.
      </h2>
      <div className="g-core-grid">
        <article>
          <div className="g-core-title">
            <h3>Construir</h3>
            <span className="g-orbit g-orbit-one" aria-hidden="true"></span>
          </div>
          <p>
            Del problema a la solución, con producto e ingeniería en la misma
            conversación.
          </p>
        </article>
        <article>
          <div className="g-core-title">
            <h3>Operar</h3>
            <span className="g-orbit g-orbit-two" aria-hidden="true"></span>
          </div>
          <p>
            Observar el comportamiento, entender sus límites e intervenir con
            criterio.
          </p>
        </article>
        <article>
          <div className="g-core-title">
            <h3>Evolucionar</h3>
            <span className="g-orbit g-orbit-three" aria-hidden="true"></span>
          </div>
          <p>
            Compartir conocimiento y convertir lo aprendido en el siguiente paso
            del producto.
          </p>
        </article>
      </div>
      <a className="g-button g-button-lime" href="#contacto">
        Conversemos sobre tu reto
      </a>
    </section>
  );
}
