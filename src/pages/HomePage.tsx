import { useRef } from "react";
import { useLandingInteractions } from "../components/globant/useLandingInteractions";
import GlobantHero from "../components/globant/GlobantHero";
import GlobantIntro from "../components/globant/GlobantIntro";
import GlobantCapabilities from "../components/globant/GlobantCapabilities";
import GlobantCore from "../components/globant/GlobantCore";
import GlobantPrinciples from "../components/globant/GlobantPrinciples";
import GlobantProjects from "../components/globant/GlobantProjects";
import GlobantInsights from "../components/globant/GlobantInsights";
import GlobantContact from "../components/globant/GlobantContact";

import { useSeo } from '../lib/seo';

export default function HomePage() {
  useSeo({
    path: '/',
    title: 'Ingeniería de software e IA aplicada',
    description: 'Productos de software, backend e inteligencia artificial aplicada. Diseñamos, construimos y evolucionamos herramientas con tu equipo.',
    type: 'website',
    lang: 'es',
  });
  const ref = useRef<HTMLElement>(null);
  useLandingInteractions(ref);
  return (
    <main id="contenido" ref={ref}>
      <GlobantHero />
      <GlobantIntro />
      <GlobantCapabilities />
      <GlobantCore />
      <GlobantPrinciples />
      <GlobantProjects />
      <GlobantInsights />
      <GlobantContact />
    </main>
  );
}
