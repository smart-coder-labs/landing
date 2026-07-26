import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export const translations = {
  en: {
    language: 'Language', theme: 'Theme', lightTheme: 'Use light theme', darkTheme: 'Use dark theme', skip: 'Skip to content', loadingPage: 'Loading page...',
    nav: { about: 'How we work', services: 'What we build', insights: 'Insights', contact: 'Contact', open: 'Open navigation menu', close: 'Close navigation menu', primary: 'Primary navigation', mobile: 'Mobile navigation', footer: 'Footer navigation', home: 'SmartCoderLabs home' },
    hero: { eyebrow: 'Software product factory', titleStart: 'Design,', titleAccent: 'build, and operate', titleEnd: 'the tools that move work forward.', summary: 'SmartCoderLabs designs, builds, and operates software products and applied AI capabilities for teams across the business.', primary: 'Build with us', secondary: 'Explore insights', disciplines: 'What we do', tags: ['Software products', 'Applied AI', 'Team capability'], signal: 'Products are operated, not just delivered', signalBody: 'From product design to day-to-day use and evolution.', signalLabel: 'Work', capability: 'Capability grows with the people using it', capabilityBody: 'Applied AI and practical training connect technical and business teams.', capabilityLabel: 'Shared capability' },
    about: { eyebrow: 'Our model', title: 'We turn important work into capable products and teams.', first: 'SmartCoderLabs is a software product factory. We design, build, and operate products and tools around the work that matters to your organization.', second: 'We pair applied AI with practical enablement so engineering, product, operations, administration, and business teams can use and improve what they build together.', metrics: [['01', 'Design products with purpose'], ['02', 'Build useful capabilities'], ['03', 'Operate and evolve them']], values: [['Product thinking', 'Tools shaped around the people, decisions, and work they support.'], ['Applied AI', 'Useful intelligence embedded in products and workflows.'], ['Operational ownership', 'Products prepared for daily use, learning, and improvement.'], ['Shared capability', 'Training that connects technical and business teams around the work.']] },
    services: { eyebrow: 'Products and capabilities', title: 'From an important problem to a product your team can run.', intro: 'We combine product design, delivery, operations, applied AI, and training to create capabilities that stay useful after launch.', items: [['Software products and tools', 'We design and build products that help teams do important work with more clarity and control.', ['Product discovery and design', 'Web and internal tools']], ['Applied AI capabilities', 'We apply AI to products and workflows where it can support better decisions and execution.', ['AI-enabled workflows', 'Evaluation and integration']], ['Product operations', 'We operate, observe, and improve the products and tools that teams rely on every day.', ['Reliable delivery', 'Continuous improvement']], ['Team enablement', 'We train engineering, product, operations, administration, and business teams to use, shape, and improve digital capabilities.', ['Hands-on learning', 'Cross-functional practice']], ['Technical foundations', 'We build the platforms, data, and interfaces that make products dependable and adaptable.', ['Data and API design', 'Security and observability']]], consultationEyebrow: 'Start with the work', consultationTitle: 'What should your team be able to do better?', consultationBody: 'Tell us about the work, product, or tool that needs to be designed, built, operated, or strengthened with AI.', consultationAction: 'Start a product conversation' },
    stack: { eyebrow: 'How we build and run', title: 'Technology in service of useful, operable products.', intro: 'We choose proven tools that help teams build, operate, improve, and own their products with confidence.', processLabel: 'Product operating model', processTitle: 'A visible path from work to lasting capability.', process: [['01 / Understand', 'Clarify the work, people, decisions, and constraints involved.'], ['02 / Build', 'Design and deliver the product, tools, and AI capabilities together.'], ['03 / Operate', 'Support use, learn from it, and improve the product with the team.']], items: [['TypeScript', 'Safe, expressive application code'], ['React', 'Accessible product interfaces'], ['PostgreSQL', 'Reliable relational data'], ['Cloudflare', 'Edge delivery and platform services'], ['GitHub Actions', 'Repeatable delivery workflows'], ['Vitest', 'Fast feedback through tests'], ['Security', 'Practical defense in depth'], ['Git', 'Clear collaboration history']] },
    blog: { eyebrow: 'Insights', title: 'Notes from building, operating, and improving products.', intro: 'Practical writing on software, applied AI, and the systems behind useful work.', loading: 'Loading insights...', empty: 'No insights are available right now.', read: 'Read article' },
    contact: { eyebrow: 'Contact', title: 'Build a more capable way of working.', intro: 'Tell us about the product, tool, AI capability, or team skill you want to strengthen.', panelLabel: '01 / Start here', panelSummary: 'A focused conversation is the first step toward a product your team can own and improve.', availabilityTitle: 'Open for product conversations', availabilityBody: 'Share the work that needs to move forward.', email: 'Email', based: 'Based in', location: 'Risaralda, Colombia', social: 'Social profiles', github: 'Open GitHub profile', linkedin: 'Open LinkedIn profile', x: 'Open X profile', youtube: 'Open YouTube channel', formLabel: 'Your brief', formHint: 'A few details are enough to start.', name: 'Full name', emailLabel: 'Email address', subject: 'What would you like to build or strengthen?', message: 'Tell us about your goal', actionNote: 'We will use your details only to respond to this inquiry.', error: 'We could not send your message. Please try again.', successTitle: 'Message received.', successBody: 'Thank you. We will reply as soon as possible.', sending: 'Sending...', send: 'Send message', sendingIcon: 'Sending' },
    article: { loading: 'Loading article...', missing: 'No article was specified.', unavailable: 'This article could not be loaded.', notFound: 'This article is not published yet. Publish or seed it in Supabase, then try again.', eyebrow: 'Product and technology notes', read: 'read', back: 'Back to insights' },
    footer: { built: 'Software products, applied AI, and team capability.', navigation: 'Explore', rights: 'All rights reserved.' },
  },
  es: {
    language: 'Idioma', theme: 'Tema', lightTheme: 'Usar tema claro', darkTheme: 'Usar tema oscuro', skip: 'Saltar al contenido', loadingPage: 'Cargando página...',
    nav: { about: 'Cómo trabajamos', services: 'Qué construimos', insights: 'Ideas', contact: 'Contacto', open: 'Abrir menú de navegación', close: 'Cerrar menú de navegación', primary: 'Navegación principal', mobile: 'Navegación móvil', footer: 'Navegación del pie de página', home: 'Inicio de SmartCoderLabs' },
    hero: { eyebrow: 'Fábrica de productos de software', titleStart: 'Diseñamos,', titleAccent: 'construimos y operamos', titleEnd: 'las herramientas que impulsan tu trabajo.', summary: 'SmartCoderLabs diseña, construye y opera productos de software y capacidades de IA aplicada para equipos de todas las áreas.', primary: 'Construye con nosotros', secondary: 'Explorar ideas', disciplines: 'Lo que hacemos', tags: ['Productos de software', 'IA aplicada', 'Capacidad de equipos'], signal: 'Los productos se operan, no solo se entregan', signalBody: 'Desde el diseño del producto hasta su uso y evolución diaria.', signalLabel: 'Trabajo', capability: 'La capacidad crece con quienes la usan', capabilityBody: 'La IA aplicada y la capacitación práctica conectan áreas técnicas y de negocio.', capabilityLabel: 'Capacidad compartida' },
    about: { eyebrow: 'Nuestro modelo', title: 'Convertimos trabajo importante en productos y equipos capaces.', first: 'SmartCoderLabs es una fábrica de productos de software. Diseñamos, construimos y operamos productos y herramientas alrededor del trabajo que importa a tu organización.', second: 'Combinamos IA aplicada con capacitación práctica para que los equipos de ingeniería, producto, operaciones, administración y negocio puedan usar y mejorar juntos lo que construyen.', metrics: [['01', 'Diseñar productos con propósito'], ['02', 'Construir capacidades útiles'], ['03', 'Operarlas y evolucionarlas']], values: [['Pensamiento de producto', 'Herramientas definidas por las personas, decisiones y trabajo que apoyan.'], ['IA aplicada', 'Inteligencia útil integrada en productos y flujos de trabajo.'], ['Responsabilidad operativa', 'Productos preparados para el uso diario, el aprendizaje y la mejora.'], ['Capacidad compartida', 'Capacitación que conecta equipos técnicos y de negocio alrededor del trabajo.']] },
    services: { eyebrow: 'Productos y capacidades', title: 'Del problema importante al producto que tu equipo puede operar.', intro: 'Combinamos diseño de producto, construcción, operación, IA aplicada y capacitación para crear capacidades que siguen siendo útiles después del lanzamiento.', items: [['Productos y herramientas de software', 'Diseñamos y construimos productos que ayudan a los equipos a realizar trabajo importante con más claridad y control.', ['Descubrimiento y diseño de producto', 'Herramientas web e internas']], ['Capacidades de IA aplicada', 'Aplicamos IA a productos y flujos de trabajo cuando puede apoyar mejores decisiones y ejecución.', ['Flujos de trabajo con IA', 'Evaluación e integración']], ['Operación de productos', 'Operamos, observamos y mejoramos los productos y herramientas que los equipos usan cada día.', ['Entrega confiable', 'Mejora continua']], ['Capacitación de equipos', 'Capacitamos equipos de ingeniería, producto, operaciones, administración y negocio para usar, definir y mejorar capacidades digitales.', ['Aprendizaje práctico', 'Práctica transversal']], ['Fundamentos técnicos', 'Construimos las plataformas, datos e interfaces que hacen a los productos confiables y adaptables.', ['Diseño de datos y APIs', 'Seguridad y observabilidad']]], consultationEyebrow: 'Empieza por el trabajo', consultationTitle: '¿Qué debería poder hacer mejor tu equipo?', consultationBody: 'Cuéntanos sobre el trabajo, producto o herramienta que necesita diseñarse, construirse, operarse o fortalecerse con IA.', consultationAction: 'Iniciar una conversación de producto' },
    stack: { eyebrow: 'Cómo construimos y operamos', title: 'Tecnología al servicio de productos útiles y operables.', intro: 'Elegimos herramientas probadas que ayudan a los equipos a construir, operar, mejorar y asumir sus productos con confianza.', processLabel: 'Modelo de operación del producto', processTitle: 'Una ruta visible del trabajo a una capacidad duradera.', process: [['01 / Entender', 'Aclaramos el trabajo, las personas, las decisiones y las restricciones involucradas.'], ['02 / Construir', 'Diseñamos y entregamos juntos el producto, las herramientas y las capacidades de IA.'], ['03 / Operar', 'Acompañamos el uso, aprendemos de él y mejoramos el producto con el equipo.']], items: [['TypeScript', 'Código de aplicación seguro y expresivo'], ['React', 'Interfaces de producto accesibles'], ['PostgreSQL', 'Datos relacionales confiables'], ['Cloudflare', 'Entrega en el borde y servicios de plataforma'], ['GitHub Actions', 'Flujos de entrega repetibles'], ['Vitest', 'Feedback rápido mediante pruebas'], ['Seguridad', 'Defensa práctica en profundidad'], ['Git', 'Historial de colaboración claro']] },
    blog: { eyebrow: 'Ideas', title: 'Notas sobre construir, operar y mejorar productos.', intro: 'Escritura práctica sobre software, IA aplicada y los sistemas detrás del trabajo útil.', loading: 'Cargando ideas...', empty: 'No hay ideas disponibles en este momento.', read: 'Leer artículo' },
    contact: { eyebrow: 'Contacto', title: 'Construye una forma de trabajar más capaz.', intro: 'Cuéntanos sobre el producto, herramienta, capacidad de IA o habilidad de equipo que quieres fortalecer.', panelLabel: '01 / Empieza aquí', panelSummary: 'Una conversación enfocada es el primer paso hacia un producto que tu equipo puede asumir y mejorar.', availabilityTitle: 'Abiertos a conversaciones de producto', availabilityBody: 'Comparte el trabajo que necesita avanzar.', email: 'Correo', based: 'Ubicación', location: 'Risaralda, Colombia', social: 'Perfiles sociales', github: 'Abrir perfil de GitHub', linkedin: 'Abrir perfil de LinkedIn', x: 'Abrir perfil de X', youtube: 'Abrir canal de YouTube', formLabel: 'Tu contexto', formHint: 'Unos pocos detalles bastan para empezar.', name: 'Nombre completo', emailLabel: 'Correo electrónico', subject: '¿Qué te gustaría construir o fortalecer?', message: 'Cuéntanos sobre tu objetivo', actionNote: 'Usaremos tus datos únicamente para responder a esta consulta.', error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo.', successTitle: 'Mensaje recibido.', successBody: 'Gracias. Responderemos lo antes posible.', sending: 'Enviando...', send: 'Enviar mensaje', sendingIcon: 'Enviando' },
    article: { loading: 'Cargando artículo...', missing: 'No se especificó un artículo.', unavailable: 'No fue posible cargar este artículo.', notFound: 'Este artículo aún no está publicado. Publícalo o siémbralo en Supabase e inténtalo de nuevo.', eyebrow: 'Notas de producto y tecnología', read: 'de lectura', back: 'Volver a ideas' },
    footer: { built: 'Productos de software, IA aplicada y capacidad de equipos.', navigation: 'Explorar', rights: 'Todos los derechos reservados.' },
  },
} as const;

export type Locale = keyof typeof translations;
export type Translation = (typeof translations)[Locale];
const storageKey = 'smartcoder-locale';
const LanguageContext = createContext<{ locale: Locale; t: Translation; setLocale: (locale: Locale) => void }>({ locale: 'en', t: translations.en, setLocale: () => undefined });

function getStoredValue(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be disabled or denied in privacy-restricted contexts.
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => getStoredValue(storageKey) === 'es' ? 'es' : 'en');
  useEffect(() => { setStoredValue(storageKey, locale); document.documentElement.lang = locale; }, [locale]);
  return <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }

export type Theme = 'light' | 'dark';
const themeStorageKey = 'smartcoder-theme';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: 'dark', toggleTheme: () => undefined });

function getInitialTheme(): Theme {
  const savedTheme = getStoredValue(themeStorageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    setStoredValue(themeStorageKey, theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark') }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
