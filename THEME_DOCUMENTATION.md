# Theme Documentation

## Design System: McKinsey Consulting Style

This document outlines the comprehensive design system for marsala.dev, following McKinsey's professional, corporate aesthetic with clean lines, minimal decoration, and authoritative typography.

---

## 1. Design Philosophy

### Core Principles

**Professional Corporate Aesthetic**
- Clean white/light backgrounds with deep blue accents
- Sharp, rectangular elements (minimal to no border radius)
- Authoritative serif typography for headings
- Generous white space and clean grid layouts

**Minimal & Purposeful**
- No gradients, no glows, no shimmer effects
- Simple hover states (color changes, underlines)
- Focus on content and readability
- Professional, trust-building design

**Design Inspiration**
- [McKinsey's Visual Identity](https://www.mckinsey.com/about-us/new-at-mckinsey-blog/meet-the-new-mckinsey-look)
- [McKinsey Website Design Analysis](https://tsavoneal.com/mckinsey-website-design/)

---

## 2. Color Palette

### McKinsey Deep Blue (Primary)

The foundation of our color system - professional and authoritative.

```css
--mckinsey-blue: #051c2c;    /* Primary - headers, buttons */
--mckinsey-navy: #0a3161;    /* Secondary accent */
--mckinsey-light: #2251ff;   /* Links, CTAs */
--mckinsey-muted: #5a7184;   /* Muted text */
```

**Usage:**
- `#051c2c`: Primary buttons, headings, footer background
- `#0a3161`: Secondary elements, hover states
- `#2251ff`: Links and call-to-action accents

### Slate (Text & UI)

```css
--slate-50: #f8fafc;   /* Light backgrounds */
--slate-100: #f1f5f9;  /* Alternate sections */
--slate-200: #e2e8f0;  /* Borders */
--slate-500: #64748b;  /* Muted text */
--slate-600: #475569;  /* Body text */
--slate-900: #0f172a;  /* Dark text */
```

### Surface Colors

- **White** (`#ffffff`): Primary backgrounds
- **Slate-50** (`#f8fafc`): Alternate sections
- **Slate-200** (`#e2e8f0`): Borders and dividers

---

## 3. Typography

### Font Stack

```css
/* Headings - Serif for authority (Playfair Display) */
font-heading: 'Playfair Display', Georgia, serif;

/* Body - Clean sans-serif (Inter) */
font-sans: 'Inter', system-ui, sans-serif;

/* Code - Monospace */
font-mono: 'Roboto Mono', monospace;
```

### Heading Styles

```css
h1 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.1;
  color: #051c2c;
}

h2 {
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: -0.03em;
}

/* Body text */
p {
  font-family: var(--font-sans);
  line-height: 1.7;
  color: #475569;
}
```

### Responsive Heading Sizes

```html
<!-- H1: Hero headlines -->
<h1 class="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#051c2c]">

<!-- H2: Section headers -->
<h2 class="font-heading text-3xl sm:text-4xl font-bold text-[#051c2c]">

<!-- H3: Card titles -->
<h3 class="font-heading text-xl font-semibold text-[#051c2c]">
```

---

## 4. Components

### Buttons

**Primary Button (McKinsey Style)**
```html
<button class="btn-mckinsey">
  Get Started
</button>

<!-- Or with Tailwind -->
<button class="inline-flex items-center justify-center px-6 py-3
               bg-[#051c2c] text-white font-semibold rounded-sm
               transition-all duration-200 hover:bg-[#0a2d45]">
  Get Started
</button>
```

**Secondary Button (Outline)**
```html
<button class="btn-mckinsey-outline">
  Learn More
</button>

<!-- Or with Tailwind -->
<button class="inline-flex items-center justify-center px-6 py-3
               bg-white border-2 border-[#051c2c] text-[#051c2c]
               font-semibold rounded-sm transition-all duration-200
               hover:bg-slate-50">
  Learn More
</button>
```

### Cards

**Professional Card**
```html
<div class="card-premium">
  <h3>Card Title</h3>
  <p>Card content here.</p>
</div>

<!-- Or with Tailwind -->
<div class="bg-white border border-slate-200 rounded-sm p-6
            transition-all duration-200 hover:border-[#051c2c]
            hover:shadow-lg">
  <h3 class="font-heading text-xl font-semibold text-[#051c2c]">
    Card Title
  </h3>
  <p class="mt-2 text-slate-600">Card content here.</p>
</div>
```

### Navbar

```html
<header class="fixed top-0 w-full bg-white border-b border-slate-200 shadow-sm">
  <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="text-xl font-bold text-[#051c2c]">Marsala</a>

    <!-- Navigation Links -->
    <ul class="flex items-center gap-8">
      <li>
        <a href="/modules" class="text-sm font-medium text-slate-600
                                   hover:text-[#051c2c] transition-colors">
          Modules
        </a>
      </li>
    </ul>

    <!-- CTA -->
    <a href="/contact" class="px-6 py-2.5 bg-[#051c2c] text-white
                               font-semibold rounded-sm hover:bg-[#0a2d45]">
      Contact
    </a>
  </nav>
</header>
```

### Footer

```html
<footer class="bg-[#051c2c] text-white">
  <div class="max-w-7xl mx-auto px-8 py-16">
    <!-- Status Bar -->
    <div class="flex items-center gap-4 pb-8 border-b border-white/20">
      <div class="w-3 h-3 bg-emerald-400 rounded-sm"></div>
      <span class="text-sm font-medium">All Systems Operational</span>
    </div>

    <!-- Links Grid -->
    <div class="grid grid-cols-4 gap-8 py-12">
      <!-- Link columns -->
    </div>

    <!-- Copyright -->
    <div class="pt-8 border-t border-white/20 text-sm text-white/60">
      © 2025 Marsala.dev
    </div>
  </div>
</footer>
```

---

## 5. Border Radius

**McKinsey Style: Sharp, Professional Corners**

```css
/* Use rounded-sm (2px) maximum for all elements */
.card { border-radius: 0.125rem; }      /* rounded-sm */
.button { border-radius: 0.125rem; }    /* rounded-sm */
.badge { border-radius: 0.125rem; }     /* rounded-sm */
.icon-container { border-radius: 0; }   /* rounded-none */

/* NEVER use: */
/* rounded-full, rounded-3xl, rounded-2xl, rounded-xl, rounded-lg */
```

---

## 6. Shadows

**Minimal, Subtle Shadows**

```css
/* Default card shadow */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

/* Hover shadow */
box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);

/* NO glow effects, NO colored shadows */
```

---

## 7. Hover States

**Keep it Simple**

```css
/* Buttons */
.btn:hover {
  background-color: #0a2d45;  /* Slightly lighter */
}

/* Cards */
.card:hover {
  border-color: #051c2c;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
}

/* Links */
a:hover {
  color: #051c2c;
  text-decoration: underline;
}

/* Navigation */
.nav-link:hover {
  color: #051c2c;
}
.nav-link::after {
  /* Simple underline animation */
  background: #051c2c;
  transform: scaleX(1);
}
```

---

## 8. Layout Patterns

### Hero Section

```html
<section class="bg-white py-20 lg:py-32">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-[1.3fr,1fr] gap-12 lg:gap-20">
      <!-- Left: Content -->
      <div>
        <div class="inline-flex items-center gap-2 px-4 py-2
                    bg-slate-50 border border-slate-300 rounded-sm mb-8">
          <div class="w-2 h-2 bg-[#051c2c] rounded-sm"></div>
          <span class="text-xs font-semibold uppercase tracking-widest
                       text-[#051c2c]">
            Now Available
          </span>
        </div>

        <h1 class="font-heading text-5xl lg:text-7xl font-bold
                   tracking-tight text-[#051c2c]">
          Intelligent Growth Studio
        </h1>

        <p class="mt-8 text-lg text-slate-600 max-w-xl">
          Description text here.
        </p>

        <div class="mt-12 flex gap-4">
          <a href="#" class="btn-mckinsey">Primary CTA</a>
          <a href="#" class="btn-mckinsey-outline">Secondary CTA</a>
        </div>
      </div>

      <!-- Right: Metrics -->
      <div class="grid gap-6">
        <!-- Metric cards -->
      </div>
    </div>
  </div>
</section>
```

### Metric Card

```html
<div class="bg-white border border-slate-200 rounded-sm p-8
            transition-all duration-200 hover:border-[#051c2c]
            hover:shadow-lg">
  <div class="text-center">
    <div class="mx-auto mb-5 w-16 h-16 flex items-center justify-center
                bg-[#051c2c] rounded-sm">
      <svg class="w-9 h-9 text-white"><!-- Icon --></svg>
    </div>
    <p class="text-5xl font-bold text-[#051c2c]">10×</p>
    <p class="mt-3 text-xs font-semibold uppercase tracking-widest
              text-slate-500">
      Faster Launch
    </p>
  </div>
</div>
```

---

## 9. What NOT to Do

### Avoid These Patterns:

```html
<!-- NO gradient backgrounds -->
<div class="bg-gradient-to-r from-purple-500 to-blue-500">

<!-- NO gradient text -->
<h1 class="bg-gradient-to-r ... bg-clip-text text-transparent">

<!-- NO rounded corners -->
<button class="rounded-full">
<div class="rounded-3xl">

<!-- NO glassmorphism -->
<div class="backdrop-blur-xl bg-white/10">

<!-- NO glows or shimmer -->
<div class="shadow-glow animate-shimmer">

<!-- NO animated backgrounds -->
<div class="animate-gradient-shift">
```

---

## 10. Implementation Checklist

When building new components:

- [ ] Use `bg-white` or `bg-slate-50` for backgrounds
- [ ] Use `text-[#051c2c]` for headings
- [ ] Use `text-slate-600` for body text
- [ ] Use `rounded-sm` for any border radius (never more)
- [ ] Use `border border-slate-200` for card borders
- [ ] Use solid colors for buttons (no gradients)
- [ ] Use `font-heading` for h1/h2 elements
- [ ] Keep hover states simple (color changes only)
- [ ] No blur effects, no glows, no shimmer
- [ ] Generous spacing with `py-20` or `py-32` for sections

---

## 11. CSS Custom Properties

Add to your globals.css:

```css
:root {
  --mckinsey-blue: #051c2c;
  --mckinsey-navy: #0a3161;
  --mckinsey-light: #2251ff;
  --mckinsey-hover: #0a2d45;
}
```

---

## 12. Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

*Last updated: December 2024*
*Design System Version: 2.0 (McKinsey Style)*
