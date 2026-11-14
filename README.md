# CyberAnexa Landing Page

One-page landing page for **CyberAnexa** ([live website](https://cyber-anexa.vercel.app/)), built with Next.js 16, React 19 and Tailwind CSS 3. It follows the same project structure as the Surevia landing page: every piece of text, image and link lives in `data/templates.json`, and the components only render it.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx            fonts, metadata, header, footer, scroll reveal
  page.tsx              the sections in page order
  globals.css           theme colours (CSS variables)
components/
  common/               Header (floating glass bar, mobile dropdown), Footer
  sections/             Hero, About, Services, Why, Projects, Team (carousel),
                        Testimonials (slider), Contact (+ quote form)
  ui/                   Icon, SectionHeading, ScrollReveal, FormSuccess,
                        useDummySubmit, buttonStyles
data/templates.json     all content (sections and their variants)
types/templates.types.ts
public/images/          CyberAnexa photos, logos and favicon
```

Each section's `id` in `templates.json` matches a header link (`#about` → `id="about"`).

## Responsive

Designed for phones, tablets, 1024px and desktop. From 1024px up the root font size follows the 1440px design (`1rem = 100vw / 90`, at most 16px), so the desktop layout scales down evenly. The service cards and the team become swipeable rows on phones.

## Forms

The contact section's quote form uses a dummy submit (`useDummySubmit`): it shows a sending state and a thank-you message, but nothing is sent anywhere yet.
