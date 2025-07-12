import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Youtube, Loader2 } from 'lucide-react';
import { supabaseClient } from '../lib';
import ScrollAnimation from './ScrollAnimation';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactSection: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { error } = await supabaseClient.from('contact_messages').insert({
        full_name: formValues.name,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message
      });

      if (error) {
        throw error;
      }

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError("Error al enviar el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-futuristic-dark">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in" delay={0.2}>
          <div className="text-center mb-16">
            <ScrollAnimation animation="zoom-in" delay={0.4}>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ponte en <span className="text-gradient">Contacto</span>
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" delay={0.6}>
              <p className="text-lg max-w-2xl mx-auto text-slate-300">
                ¿Tienes alguna pregunta o quieres colaborar en un proyecto?
                Envíanos un mensaje y nos pondremos en contacto contigo pronto.
              </p>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-left" delay={0.8}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in" delay={1.0}>
              <div className="lg:col-span-1 glass-card rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white">
                  Información de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="glass-card p-3 rounded-lg mr-4">
                      <Mail className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Email</h4>
                      <a href="mailto:contacto@smartcoderlabs.com" className="text-slate-300 hover:text-gradient transition-all duration-300">
                        contacto@smartcoderlabs.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="glass-card p-3 rounded-lg mr-4">
                      <MapPin className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Ubicación</h4>
                      <p className="text-slate-300">
                        Risaralda, Colombia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="glass-card p-3 rounded-lg mr-4">
                      <Phone className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Teléfono</h4>
                      <a href="tel:+34600000000" className="text-slate-300 hover:text-gradient transition-all duration-300">
                        +34 600 000 000
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-medium text-white mb-4">
                    Síguenos en Redes Sociales
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/smartcoderlabs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-3 rounded-lg text-slate-300 hover:text-blue-400 hover:animate-glow-pulse transition-all duration-300"
                    >
                      <Github />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/cesarbackend/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-3 rounded-lg text-slate-300 hover:text-blue-400 hover:animate-glow-pulse transition-all duration-300"
                    >
                      <Linkedin />
                    </a>
                    <a
                      href="https://x.com/CesarPuentesDev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-3 rounded-lg text-slate-300 hover:text-blue-400 hover:animate-glow-pulse transition-all duration-300"
                    >
                      <Twitter />
                    </a>
                    <a
                      href="https://www.youtube.com/@SmartCoderLabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-3 rounded-lg text-slate-300 hover:text-red-400 hover:animate-glow-pulse transition-all duration-300"
                    >
                      <Youtube />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-right" delay={1.2}>
              <div className="lg:col-span-2 glass-card rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white">
                  Envíame un Mensaje
                </h3>

                {formSubmitted ? (
                  <div className="glass-card border border-green-400/30 rounded-lg p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 glass-card rounded-full mb-4 animate-glow-pulse">
                      <Send size={24} className="text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-green-400 mb-2">
                      ¡Mensaje Enviado!
                    </h4>
                    <p className="text-slate-300">
                      Gracias por contactarme. Te responderé lo antes posible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg glass-card border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus-futuristic"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg glass-card border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus-futuristic"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                        Asunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg glass-card border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus-futuristic"
                        placeholder="¿Sobre qué quieres hablar?"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg glass-card border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus-futuristic"
                        placeholder="Tu mensaje aquí..."
                        required
                      ></textarea>
                    </div>

                    {submitError && (
                      <div className="mb-6 text-red-400 glass-card border border-red-400/30 p-3 rounded-lg">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-futuristic text-white flex items-center justify-center transition-all duration-300"
                    >
                      {loading ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 mr-2">
                          <Loader2 size={16} className="animate-spin" />
                        </div>
                      ) : (
                        <Send size={18} className="mr-2" />
                      )}
                      Enviar Mensaje
                    </button>
                  </form>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ContactSection;