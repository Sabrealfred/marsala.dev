# 📝 Instrucciones para Verificar marsala.dev en Resend

## Estado Actual
- ✅ Dominio agregado en Resend
- ⏳ Status: `not_started` (requiere verificación)
- 🆔 Domain ID: `fd138caa-2fbb-43ec-925b-aadb00c984c1`

---

## DNS Records que Debes Agregar

Ve al panel de administración de tu dominio (GoDaddy, Namecheap, Cloudflare, etc.) y agrega estos 3 records:

### 1. DKIM Record (TXT)
**Para autenticación de emails**

```
Tipo: TXT
Nombre: resend._domainkey.marsala.dev
       (o simplemente: resend._domainkey)
Valor: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJX9SNECgxXR9goMAA3db0PcTJ2F1kWxAgWFLKId/FT0V4BQtiboJLM2KHdOw2AoJd95uBH7UhwKl22d3rKHUgFfv6dt/vcmBM8pODUfhkGV5hz6CauDDyT36ixqeUGpnadrHQbK/9+3C8NMf/tQppfn92cjMgzaYMdaDTmod/pwIDAQAB
TTL: 3600 (o automático)
```

### 2. MX Record
**Para recibir bounces y notificaciones**

```
Tipo: MX
Nombre: send.marsala.dev
       (o simplemente: send)
Valor: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: 3600 (o automático)
```

### 3. SPF Record (TXT)
**Para prevenir spoofing**

```
Tipo: TXT
Nombre: send.marsala.dev
       (o simplemente: send)
Valor: v=spf1 include:amazonses.com ~all
TTL: 3600 (o automático)
```

---

## ⚠️ Notas Importantes

### Si tu dominio ya tiene un SPF record:
**NO agregues uno nuevo.** En su lugar, modifica el existente:

```
# Si tienes esto:
v=spf1 include:otro-servicio.com ~all

# Cámbialo a:
v=spf1 include:otro-servicio.com include:amazonses.com ~all
```

### Campo "Nombre" en algunos proveedores:
Algunos proveedores (como Cloudflare, GoDaddy) automáticamente agregan el dominio base. En ese caso:

```
# Si te pide solo el subdominio:
Nombre: resend._domainkey  (sin .marsala.dev)
Nombre: send               (sin .marsala.dev)

# Si te permite el FQDN completo:
Nombre: resend._domainkey.marsala.dev
Nombre: send.marsala.dev
```

---

## Verificación

### Método 1: Desde la terminal (recomendado)

Espera 5-10 minutos después de agregar los DNS records, luego ejecuta:

```bash
node resend-domains-manager.js verify fd138caa-2fbb-43ec-925b-aadb00c984c1
```

### Método 2: Desde el dashboard web

Ve a: https://resend.com/domains/fd138caa-2fbb-43ec-925b-aadb00c984c1

Y haz clic en "Verify Domain"

---

## Comandos Útiles

```bash
# Ver status actual
node resend-domains-manager.js get fd138caa-2fbb-43ec-925b-aadb00c984c1

# Verificar dominio
node resend-domains-manager.js verify fd138caa-2fbb-43ec-925b-aadb00c984c1

# Listar todos los dominios
node resend-domains-manager.js list

# O usando npm scripts:
npm run resend:domains
```

---

## Tiempo de Propagación

- **Mínimo:** 5-10 minutos
- **Típico:** 1-2 horas
- **Máximo:** 48 horas

Puedes verificar los DNS con:
```bash
# DKIM
dig TXT resend._domainkey.marsala.dev

# MX
dig MX send.marsala.dev

# SPF
dig TXT send.marsala.dev
```

---

## Una Vez Verificado

Cuando el dominio esté verificado, actualiza las APIs para usar tu dominio:

**En `app/api/contact/route.ts`:**
```typescript
from: 'Marsala Contact Form <noreply@marsala.dev>',
to: ['sales@marsala.dev'],
```

**En `app/api/waitlist/route.ts`:**
```typescript
from: 'Marsala Waitlist <noreply@marsala.dev>',
to: ['sales@marsala.dev'],
```

---

## Ayuda

- 🌐 Dashboard de Resend: https://resend.com/domains
- 📧 Soporte: help@resend.com
- 📖 Docs: https://resend.com/docs/dashboard/domains/introduction
