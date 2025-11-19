# Marsala.dev — Roadmap Operativo

Este roadmap consolida `README.md`, `README_IMPLEMENTATION.md`, `IMPLEMENTATION_GUIDE.md`, `DNS_SETUP_INSTRUCTIONS.md`, `NETLIFY_DNS_GUIDE.md`, `BLOG_WORKFLOW.md`, `SECURITY_INCIDENT.md` y nuevos requerimientos para mantener una vista única del estado del sitio.

## ✅ Entregas Completadas

- **Formularios + APIs**: Contacto y waitlist (`app/contact`, `app/waitlist`, `app/api/*`) con validaciones, estados de error, tracking de entry point y envío vía Resend.
- **Contenido unificado**: 37 posts MDX + research legacy en `/research`, generados desde `content/blog-data.mjs` (`npm run blog:generate`).
- **Tooling**: CLIs de Resend (`resend-cli-helper.js`), gestión de dominios (`resend-domains-manager.js`), script de DNS Netlify (`netlify-dns-setup.js`) y documentación operativa.
- **Respuesta a incidente**: remoción de API keys expuestas, script `rotate-resend-keys.sh`, guía de remediación en `SECURITY_INCIDENT.md`.

## 🔄 En Curso

- **Rotación de API keys Resend**: Usuario debe generar y aplicar nuevas llaves (ver `SECURITY_INCIDENT.md`).
- **Verificación de dominio**: Pending `marsala.dev` en Resend (`DNS_SETUP_INSTRUCTIONS.md`, `NETLIFY_DNS_GUIDE.md`).
- **Documentación viva**: mantener guías y checklists sincronizados con los pasos de seguridad y DNS.

## ⏳ Pendiente / Próximas Acciones

1. **DNS + Verificación**
   - Confirmar DKIM, MX, SPF manualmente o vía `npm run netlify:setup-dns`.
   - Validar en Resend con `resend-domains-manager.js verify`.
2. **Emails productivos**
   - Cambiar `from/to` en APIs a `noreply@marsala.dev → sales@marsala.dev` cuando el dominio se verifique.
   - Ejecutar `rotate-resend-keys.sh` y refrescar `.env.local` + Netlify envs.
3. **Deploy**
   - `npm run build` + deploy Netlify/Vercel tras asegurar env vars.
4. **Hardening recomendado**
   - Rate limiting (Upstash), PostHog para formularios, alertas/secret scanning.
5. **Mejoras futuras**
   - Auto-confirmaciones al usuario, integración CRM/Slack, dashboard de analytics de formularios.
6. **Experiencia visual y responsive**
   - Multi-idioma (ES + 5 idiomas clave) con switcher/detección.
   - Dark mode respetando `prefers-color-scheme` + toggle manual.
   - Depurar iconografía que parezca “AI dev” (reemplazar sets genéricos por ilustraciones propias) y ajustar tipografías/detalles UI para un tono más editorial.
   - Ajustar layout responsive y márgenes/gutters para evitar aspecto compactado.
   - Expandir homepage con nuevas secciones (tutoriales, comparativas, highlights).
   - Microinteracción del “pingüino” que siga al cursor en toda la página.
7. **Experiencia Blog**
   - Arreglar botón “Back to Blog”: hoy apunta a `/blog` vacío; decidir redirección a `/research` o construir índice en `/blog`.
   - Añadir controles `Next post / Previous post` en `blog/[slug]`.
   - Hacer que carruseles/listas destacadas sean rotativos/loop.
   - Incluir recomendaciones basadas en tags coincidentes (contenido sugerido contextual).

## 📰 Blog Roadmap

### Estado actual

- Pipeline MDX consolidado (`content/blog-data.mjs` + `npm run blog:generate`).
- 37 artículos publicados con voz unificada y soporte para posts manuales.

### Próximas iteraciones

- [ ] Diseñar taxonomía de categorías/tags visibles en `/blog` y `/research`.
- [ ] Propagar metadatos de categorías/tags a `.mdx`, sitemap y OG metadata.
- [ ] Actualizar filtros/búsquedas para usar categorías/tags/tipos.
- [ ] Mantener `content/blog-backlog.json` como fuente única de ideas (status `todo/draft/published`).
- [ ] Escalar producción editorial hasta 2,000 posts combinando tutoriales, comparativas, herramientas open source y explicaciones largas.
- [ ] Añadir tutoriales detallados sobre las herramientas core del stack (Resend, Netlify, CLIs internas) dentro de la serie principal.
- [ ] Implementar contenido sugerido por tags, carouseles rotativos y navegación `Next/Prev`.

> Actualiza este documento cada vez que avances una iniciativa (DNS, seguridad, blog, UX) para que todo el equipo tenga visibilidad del estado del sitio.
