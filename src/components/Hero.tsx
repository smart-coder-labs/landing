import { ArrowDownRight, Network } from 'lucide-react';
import { useLanguage } from '../i18n';
import Reveal from './Reveal';

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
        <div className="hero-visual glass-panel">
          {/* Decorative: the headline already carries the message, so it stays out of the a11y tree. */}
          <img src="/brand/hero-layers.jpg" alt="" width={1100} height={825} fetchPriority="high" decoding="async" />
        </div>
      </div>
      <div className="container hero-signals" aria-label={t.hero.disciplines}>
        <Reveal as="article" className="signal-card">
          <span className="signal-eyebrow">{t.hero.signalLabel}</span>
          <strong className="signal-title">{t.hero.signal}</strong>
          <p className="signal-description">{t.hero.signalBody}</p>
        </Reveal>
        <Reveal as="article" className="signal-card" index={1}>
          <span>{t.hero.capabilityLabel}</span>
          <strong>{t.hero.capability}</strong>
          <p>{t.hero.capabilityBody}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
