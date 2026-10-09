import { BrainCircuit, Code2, Database, GitBranch } from 'lucide-react';
import { useLanguage } from '../i18n';
import Reveal from './Reveal';

const icons = [Code2, BrainCircuit, GitBranch, Database] as const;

function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container split-grid">
        <Reveal>
          <h2 id="about-title">{t.about.title}</h2><p className="body-copy">{t.about.first}</p><p className="body-copy">{t.about.second}</p>
          <ul className="evidence-list">{t.about.metrics.map((item) => <li key={item}>{item}</li>)}</ul>
        </Reveal>
        <div className="value-grid">
          {t.about.values.map(([title, description], index) => { const Icon = icons[index]; return <Reveal as="article" className="glass-panel card" key={title} index={index}><span className="icon-box"><Icon size={19} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></Reveal>; })}
        </div>
      </div>
    </section>
  );
}

export default About;
