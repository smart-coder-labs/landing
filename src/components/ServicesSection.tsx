import { Blocks, BrainCircuit, Check, Database, Server, Workflow } from 'lucide-react';
import { useLanguage } from '../i18n';
import Reveal from './Reveal';

const icons = [Blocks, Server, Database, BrainCircuit, Workflow] as const;

function ServicesSection() {
  const { t } = useLanguage();
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section-heading"><h2 id="services-title">{t.services.title}</h2><p>{t.services.intro}</p></Reveal>
        <div className="service-list">
          {t.services.items.map(([title, description, features], index) => { const Icon = icons[index]; return <Reveal as="article" className="service-item" key={title} index={index}><span className="service-index">0{index + 1}</span><span className="icon-box"><Icon size={19} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div><ul className="feature-list">{features.map((feature) => <li key={feature}><Check size={14} aria-hidden="true" />{feature}</li>)}</ul></Reveal>; })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
