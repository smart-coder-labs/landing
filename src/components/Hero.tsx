import { ArrowDownRight, Network } from 'lucide-react';
import { useLanguage } from '../i18n';

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><Network size={14} aria-hidden="true" /> {t.hero.eyebrow}</p>
          <h1 id="hero-title">{t.hero.titleStart} <span>{t.hero.titleAccent}</span> {t.hero.titleEnd}</h1>
          <p className="hero-summary">{t.hero.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">{t.hero.primary} <ArrowDownRight size={17} aria-hidden="true" /></a>
            <a className="button button-secondary" href="#blog">{t.hero.secondary}</a>
          </div>
          <div className="hero-meta" aria-label={t.hero.disciplines}>
            {t.hero.tags.map((tag) => <span className="meta-pill" key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="hero-signals" aria-label={t.hero.disciplines}>
          <article className="signal-card work-signal-card glass-panel">
            <span className="signal-eyebrow">{t.hero.signalLabel}</span>
            <strong className="signal-title">{t.hero.signal}</strong>
            <p className="signal-description">{t.hero.signalBody}</p>
          </article>
          <article className="signal-card signal-card-offset glass-panel">
            <span>{t.hero.capabilityLabel}</span>
            <strong>{t.hero.capability}</strong>
            <p>{t.hero.capabilityBody}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Hero;
