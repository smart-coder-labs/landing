import { ArrowUpRight, Github, Linkedin, Loader2, Mail, MapPin, Send, Twitter, Youtube } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { supabaseClient } from '../lib';
import { useLanguage } from '../i18n';

type FormValues = { name: string; email: string; subject: string; message: string; };
const emptyForm: FormValues = { name: '', email: '', subject: '', message: '' };

function ContactSection() {
  const { t } = useLanguage();
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabaseClient.from('contact_messages').insert({ full_name: values.name, email: values.email, subject: values.subject, message: values.message });
      setStatus(error ? 'error' : 'success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">{t.contact.eyebrow}</p><h2 id="contact-title">{t.contact.title}</h2><p>{t.contact.intro}</p></div>
        <div className="contact-grid">
          <aside className="contact-info-panel glass-panel card">
            <div className="contact-panel-heading"><p>{t.contact.panelLabel}</p><h3>SmartCoderLabs</h3></div>
            <p className="contact-panel-summary">{t.contact.panelSummary}</p>
            <div className="contact-availability"><span aria-hidden="true" /><div><strong>{t.contact.availabilityTitle}</strong><p>{t.contact.availabilityBody}</p></div></div>
            <div className="contact-details">
            <div className="contact-row"><span className="icon-box"><Mail size={18} aria-hidden="true" /></span><div><h3>{t.contact.email}</h3><a href="mailto:founder@smartcoderlabs.com">founder@smartcoderlabs.com</a></div></div>
            <div className="contact-row"><span className="icon-box"><MapPin size={18} aria-hidden="true" /></span><div><h3>{t.contact.based}</h3><p>{t.contact.location}</p></div></div>
            </div><div className="social-links" aria-label={t.contact.social}>
            <a className="icon-button" href="https://github.com/smart-coder-labs/" target="_blank" rel="noopener noreferrer" aria-label={t.contact.github}><Github size={18} /></a>
            <a className="icon-button" href="https://www.linkedin.com/in/smart-coder-labs-6228b4373/" target="_blank" rel="noopener noreferrer" aria-label={t.contact.linkedin}><Linkedin size={18} /></a>
            <a className="icon-button" href="https://x.com/CesarPuentesDev" target="_blank" rel="noopener noreferrer" aria-label={t.contact.x}><Twitter size={18} /></a>
            <a className="icon-button" href="https://www.youtube.com/@SmartCoderLabs" target="_blank" rel="noopener noreferrer" aria-label={t.contact.youtube}><Youtube size={18} /></a>
            </div>
          </aside>
          <div className="contact-form-panel glass-panel card">
            {status === 'success' ? <div className="form-success" role="status"><Send size={24} aria-hidden="true" /><h3>{t.contact.successTitle}</h3><p>{t.contact.successBody}</p></div> : <form onSubmit={handleSubmit}>
              <div className="contact-form-heading"><span>{t.contact.formLabel}</span><p>{t.contact.formHint}</p></div>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="name">{t.contact.name}</label><input id="name" name="name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} required autoComplete="name" /></div>
                <div className="form-field"><label htmlFor="email">{t.contact.emailLabel}</label><input id="email" name="email" type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} required autoComplete="email" /></div>
                <div className="form-field full"><label htmlFor="subject">{t.contact.subject}</label><input id="subject" name="subject" value={values.subject} onChange={(event) => setValues({ ...values, subject: event.target.value })} /></div>
                <div className="form-field full"><label htmlFor="message">{t.contact.message}</label><textarea id="message" name="message" value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} required /></div>
              </div>
              {status === 'error' && <p className="form-error" role="alert">{t.contact.error}</p>}
              <div className="form-action-zone">
                <p>{t.contact.actionNote}</p>
                <button className="button button-primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <Loader2 size={17} aria-label={t.contact.sendingIcon} /> : <ArrowUpRight size={17} aria-hidden="true" />} {status === 'loading' ? t.contact.sending : t.contact.send}</button>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
