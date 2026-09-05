import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export const translations = {
  en: {
    language: 'Language', theme: 'Theme', lightTheme: 'Use light theme', darkTheme: 'Use dark theme', skip: 'Skip to content', loadingPage: 'Loading page...',
    nav: { about: 'How we work', services: 'What we build', insights: 'Insights', contact: 'Contact', open: 'Open navigation menu', close: 'Close navigation menu', primary: 'Primary navigation', mobile: 'Mobile navigation', footer: 'Footer navigation', home: 'SmartCoderLabs home' },
    seoTitle: '', hero: { eyebrow: 'Software product factory', titleStart: 'Design,', titleAccent: 'build, and operate', titleEnd: 'the tools that move work forward.', summary: 'SmartCoderLabs designs, builds, and operates software products and applied AI capabilities for teams across the business.', primary: 'Build with us', secondary: 'Explore insights', disciplines: 'What we do', tags: ['Software products', 'Applied AI', 'Team capability'], signal: 'Products are operated, not just delivered', signalBody: 'From product design to day-to-day use and evolution.', signalLabel: 'Work', capability: 'Capability grows with the people using it', capabilityBody: 'Applied AI and practical training connect technical and business teams.', capabilityLabel: 'Shared capability' },
    about: { title: 'We turn important work into capable products and teams.', first: 'SmartCoderLabs is a software product factory. We design, build, and operate products and tools around the work that matters to your organization.', second: 'We pair applied AI with practical enablement so engineering, product, operations, administration, and business teams can use and improve what they build together.', metrics: ['Design products with purpose', 'Build useful capabilities', 'Operate and evolve them'], values: [['Product thinking', 'Tools shaped around the people, decisions, and work they support.'], ['Applied AI', 'Useful intelligence embedded in products and workflows.'], ['Operational ownership', 'Products prepared for daily use, learning, and improvement.'], ['Shared capability', 'Training that connects technical and business teams around the work.']] },
    services: { title: 'From an important problem to a product your team can run.', intro: 'We combine product design, delivery, operations, applied AI, and training to create capabilities that stay useful after launch.', items: [['Software products and tools', 'We design and build products that help teams do important work with more clarity and control.', ['Product discovery and design', 'Web and internal tools']], ['Applied AI capabilities', 'We apply AI to products and workflows where it can support better decisions and execution.', ['AI-enabled workflows', 'Evaluation and integration']], ['Product operations', 'We operate, observe, and improve the products and tools that teams rely on every day.', ['Reliable delivery', 'Continuous improvement']], ['Team enablement', 'We train engineering, product, operations, administration, and business teams to use, shape, and improve digital capabilities.', ['Hands-on learning', 'Cross-functional practice']], ['Technical foundations', 'We build the platforms, data, and interfaces that make products dependable and adaptable.', ['Data and API design', 'Security and observability']]] },
    stack: { title: 'Technology in service of useful, operable products.', intro: 'We choose proven tools that help teams build, operate, improve, and own their products with confidence.', processTitle: 'A visible path from work to lasting capability.', process: [['Understand', 'Clarify the work, people, decisions, and constraints involved.'], ['Build', 'Design and deliver the product, tools, and AI capabilities together.'], ['Operate', 'Support use, learn from it, and improve the product with the team.']] },
    blog: { title: 'Notes from building, operating, and improving products.', intro: 'Practical writing on software, applied AI, and the systems behind useful work.', loading: 'Loading insights...', empty: 'No insights are published yet.', viewAll: 'View all articles', indexTitle: 'Insights', indexIntro: 'Practical writing on software, applied AI, and the systems behind useful work.', error: 'We could not load insights right now.', retry: 'Try again', read: 'Read article' },
    contact: { title: 'Build a more capable way of working.', intro: 'Tell us about the product, tool, AI capability, or team skill you want to strengthen.', panelSummary: 'A focused conversation is the first step toward a product your team can own and improve.', availabilityTitle: 'Open for product conversations', availabilityBody: 'Share the work that needs to move forward.', email: 'Email', based: 'Based in', location: 'Risaralda, Colombia', social: 'Social profiles', github: 'Open GitHub profile', linkedin: 'Open LinkedIn profile', x: 'Open X profile', youtube: 'Open YouTube channel', formLabel: 'Your brief', formHint: 'A few details are enough to start.', name: 'Full name', emailLabel: 'Email address', subject: 'What would you like to build or strengthen?', message: 'Tell us about your goal', actionNote: 'We will use your details only to respond to this inquiry.', error: 'We could not send your message. Please try again.', successTitle: 'Message received.', successBody: 'Thank you. We will reply as soon as possible.', sending: 'Sending...', send: 'Send message', sendingIcon: 'Sending' },
    article: { loading: 'Loading article...', missing: 'No article was specified.', unavailable: 'This article could not be loaded.', notFound: 'This article does not exist or is no longer published.', read: 'read', back: 'Back to insights' },
    notFound: { title: 'This page does not exist.', body: 'The link may be out of date, or the page may have moved.', action: 'Go to the homepage' },
    footer: { built: 'Software products, applied AI, and team capability.', navigation: 'Explore', rights: 'All rights reserved.' },
  },
  es: {
    language: 'Idioma', theme: 'Tema', lightTheme: 'Usar tema claro', darkTheme: 'Usar tema oscuro', skip: 'Saltar al contenido', loadingPage: 'Cargando página...',
    nav: { about: 'Cómo trabajamos', services: 'Qué construimos', insights: 'Ideas', contact: 'Contacto', open: 'Abrir menú de navegación', close: 'Cerrar menú de navegación', primary: 'Navegación principal', mobile: 'Navegación móvil', footer: 'Navegación del pie de página', home: 'Inicio de SmartCoderLabs' },
    seoTitle: 'Productos de software, IA aplicada y capacidad de equipos', hero: { eyebrow: 'Fábrica de productos de software', titleStart: 'Diseñamos,', titleAccent: 'construimos y operamos', titleEnd: 'las herramientas que impulsan tu trabajo.', summary: 'SmartCoderLabs diseña, construye y opera productos de software y capacidades de IA aplicada para equipos de todas las áreas.', primary: 'Construye con nosotros', secondary: 'Explorar ideas', disciplines: 'Lo que hacemos', tags: ['Productos de software', 'IA aplicada', 'Capacidad de equipos'], signal: 'Los productos se operan, no solo se entregan', signalBody: 'Desde el diseño del producto hasta su uso y evolución diaria.', signalLabel: 'Trabajo', capability: 'La capacidad crece con quienes la usan', capabilityBody: 'La IA aplicada y la capacitación práctica conectan áreas técnicas y de negocio.', capabilityLabel: 'Capacidad compartida' },
    about: { title: 'Convertimos trabajo importante en productos y equipos capaces.', first: 'SmartCoderLabs es una fábrica de productos de software. Diseñamos, construimos y operamos productos y herramientas alrededor del trabajo que importa a tu organización.', second: 'Combinamos IA aplicada con capacitación práctica para que los equipos de ingeniería, producto, operaciones, administración y negocio puedan usar y mejorar juntos lo que construyen.', metrics: ['Diseñar productos con propósito', 'Construir capacidades útiles', 'Operarlas y evolucionarlas'], values: [['Pensamiento de producto', 'Herramientas definidas por las personas, decisiones y trabajo que apoyan.'], ['IA aplicada', 'Inteligencia útil integrada en productos y flujos de trabajo.'], ['Responsabilidad operativa', 'Productos preparados para el uso diario, el aprendizaje y la mejora.'], ['Capacidad compartida', 'Capacitación que conecta equipos técnicos y de negocio alrededor del trabajo.']] },
    services: { title: 'Del problema importante al producto que tu equipo puede operar.', intro: 'Combinamos diseño de producto, construcción, operación, IA aplicada y capacitación para crear capacidades que siguen siendo útiles después del lanzamiento.', items: [['Productos y herramientas de software', 'Diseñamos y construimos productos que ayudan a los equipos a realizar trabajo importante con más claridad y control.', ['Descubrimiento y diseño de producto', 'Herramientas web e internas']], ['Capacidades de IA aplicada', 'Aplicamos IA a productos y flujos de trabajo cuando puede apoyar mejores decisiones y ejecución.', ['Flujos de trabajo con IA', 'Evaluación e integración']], ['Operación de productos', 'Operamos, observamos y mejoramos los productos y herramientas que los equipos usan cada día.', ['Entrega confiable', 'Mejora continua']], ['Capacitación de equipos', 'Capacitamos equipos de ingeniería, producto, operaciones, administración y negocio para usar, definir y mejorar capacidades digitales.', ['Aprendizaje práctico', 'Práctica transversal']], ['Fundamentos técnicos', 'Construimos las plataformas, datos e interfaces que hacen a los productos confiables y adaptables.', ['Diseño de datos y APIs', 'Seguridad y observabilidad']]] },
    stack: { title: 'Tecnología al servicio de productos útiles y operables.', intro: 'Elegimos herramientas probadas que ayudan a los equipos a construir, operar, mejorar y asumir sus productos con confianza.', processTitle: 'Una ruta visible del trabajo a una capacidad duradera.', process: [['Entender', 'Aclaramos el trabajo, las personas, las decisiones y las restricciones involucradas.'], ['Construir', 'Diseñamos y entregamos juntos el producto, las herramientas y las capacidades de IA.'], ['Operar', 'Acompañamos el uso, aprendemos de él y mejoramos el producto con el equipo.']] },
    blog: { title: 'Notas sobre construir, operar y mejorar productos.', intro: 'Escritura práctica sobre software, IA aplicada y los sistemas detrás del trabajo útil.', loading: 'Cargando ideas...', empty: 'Aún no hay ideas publicadas.', viewAll: 'Ver todos los artículos', indexTitle: 'Ideas', indexIntro: 'Escritura práctica sobre software, IA aplicada y los sistemas detrás del trabajo útil.', error: 'No pudimos cargar las ideas en este momento.', retry: 'Reintentar', read: 'Leer artículo' },
    contact: { title: 'Construye una forma de trabajar más capaz.', intro: 'Cuéntanos sobre el producto, herramienta, capacidad de IA o habilidad de equipo que quieres fortalecer.', panelSummary: 'Una conversación enfocada es el primer paso hacia un producto que tu equipo puede asumir y mejorar.', availabilityTitle: 'Abiertos a conversaciones de producto', availabilityBody: 'Comparte el trabajo que necesita avanzar.', email: 'Correo', based: 'Ubicación', location: 'Risaralda, Colombia', social: 'Perfiles sociales', github: 'Abrir perfil de GitHub', linkedin: 'Abrir perfil de LinkedIn', x: 'Abrir perfil de X', youtube: 'Abrir canal de YouTube', formLabel: 'Tu contexto', formHint: 'Unos pocos detalles bastan para empezar.', name: 'Nombre completo', emailLabel: 'Correo electrónico', subject: '¿Qué te gustaría construir o fortalecer?', message: 'Cuéntanos sobre tu objetivo', actionNote: 'Usaremos tus datos únicamente para responder a esta consulta.', error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo.', successTitle: 'Mensaje recibido.', successBody: 'Gracias. Responderemos lo antes posible.', sending: 'Enviando...', send: 'Enviar mensaje', sendingIcon: 'Enviando' },
    article: { loading: 'Cargando artículo...', missing: 'No se especificó un artículo.', unavailable: 'No fue posible cargar este artículo.', notFound: 'Este artículo no existe o ya no está publicado.', read: 'de lectura', back: 'Volver a ideas' },
    notFound: { title: 'Esta página no existe.', body: 'El enlace puede estar desactualizado o la página pudo haberse movido.', action: 'Ir al inicio' },
    footer: { built: 'Productos de software, IA aplicada y capacidad de equipos.', navigation: 'Explorar', rights: 'Todos los derechos reservados.' },
  },
} as const;

export type Locale = keyof typeof translations;
export type Translation = (typeof translations)[Locale];
const storageKey = 'smartcoder-locale';

/**
 * English is served without a prefix so every URL that already exists keeps
 * working; Spanish lives under /es. The URL is what search engines read, so it
 * is the source of truth for the active locale, not storage.
 */
export const localePrefix: Record<Locale, string> = { en: '', es: '/es' };

export function localeFromPath(pathname: string): Locale {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

/** Strip the locale prefix, returning a path that always starts with "/". */
export function pathWithoutLocale(pathname: string): string {
  if (pathname === '/es') return '/';
  if (pathname.startsWith('/es/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

/** Build the equivalent URL for a locale, e.g. ("es", "/#about") -> "/es/#about". */
export function localeHref(locale: Locale, path = '/'): string {
  const [rawPath, hash] = path.split('#');
  const base = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const prefixed = `${localePrefix[locale]}${base === '/' ? '/' : base}`.replace(/\/$/, '') || '/';
  return hash ? `${prefixed}#${hash}` : prefixed;
}
const LanguageContext = createContext<{ locale: Locale; t: Translation; setLocale: (locale: Locale) => void }>({ locale: 'en', t: translations.en, setLocale: () => undefined });

function getStoredValue(key: string) {
  try {
    if (typeof window === 'undefined') return null;
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

export function LanguageProvider({ children, locale: routeLocale }: { children: ReactNode; locale?: Locale }) {
  // Controlled by the route when a locale is supplied; otherwise it falls back to
  // the stored preference so the provider still works outside a router.
  const [storedLocale, setLocale] = useState<Locale>(() => getStoredValue(storageKey) === 'es' ? 'es' : 'en');
  const locale = routeLocale ?? storedLocale;
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
  if (typeof window === 'undefined') return 'dark';
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
