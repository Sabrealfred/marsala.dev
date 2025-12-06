# 🚀 Guía: Configurar DNS de Resend en Netlify

## 📋 Resumen Rápido

Tienes 2 opciones para agregar los DNS records a Netlify:

### Opción A: Script Automático (Recomendado) ⭐
```bash
# 1. Login en Netlify
netlify login

# 2. Ejecutar script automático
npm run netlify:setup-dns
# o
node netlify-dns-setup.js
```

### Opción B: Manual desde Netlify UI
Ve a: https://app.netlify.com → DNS → marsala.dev

---

## 🔧 Opción A: Script Automático (Paso a Paso)

### 1. Autenticarse en Netlify

```bash
netlify login
```

Esto abrirá tu navegador para autenticarte. Si ya estás loggeado, puedes verificar con:

```bash
netlify status
```

### 2. Verificar que marsala.dev está en Netlify

```bash
# Listar zonas DNS
netlify api getDnsZones
```

Deberías ver `marsala.dev` en la lista. Si no está:
1. Ve a https://app.netlify.com/teams/<tu-team>/dns
2. Clic en "Add a domain"
3. Ingresa `marsala.dev`

### 3. Ejecutar Script Automático

```bash
npm run netlify:setup-dns
```

o directamente:

```bash
node netlify-dns-setup.js
```

El script:
- ✅ Verifica autenticación
- ✅ Busca la zona DNS de marsala.dev
- ✅ Agrega automáticamente los 3 DNS records
- ✅ Evita duplicados (salta si ya existen)

### 4. Verificar Records Agregados

```bash
# Ver records en Netlify
netlify api getDnsRecords --data '{"zone_id": "TU_ZONE_ID"}'
```

O en el dashboard: https://app.netlify.com/teams/<tu-team>/dns/marsala.dev

---

## 📝 Opción B: Agregar DNS Manualmente

### Desde Netlify UI

1. Ve a: https://app.netlify.com/teams/<tu-team>/dns/marsala.dev

2. Clic en "Add new record"

3. Agrega estos 3 records:

#### Record 1: DKIM (TXT)
```
Type: TXT
Name: resend._domainkey.marsala.dev
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJX9SNECgxXR9goMAA3db0PcTJ2F1kWxAgWFLKId/FT0V4BQtiboJLM2KHdOw2AoJd95uBH7UhwKl22d3rKHUgFfv6dt/vcmBM8pODUfhkGV5hz6CauDDyT36ixqeUGpnadrHQbK/9+3C8NMf/tQppfn92cjMgzaYMdaDTmod/pwIDAQAB
TTL: 3600
```

#### Record 2: MX
```
Type: MX
Name: send.marsala.dev
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: 3600
```

#### Record 3: SPF (TXT)
```
Type: TXT
Name: send.marsala.dev
Value: v=spf1 include:amazonses.com ~all
TTL: 3600
```

---

## ✅ Verificación

### 1. Espera Propagación (10-15 minutos)

### 2. Verifica DNS con dig

```bash
# DKIM
dig TXT resend._domainkey.marsala.dev

# MX
dig MX send.marsala.dev

# SPF
dig TXT send.marsala.dev
```

### 3. Verifica en Resend

```bash
node resend-domains-manager.js verify fd138caa-2fbb-43ec-925b-aadb00c984c1
```

Deberías ver:
```
✅ Dominio verificado exitosamente!
```

---

## 🛠️ Comandos Útiles de Netlify CLI

```bash
# Login
netlify login

# Ver status
netlify status

# Listar zonas DNS
netlify api getDnsZones

# Ver records de un dominio
netlify api getDnsRecords --data '{"zone_id": "ZONE_ID"}'

# Crear un DNS record manual
netlify api createDnsRecord --data '{
  "zone_id": "ZONE_ID",
  "type": "TXT",
  "hostname": "ejemplo.marsala.dev",
  "value": "valor",
  "ttl": 3600
}'

# Borrar un DNS record
netlify api deleteDnsRecord --data '{
  "zone_id": "ZONE_ID",
  "dns_record_id": "RECORD_ID"
}'
```

---

## 🔍 Troubleshooting

### Error: "No estás autenticado"
```bash
netlify login
```

### Error: "Zona no encontrada"
El dominio no está en Netlify. Agrégalo en:
https://app.netlify.com/teams/<tu-team>/dns

### Error: "Record ya existe"
Normal, el script omite duplicados. Puedes continuar.

### DNS no propaga
- Espera hasta 48h (típicamente 10-30 min)
- Verifica con `dig TXT resend._domainkey.marsala.dev`
- Limpia cache DNS: `sudo systemd-resolve --flush-caches`

---

## 📚 Recursos

- **Netlify DNS Dashboard:** https://app.netlify.com → DNS
- **Netlify CLI Docs:** https://docs.netlify.com/cli/get-started/
- **Netlify API Docs:** https://open-api.netlify.com/
- **Resend Verification:** https://resend.com/domains/fd138caa-2fbb-43ec-925b-aadb00c984c1

---

## 🎯 Checklist

- [ ] Login en Netlify: `netlify login`
- [ ] Verificar dominio en Netlify: `netlify api getDnsZones`
- [ ] Ejecutar script: `npm run netlify:setup-dns`
- [ ] Esperar 10-15 minutos
- [ ] Verificar en Resend: `node resend-domains-manager.js verify fd138caa...`
- [ ] Actualizar APIs para usar `@marsala.dev`
