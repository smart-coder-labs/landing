import type { CSSProperties } from "react";

export default function GlobantProjects() {
  return (
    <section
      className="g-stories g-wide"
      id="proyectos"
      aria-labelledby="g-stories-heading"
    >
      <header className="g-section-heading g-centered">
        <h2 id="g-stories-heading">Detrás de una buena decisión.</h2>
        <p>
          Dos proyectos propios de Cesar Ruiz muestran cómo aborda problemas de
          arquitectura.
          <br className="g-desktop-break" /> Puedes consultar el contexto y los
          trade-offs en su portafolio público.
        </p>
      </header>
      <div className="g-story-layout">
        <div className="g-story-copy">
          <h3>NexusMind</h3>
          <p>
            Memoria y contexto persistentes para herramientas y agentes de IA.
          </p>
          <p>
            El aislamiento entre organizaciones se resuelve antes de consultar
            la memoria. Una decisión sobre límites que forma parte de cada
            operación.
          </p>
          <a
            className="g-button g-button-outline"
            href="https://cr8297408.github.io/backend-engineering-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leer el caso de Cesar
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 15 15 5M5 5h10v10" />
            </svg>
          </a>
          <p className="g-attribution">Proyecto propio de Cesar Ruiz.</p>
        </div>
        <div className="g-story-visual">
          <div className="g-memory-title">
            NexusMind<span>Memoria con contexto</span>
          </div>
          <div className="g-memory-flow">
            <div>
              Solicitud<span>¿Quién consulta?</span>
            </div>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
            <div className="g-memory-boundary">
              Organización<span>Un límite explícito</span>
            </div>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
            <div>
              Memoria<span>Contexto permitido</span>
            </div>
          </div>
          <p>Esquema simplificado del caso público.</p>
        </div>
      </div>
      <div className="g-story-layout g-story-reverse">
        <div className="g-voice-visual" aria-hidden="true">
          <div className="g-voice-wave">
            <i
              style={{ "--bar": "14px", "--delay": "0.00s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "22px", "--delay": "0.07s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "40px", "--delay": "0.14s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "27px", "--delay": "0.21s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "60px", "--delay": "0.28s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "82px", "--delay": "0.35s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "52px", "--delay": "0.42s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "96px", "--delay": "0.49s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "68px", "--delay": "0.56s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "37px", "--delay": "0.63s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "56px", "--delay": "0.70s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "87px", "--delay": "0.77s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "102px", "--delay": "0.84s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "71px", "--delay": "0.91s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "43px", "--delay": "0.98s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "64px", "--delay": "1.05s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "92px", "--delay": "1.12s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "53px", "--delay": "1.19s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "31px", "--delay": "1.26s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "68px", "--delay": "1.33s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "43px", "--delay": "1.40s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "28px", "--delay": "1.47s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "17px", "--delay": "1.54s" } as CSSProperties}
            ></i>
            <i
              style={{ "--bar": "24px", "--delay": "1.61s" } as CSSProperties}
            ></i>
          </div>
          <div className="g-voice-flow">
            <span>Voz a texto</span>
            <span>Modelo</span>
            <span>Texto a voz</span>
          </div>
          <b>Una interfaz. Distintos proveedores.</b>
          <p className="g-voice-caption">
            Visual conceptual de una interfaz de voz.
          </p>
        </div>
        <div className="g-story-copy">
          <h3>J.A.R.V.I.S.</h3>
          <p>
            Una interfaz de voz para trabajar con herramientas de desarrollo.
          </p>
          <p>
            Adaptadores intercambiables de STT, TTS y LLM permiten cambiar de
            proveedor. Esa independencia también exige mantener más interfaces.
          </p>
          <a
            className="g-button g-button-outline"
            href="https://cr8297408.github.io/backend-engineering-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorar el proyecto
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 15 15 5M5 5h10v10" />
            </svg>
          </a>
          <p className="g-attribution">Proyecto propio de Cesar Ruiz.</p>
        </div>
      </div>
    </section>
  );
}
