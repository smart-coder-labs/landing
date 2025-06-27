import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Youtube, Loader2 } from 'lucide-react';
import { supabaseClient } from '../lib';

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
    } catch (error: any) {
      setSubmitError("Error al enviar el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Ponte en <span className="text-teal-600 dark:text-teal-500">Contacto</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
            ¿Tienes alguna pregunta o quieres colaborar en un proyecto? 
            Envíanos un mensaje y nos pondremos en contacto contigo pronto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Información de Contacto
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mr-4">
                  <Mail className="text-teal-600 dark:text-teal-500" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">Email</h4>
                  <a href="mailto:contacto@smartcoderlabs.com" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500">
                    contacto@smartcoderlabs.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mr-4">
                  <MapPin className="text-teal-600 dark:text-teal-500" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">Ubicación</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Risaralda, Colombia
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg mr-4">
                  <Phone className="text-teal-600 dark:text-teal-500" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-1">Teléfono</h4>
                  <a href="tel:+34600000000" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500">
                    +34 600 000 000
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-medium text-slate-900 dark:text-white mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/smartcoderlabs/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 hover:scale-110 transition-all duration-300"
                >
                  <Github />
                </a>
                <a 
                  href="https://www.linkedin.com/in/cesarbackend/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 hover:scale-110 transition-all duration-300"
                >
                  <Linkedin />
                </a>
                <a 
                  href="https://x.com/CesarPuentesDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 hover:scale-110 transition-all duration-300"
                >
                  <Twitter />
                </a>
                <a 
                  href="https://www.youtube.com/@SmartCoderLabs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 hover:scale-110 transition-all duration-300"
                >
                  <Youtube />
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Envíame un Mensaje
            </h3>
            
            {formSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full mb-4">
                  <Send size={24} className="text-green-600 dark:text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-green-800 dark:text-green-500 mb-2">
                  ¡Mensaje Enviado!
                </h4>
                <p className="text-green-700 dark:text-green-400">
                  Gracias por contactarme. Te responderé lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="¿Sobre qué quieres hablar?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Tu mensaje aquí..."
                    required
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="mb-6 text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-300"
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;