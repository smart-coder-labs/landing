/* global console, process, setTimeout */
/*
 * Write a static HTML file for every route, so search engines and social
 * scrapers receive the real content instead of an empty <div id="root">.
 *
 * Runs as part of `npm run build`. It renders with react-dom/server, so it needs
 * no headless browser and no extra dependency. The client bundle still hydrates
 * normally; this only changes what the first response contains.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const rootContainer = '<div id="root"></div>';

/*
 * The homepage is written back to dist/index.html, so a second run would
 * otherwise consume its own output. The pristine shell is cached outside dist
 * (it must not ship) and the fresh one always wins, because a stale shell would
 * reference the previous build's hashed assets.
 */
const shellCache = resolve(projectRoot, 'dist-ssg/shell.html');
const emitted = await readFile(resolve(distDir, 'index.html'), 'utf8').catch(() => {
  throw new Error('dist/index.html not found. Run the client build before prerendering.');
});
let template;
if (emitted.includes(rootContainer)) {
  template = emitted;
  await writeFile(shellCache, template, 'utf8');
} else {
  template = await readFile(shellCache, 'utf8').catch(() => {
    throw new Error('dist/index.html is already prerendered and no cached shell was found. Re-run the client build.');
  });
  if (!template.includes(rootContainer)) throw new Error('Cached shell has no empty root container.');
}

const { render, routes } = await import(resolve(projectRoot, 'dist-ssg/entry-ssg.mjs')).catch((error) => {
  throw new Error(`Unable to load dist-ssg/entry-ssg.mjs: ${error.message}`);
});

const tick = () => new Promise((done) => setTimeout(done, 0));
const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Route components are code-split with React.lazy, and the first server render
 * of a lazy chunk only produces the Suspense fallback. Render until the markup
 * stops being a fallback so no route silently ships empty.
 */
async function renderSettled(route) {
  let result = { html: '', head: null };
  for (let attempt = 0; attempt < 5; attempt += 1) {
    result = render(route);
    if (!/Loading page\.\.\./.test(result.html)) return result;
    await tick();
  }
  return result;
}

const escapeAttr = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/**
 * The head is resolved by the same code the browser uses, then written into the
 * static HTML. Skipping this would bake the homepage title and canonical into
 * every route, which tells search engines each page is a duplicate.
 */
function applyHead(html, head) {
  if (!head) return html;
  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeText(head.title)}</title>`],
    [/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeAttr(head.description)}" />`],
    [/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(head.canonical)}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(head.title)}" />`],
    [/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeAttr(head.description)}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(head.canonical)}" />`],
    [/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${escapeAttr(head.type)}" />`],
    [/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${escapeAttr(head.image)}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`],
    [/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${escapeAttr(head.image)}" />`],
  ];
  let output = html;
  for (const [pattern, replacement] of swaps) {
    if (!pattern.test(output)) throw new Error(`Prerender could not place ${replacement.slice(0, 48)}...; the template changed.`);
    output = output.replace(pattern, replacement);
  }

  const extras = [`<meta name="robots" content="${escapeAttr(head.robots)}" />`];
  for (const { hreflang, href } of head.alternates) {
    extras.push(`<link rel="alternate" hreflang="${escapeAttr(hreflang)}" href="${escapeAttr(href)}" />`);
  }
  if (head.structuredData) {
    extras.push(`<script type="application/ld+json">${JSON.stringify(head.structuredData).replace(/</g, '\\u003c')}</script>`);
  }
  output = output.replace('</head>', `    ${extras.join('\n    ')}\n  </head>`);
  if (head.lang) output = output.replace(/<html lang="[^"]*"/, `<html lang="${escapeAttr(head.lang)}"`);
  return output;
}

const minWords = { page: 200, article: 500 };
const written = [];
const problems = [];

for (const route of routes()) {
  const { html: markup, head } = await renderSettled(route);
  const html = applyHead(template.replace(rootContainer, `<div id="root">${markup}</div>`), head);
  const target = route === '/' ? resolve(distDir, 'index.html') : resolve(distDir, `.${route}/index.html`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');

  const words = textOf(html).split(' ').length;
  const isArticle = route.includes('/blog/');
  if (words < minWords[isArticle ? 'article' : 'page']) problems.push(`${route} only rendered ${words} words`);
  if (isArticle && !/<h1[^>]*>/.test(markup)) problems.push(`${route} rendered no <h1>`);
  written.push({ route, words });
}

for (const { route, words } of written) console.log(`  ${route.padEnd(38)} ${String(words).padStart(5)} words`);

if (problems.length) {
  console.error(`\nPrerender produced incomplete pages:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nPrerendered ${written.length} routes; the shell alone carried ${textOf(template).split(' ').length} words.`);
