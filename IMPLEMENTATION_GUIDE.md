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

Actualmente hay **37 posts** curados (17 temáticos + 20 nuevos para SEO). Todos se generan a partir de un único dataset:

1. Edita/crea un objeto en `content/blog-data.mjs` (título, slug, resumen, keywords, bullets de stack/playbook/metrics).
2. Corre `npm run blog:generate`. El script compone todos los `.mdx` con voz uniforme, CTA y metadatos SEO.
3. Los archivos resultantes viven en `content/blog/*.mdx` y automáticamente aparecen en `/research` y `/blog/[slug]`.

> El contenido legacy de `data/research.ts` sigue siendo soportado. Cada entrada se renderiza con el nuevo layout directamente desde la data estructurada.

### Frontmatter generado

El script produce un frontmatter como este:

```yaml
---
title: "Automatizando funnels con n8n sin incendiar el CRM"
slug: "automate-conversion-funnel-n8n"
type: "Playbook"
summary: "Pasé de 40 horas manuales a 2 horas/semana orquestando scoring, nurtures y alertas en n8n."
description: "Playbook paso a paso para orquestar un funnel B2B sin depender de Zapier."
date: "2025-02-10"
readingTime: "8 min read"
author: "Marina Álvarez"
tags:
  - "Automation"
  - "RevOps"
keywords:
  - "n8n"
  - "attio"
featured: false
image: "/blog/n8n-automation.jpg"
---
```

Debajo del frontmatter encontrarás el layout uniforme:

- `Contexto` (voz en primera persona).
- `Stack que usé`.
- `Playbook paso a paso`.
- `Métricas y telemetría`.
- `Lo que aprendí`.
- `Próximo experimento` + CTA hacia `/contact`.

---

## 🔄 Próximos Pasos para el Blog

1. **Editar datos:** agrega/actualiza tu entrada en `content/blog-data.mjs`.
2. **Regenerar contenido:** `npm run blog:generate`.
3. **Validar:** `npm run lint && npm run build`.
4. **Deploy:** `netlify deploy --prod` (o pipeline preferido).

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
