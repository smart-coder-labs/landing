import { useLanguage } from '../i18n';
import Reveal from './Reveal';

function TechStackSection() {
  const { t } = useLanguage();
  return (
    <section className="section operating-model-section" aria-labelledby="stack-title">
      <div className="container">
        <Reveal className="section-heading"><h2 id="stack-title">{t.stack.title}</h2><p>{t.stack.intro}</p></Reveal>
        <Reveal className="operating-band">
          <img src="/brand/operating-model.jpg" alt="" width={1400} height={788} loading="lazy" decoding="async" />
        </Reveal>
        <Reveal className="process-panel signal-card glass-panel" index={1}>
          <h3>{t.stack.processTitle}</h3>
          <ol>{t.stack.process.map(([step, description]) => <li key={step}><strong>{step}</strong><span>{description}</span></li>)}</ol>
        </Reveal>
      </div>
    </section>
  );
}

export default TechStackSection;
