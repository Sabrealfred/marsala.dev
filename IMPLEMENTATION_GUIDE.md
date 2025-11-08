# Marsala.dev Implementation Guide

## ✅ Implementación Completada

### 1. Sistema de Formularios Funcionales

#### Features Implementadas:
- ✅ Formulario de contacto funcional en `/contact`
- ✅ Página de waitlist completa en `/waitlist`
- ✅ API routes para envío de emails
- ✅ Tracking automático de entry points
- ✅ Validación de emails
- ✅ Estados de loading y error
- ✅ Emails HTML profesionales

#### Archivos Creados:
```
app/
├── api/
│   ├── contact/route.ts          # API para formulario de contacto
│   └── waitlist/route.ts         # API para waitlist
├── contact/page.tsx              # Formulario de contacto (actualizado)
└── waitlist/page.tsx             # Nueva página de waitlist
```

---

## 🚀 Setup Rápido

### Paso 1: Instalar Dependencias

Ya instaladas:
```bash
npm install resend @react-email/components
```

### Paso 2: Configurar Variables de Entorno

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env.local
```

2. Obtén tu API key de Resend:
   - Ve a https://resend.com
   - Crea una cuenta (gratis: 100 emails/día)
   - Copia tu API key desde el dashboard
   - Pégala en `.env.local`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

3. **IMPORTANTE:** Verifica tu dominio en Resend
   - Ve a https://resend.com/domains
   - Agrega `marsala.dev`
   - Agrega los DNS records que te dan
   - Espera verificación (5-30 min)

   **Alternativa temporal:** Usa el dominio de prueba `onboarding@resend.dev` para testing

### Paso 3: Probar Localmente

```bash
npm run dev
```

Visita:
- http://localhost:3000/contact
- http://localhost:3000/waitlist

Prueba enviando un formulario. Deberías recibir un email en `sales@marsala.dev`.

---

## 📧 Cómo Funciona el Sistema de Emails

### Entry Point Tracking

Cada formulario detecta automáticamente desde dónde llegó el usuario:

```javascript
// Ejemplos de entry points:
"Home"                    // Vino de la página principal
"research"                // Vino de /research
"modules"                 // Vino de /modules
"Direct"                  // Entró directo a /contact
"External: google.com"    // Vino de Google
```

Este dato se envía en el email bajo **"Entry Point"**.

### Formato de Email

Los emails llegan a `sales@marsala.dev` con:
- ✅ Header profesional con gradiente de marca
- ✅ Entry point destacado como badge
- ✅ Todos los campos del formulario
- ✅ Diseño responsive
- ✅ Versión texto plano (para clients que no soportan HTML)

---

## 📝 Posts de Blog en MDX

### Posts Creados (17 en total):

**Inventario completo:**

1. `modular-marketing-stack-guide.mdx` — Stack modular 2025 (Guide, 8 min).
2. `automate-conversion-funnel-n8n.mdx` — Automatización de funnel con n8n (Tutorial, 12 min).
3. `spreadsheets-to-dashboards.mdx` — Dashboards en tiempo real (Case Study, 10 min).
4. `why-headless-architecture.mdx` — Migrar a headless (Insight, 7 min).
5. `reduce-cac-data-activation.mdx` — Data activation para bajar CAC (Playbook, 11 min).
6. `ai-lead-qualification-copilot.mdx` — Copilot de calificación con LLMs.
7. `attio-migration-playbook.mdx` — Migración HubSpot → Attio.
8. `modular-design-system-scaleups.mdx` — Design system multi-brand.
9. `revops-analytics-observability.mdx` — Observabilidad dbt + Metaplane.
10. `posthog-mini-cdp.mdx` — PostHog convertido en mini CDP.
11. `partner-portal-nextjs-supabase.mdx` — Portal de partners con Next.js.
12. `ai-sales-copilot-gong.mdx` — Copilot de resúmenes para Gong.
13. `growth-sprint-30-days.mdx` — Sprint completo de 30 días.
14. `lead-routing-n8n-attio.mdx` — Lead routing inteligente.
15. `customer-journey-automation-resend.mdx` — Journeys lifecycle con Resend.
16. `product-qualified-leads-system.mdx` — Sistema de PQLs con Snowflake + Hightouch.
17. `ai-ops-war-room.mdx` — War room operativo con AI.

> Nota: El catálogo histórico de la pestaña Research sigue viviendo en `data/research.ts`. Cada entrada se convierte automáticamente a contenido del blog y aparece en `/research` y `/blog/<slug>` sin necesidad de crear archivos adicionales.

### Estructura de los Posts

Cada post incluye:
- ✅ **Frontmatter** completo (metadata)
- ✅ Contenido técnico detallado
- ✅ Ejemplos de código
- ✅ Tablas comparativas
- ✅ Casos reales con métricas
- ✅ CTAs al final para contacto

### Frontmatter de Ejemplo:

```yaml
---
title: "Título del Post"
slug: "url-slug"
type: "Guide | Tutorial | Case Study | Insight | Playbook"
summary: "Descripción corta para listados"
date: "2025-01-15"
readingTime: "8 min read"
author: "Marsala Team"
tags: ["Tag1", "Tag2", "Tag3"]
featured: true
image: "/blog/image.jpg"
---
```

---

## 🔄 Próximos Pasos para el Blog

Para integrar estos posts MDX en el sitio, necesitas:

### Opción A: Con next-mdx-remote (Recomendado)

```bash
npm install next-mdx-remote gray-matter
```

Crear `/app/blog/[slug]/page.tsx`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('content/blog'));
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const markdown = fs.readFileSync(
    path.join('content/blog', slug + '.mdx'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdown);

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <MDXRemote source={content} />
    </article>
  );
}
```

### Opción B: Con Contentlayer

```bash
npm install contentlayer next-contentlayer
```

Ver documentación: https://contentlayer.dev/docs/getting-started

---

## 🎨 Customización de Emails

### Cambiar el diseño de emails:

Edita `/app/api/contact/route.ts` o `/app/api/waitlist/route.ts`:

```typescript
// Busca el objeto que se pasa a resend.emails.send()
await resend.emails.send({
  from: 'Marsala Contact Form <noreply@marsala.dev>',
  to: ['sales@marsala.dev'],
  subject: `Nuevo contacto desde ${entryPoint}`,
  html: `
    // Tu HTML customizado aquí
  `
});
```

### Agregar email de confirmación al usuario:

Descomenta la sección en `/app/api/waitlist/route.ts`:

```typescript
// Enviar confirmación al usuario
await resend.emails.send({
  from: 'Marsala OS <noreply@marsala.dev>',
  to: [email],
  subject: 'Welcome to Marsala OS Waitlist',
  html: `
    <h1>Thanks for joining!</h1>
    <p>We'll notify you when we launch.</p>
  `,
});
```

---

## 🔒 Seguridad

### Rate Limiting (Recomendado para producción)

Instala:
```bash
npm install @upstash/ratelimit @upstash/redis
```

Agrega al inicio de las API routes:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests por hora
});

export async function POST(request: NextRequest) {
  const identifier = request.ip ?? 'anonymous';
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // ... resto del código
}
```

### Validación Adicional

Ya implementado:
- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Sanitización básica

---

## 📊 Analytics Recomendado

Para trackear conversiones de formularios:

### PostHog (Gratis hasta 1M events/mes)

```bash
npm install posthog-js
```

En los formularios:

```typescript
import posthog from 'posthog-js';

// Después de envío exitoso:
posthog.capture('contact_form_submitted', {
  entry_point: entryPoint,
  form_type: 'contact', // o 'waitlist'
});
```

---

## 🚢 Deploy

### Vercel (Recomendado)

```bash
vercel
```

**Variables de entorno en Vercel:**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega: `RESEND_API_KEY=tu_key_aqui`
4. Redeploy

### Netlify

```bash
netlify deploy
```

Agrega env var en Netlify UI.

---

## 🐛 Troubleshooting

### "Failed to send email"

**Causa:** API key inválida o dominio no verificado

**Solución:**
1. Verifica que `RESEND_API_KEY` esté en `.env.local`
2. Verifica tu dominio en Resend dashboard
3. Usa `onboarding@resend.dev` para testing

### "Network error"

**Causa:** API route no accesible

**Solución:**
1. Verifica que el servidor esté corriendo: `npm run dev`
2. Revisa la consola del navegador para errores
3. Prueba la API directamente: `curl -X POST http://localhost:3000/api/contact`

### Entry point siempre muestra "Direct"

**Causa:** Navegador bloqueando `document.referrer`

**Solución:**
- Es normal en desarrollo local
- En producción funciona correctamente
- Alternativamente, pasa `?from=page-name` en URLs

---

## 📞 Soporte

Si tienes preguntas:
1. Revisa este documento
2. Consulta la documentación de Resend: https://resend.com/docs
3. Contacta al equipo de Marsala

---

## ✨ Features Adicionales Sugeridos

### Para el futuro:

- [ ] Email de confirmación automático al usuario
- [ ] Integración con CRM (HubSpot, Attio)
- [ ] Notificaciones a Slack cuando llega un lead
- [ ] Dashboard de analytics de formularios
- [ ] A/B testing de copy en formularios
- [ ] Auto-responder inteligente con IA

---

**¡Todo está listo para producción!** 🚀

Solo falta:
1. Configurar el API key de Resend
2. Verificar el dominio
3. Deploy

El resto funciona out-of-the-box.
