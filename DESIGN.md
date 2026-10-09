---
name: "SmartCoderLabs · Lima"
description: "Implemented visual system transferred from the user-selected Globant-inspired proposal."
colors:
  ink: "#111114"
  body: "#454547"
  white: "#fff"
  lime: "#c3d82e"
  mint: "#84e6b0"
  soft: "#f5f6f8"
  charcoal: "#101114"
  contact-green: "#101e16"
  focus-green: "#247a48"
  cta-start: "#d2e322"
  cta-end: "#8ac83e"
  cta-text: "#182004"
  line: "#d9dcda"
  field-border: "#85947e"
  form-error: "#9b2929"
typography:
  display:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "clamp(42px, 3.8vw, 56px)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  editorial-headline:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  intro:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 300
    lineHeight: 1.5
  button:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.3
  link:
    fontFamily: "Heebo, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  button: "6px"
  panel: "8px"
  hero-card: "16px"
  service-card: "24px"
  mobile-card: "20px"
  outline-button: "28px"
spacing:
  inline: "8px"
  related: "20px"
  card-gap: "28px"
  section-gap: "40px"
  desktop-gutter: "40px"
  mobile-gutter: "22px"
  section: "70px"
  section-large: "100px"
components:
  button-primary:
    textColor: "{colors.cta-text}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "10px 30px"
  button-primary-contact:
    textColor: "{colors.cta-text}"
    typography: "{typography.button}"
    rounded: "{rounded.service-card}"
    padding: "10px 30px"
  button-outline:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.outline-button}"
    padding: "9px 29px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  link-text:
    textColor: "{colors.ink}"
    typography: "{typography.link}"
  service-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.service-card}"
    padding: "38px 30px 28px"
  service-card-mobile:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.mobile-card}"
    padding: "26px"
  contact-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "45px 38px 30px"
  header:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.white}"
    height: "68px"
  contact-topic:
    textColor: "#4b5c3e"
    rounded: "20px"
    padding: "6px 10px"
  carousel-selector:
    width: "84px"
    padding: "20px 0"
  contact-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px"
  form-panel:
    backgroundColor: "{colors.soft}"
    rounded: "{rounded.panel}"
    padding: "32px"
---

# Design System: SmartCoderLabs · Lima

## Overview

**Creative North Star: "Globant reference, SmartCoderLabs content"**

The user selected the established Globant-inspired SmartCoderLabs proposal and its Lima palette for transfer into this landing app. Its visual authority is the supplied implementation in `../smartcoderlabs-design-pack/design/globant-inspired/`: black navigation, a predominantly white page, lime-to-off-white hero atmosphere, restrained imagery and generous split sections. Preserve that composition and visual language when extending this implementation.

The implemented system uses SmartCoderLabs branding, Spanish company copy, the original supplied WebP assets and local Heebo files. The palette is fixed Lima. Rounded editorial cards, conceptual engineering diagrams and a dark-green contact close carry the established world. The contact and article routes inherit this visual system through `src/styles/content.css`.

**Key Characteristics:**
- White editorial space framed by black navigation and a dark-green close.
- Lime/green atmospheric hero with three controlled slides.
- Heebo throughout, with regular-weight hero copy and bold section/card headings.
- Soft rounded service cards, narrow images and alternating explanatory sections.
- Conceptual illustrations with explicit project attribution.

## Colors

Lima combines lime and green accents with white editorial surfaces and charcoal framing. Frontmatter owns primitive values; the sidecar carries gradients, effects and display metadata.

### Primary

- **Lime:** brand arrow, selection, architecture emphasis and focus on dark regions.
- **CTA Start / CTA End / CTA Text:** gradient action background and dark foreground. The gradient is carried by component CSS in the sidecar.

### Secondary

- **Mint:** the closing contact rule.
- **Focus Green:** focus outlines on ordinary controls and fields.

### Neutral

- **Ink / Body:** headings and paragraph text.
- **White / Soft:** page, cards, principles band and contact-form panel.
- **Charcoal / Contact Green:** navigation, footer and closing section.
- **Line / Field Border:** article table borders and input edges.
- **Form Error:** existing form error text.

**The Supplied Authority Rule.** Keep the selected proposal and fixed Lima palette as the authority for this implementation.

## Typography

**Display Font:** Heebo, Arial, sans-serif.
**Body Font:** the same family, locally supplied at weights 300, 400, 500 and 700 with its SIL Open Font License.

Hero headings use regular weight. Repeated section and card headings are bold; section introductions use light weight. Frontmatter records the source's reusable desktop roles. Default paragraphs have a 72ch maximum, with explicit local exceptions. The header, conceptual illustrations, project captions and responsive headings retain their source-specific sizes.

**The Source Before Scale Rule.** Use the recorded type roles for readable content; miniature text inside decorative illustrations is not a reusable content scale.

Memory-diagram explanatory labels use the final 12px override. Decorative hero miniatures are excluded from the reusable hierarchy. Article headings use `clamp(34px,4vw,54px)` and long-form prose has line-height 1.75.

## Layout

Wide desktop content uses `min(1220px, calc(100% - 80px))`; editorial content uses `min(1070px, calc(100% - 100px))`. Alternating copy/visual pairs and three-column groups retain the supplied spacing. Repeated three-card grids use 28px gaps. Tone bands span the viewport. Section spacing ranges roughly from 58px to 100px.

The header is sticky and measures 68px on desktop, 64px at 1023px and below, and 62px at 767px and below. Desktop hero height is `min(740px, calc(100svh - 68px))` with a 650px minimum. The source fixes it to 660px at tablet, 775px at mobile and 805px at 390px and below. Hero overflow uses `clip` so focusing carousel controls does not scroll an internal clipped container.

### Responsive behavior

- At 1500px and above, enlarge decorative hero cards and adjust the copy/art balance.
- At 1199px and below, reduce gutters and gaps; hero headings become 46px.
- At 1023px and below, reduce header density and subordinate art; hero headings become 43px.
- At 767px and below, use 22px content gutters, stack cards/stories/contact and show an overlay navigation below the header. Hero headings become 36px. Preserve the 44px minimum button height and the supplied art placement.
- At 480px and below, stack memory nodes vertically.
- At 390px and below, refine hero text to 34px and narrow the art; the email becomes 16px.

The contact route uses a two-column information/form grid, then one column at 767px and below. Its two-column field grid also stacks there. Article content uses a 900px maximum with horizontal overflow contained in code and tables. Existing CSS includes an unenhanced navigation fallback; this record does not assert JavaScript-free rendering for the app runtime.

## Elevation & Depth

Pale gradients, white cards and soft shadows provide depth. Dark project and contact panels use tonal contrast. The sidecar records the exact ambient service, hero, delivery, photo and architecture shadow values.

**The Quiet Elevation Rule.** Use low-opacity soft shadows on light cards and tonal contrast on dark panels.

Feedback transitions last 0.2s. Hero copy and art entrances use the supplied easing; slow wash and card drift remain decorative. The conceptual voice illustration rests paused and moves on hover. Reduced motion disables animation and transitions; the controller respects explicit pause, focus, mouse hover, visibility and hero intersection for autoplay. These are implemented behaviors, not an accessibility certification.

## Shapes

Service and operating-model cards have generous corners, reduced on mobile. Utilitarian panels and diagrams use smaller rounding. The hero action has modest corners, outline actions use pill shapes and the closing primary action uses the rounder contact variant. Narrow images retain their local rounding. Tilted cards and organic gradient forms belong to illustrations. Architecture, process and topic-chip boundaries use fine lines. Icons are inline SVG.

## Components

### Primary and outline buttons

Primary actions use the lime-to-green gradient, dark bold text and the source hover gradient. Outline actions invert from transparent/ink to ink/white. Hover lifts actions slightly; reduced motion removes that transform. Focus uses a 3px green outline with 6px offset, switching to lime in designated dark regions.

### Text links

Bold labels pair with an SVG arrow. Hover underlines the label and moves the arrow. Portfolio links use external destinations; insight links use existing local blog routes. Preserve descriptive labels and destination semantics.

### Cards and editorial images

White service cards combine narrow conceptual imagery, title, body and bottom-aligned action. Operating-model cards replace imagery with organic green forms. Desktop groups use three columns and stack on mobile. Keep the original supplied WebP assets and their provenance.

### Navigation

The dark sticky band holds branding, section anchors, a project shortcut and an ES language label. The label is text; the capability chevron is a section anchor. The mobile menu reports expanded state, locks background scrolling, closes with Escape and cycles focus through its trigger and links. Root-relative section URLs allow the shared header to work from contact and article routes.

### Carousel

Three hero slides share the supplied atmosphere. Previous/next buttons and line selectors provide manual navigation, with `aria-pressed` selection, polite announcements and Arrow/Home/End handling. Autoplay schedules every 8.5 seconds under the source pause conditions. Reduced-motion preference cannot be overridden by the pause button. The sidecar selector sample documents appearance; the React hook owns behavior.

### Contact panel and topic chips

A white panel sits over the dark image-backed close. Topic chips are static labels. Email actions open the visitor's mail client. Clipboard feedback reports the actual outcome and the control is exposed only where the API and secure context support it. The footer links to the existing `/contacto` form.

### Contact-route fields

White fields use the source field border, modest rounding and 12px padding. Labels sit above controls. Textareas have a 160px minimum and vertical resize. Focus uses a 3px green outline with 3px offset. The form sits on Soft; existing error text uses Form Error. Preserve real validation/submission behavior and do not invent a success state.

## Do's and Don'ts

### Do:

- Do preserve the supplied composition, white page, dark framing, Lima palette, Heebo hierarchy and editorial spacing.
- Do retain the supplied assets, provenance and Heebo license.
- Do preserve visible focus, keyboard navigation, pause controls and reduced-motion behavior.
- Do retain Cesar Ruiz attribution and the actual contact address.

### Don't:

- Don't introduce a palette selector or unrelated visual world into this fixed-Lima implementation.
- Don't import Globant logos, proprietary imagery, customer claims or endorsements.
- Don't use decorative miniature text as a functional typography standard.
- Don't invent testimonials, business metrics, live status or successful form submissions.
