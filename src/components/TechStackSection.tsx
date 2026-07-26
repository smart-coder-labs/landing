import { useLanguage } from '../i18n';

function TechStackSection() {
  const { t } = useLanguage();
  return (
    <section className="section operating-model-section" aria-labelledby="stack-title">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">{t.stack.eyebrow}</p><h2 id="stack-title">{t.stack.title}</h2><p>{t.stack.intro}</p></div>
        <div className="process-panel signal-card glass-panel">
          <div><p className="eyebrow">{t.stack.processLabel}</p><h3>{t.stack.processTitle}</h3></div>
          <ol>{t.stack.process.map(([step, description]) => <li key={step}><strong>{step}</strong><span>{description}</span></li>)}</ol>
        </div>
      </div>
    </section>
  );
}

export default TechStackSection;
