import { BrainCircuit, Code2, Database, GitBranch } from 'lucide-react';
import { useLanguage } from '../i18n';

const icons = [Code2, BrainCircuit, GitBranch, Database] as const;

function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container split-grid">
        <div>
          <p className="eyebrow">{t.about.eyebrow}</p><h2 id="about-title">{t.about.title}</h2><p className="body-copy">{t.about.first}</p><p className="body-copy">{t.about.second}</p>
          <dl className="evidence-list">{t.about.metrics.map(([value, label]) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
        </div>
        <div className="value-grid">
          {t.about.values.map(([title, description], index) => { const Icon = icons[index]; return <article className="glass-panel card" key={title}><span className="icon-box"><Icon size={19} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>; })}
        </div>
      </div>
    </section>
  );
}

export default About;
