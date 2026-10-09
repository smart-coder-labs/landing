# SmartCoderLabs landing

## Surface contract

**Visitor mode:** Persuade.

**Authority:** The user explicitly selected the existing Globant-inspired proposal from `../smartcoderlabs-design-pack/design/globant-inspired/`, fixed to Lima, for the `landing` app. This is transfer of the supplied visual world. DESIGN.md captures its implemented reusable system.

**Visitor job:** Understand the supplied software-product, backend/data and applied-AI offer, inspect the approach and attributed projects, then start a conversation. This job follows the supplied copy; no additional audience segment or conversion target has been established.

## Narrative and sequence

Retain the original eight sections in order:

1. Three-slide hero: software/AI, product/people and architecture.
2. Introduction: idea through operation and evolution.
3. Capabilities: software products, backend/APIs/data and AI.
4. Operating model: build, operate and evolve.
5. Principles: context, explicit limits, evaluation and shared knowledge.
6. Projects: NexusMind and J.A.R.V.I.S., presented as architecture examples without personal name mentions, as requested by the user.
7. Ideas: three articles at the existing blog routes.
8. Contact: a direct email conversation with static topic labels.

Keep the supplied header, footer, conceptual visuals, Spanish copy and image assets. The primary destination is contact; intermediate actions expose capabilities, project context and articles. The footer also exposes the retained contact form.

## Implementation boundaries

Source: `src/components/globant/`, `src/styles/globant.css` and route styling in `src/styles/content.css`. Local Heebo weights 300/400/500/700 and original supplied WebP assets retain their license and provenance material.

The Lima palette selector is omitted because the user fixed the palette. Proposal-review destinations are replaced with project/contact destinations and the footer has production copyright. Existing `/contacto` and blog routes remain. Legacy hashes map `about` to `enfoque`, `services` to `capacidades`, `blog` to `ideas`, `contact` to `contacto` and `stack` to `proyectos`.

The original visual CSS is retained with the targeted hero `overflow: clip` correction that prevents focus from scrolling a clipped internal container. Explicit spaces around the contact heading's JSX breaks preserve word separation when a mobile break is hidden. No new visual concept is introduced.

## Evidence and current review state

Browser captures are recorded under `.impeccable/review/` at desktop 1440×900, mobile 390×844 and the user's 1680×877 viewport. Captures include all major sections and additional mobile hero/contact views. Image and copy corrections were recaptured. Reference captures, scoped comparison output and difference images are present. The comparison excludes contact/footer and the reference palette inspector; it is not a whole-page identity claim.

Final independent reviewer disposition is **SHIP** for the visual implementation, recorded in `.impeccable/review/finish-review.txt`. No unresolved material visual findings remain at the reviewed desktop, mobile and user viewport sizes. This is visual signoff, not production deployment approval or accessibility certification. Review artifacts, rather than prior design-pack statements about blocked browser verification, are the current evidence.

The existing 17 tests passed in the full run (`tests.txt`). That run also exposed an overly broad new assertion that counted unrelated jsdom timers; the assertion was narrowed to the actual owned 8500ms carousel timers and confirmed their cleanup. All three new interaction tests then passed in the targeted rerun (`interaction-tests.txt`). Strict TypeScript checking passed for the new components. The production artifact build passed using the local Vite configuration (`build.txt`). These interaction results completed after the visual reviewer signed off.

A temporary local runtime with public dependencies supported verification because installation of private configuration packages returned HTTP 401. Production configuration files were retained; the standard private configuration build remains unverified. No live Supabase network submissions were performed. The local artifact build and visual signoff do not establish production deployment readiness or live contact-service delivery.
