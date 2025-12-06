#!/bin/bash
#
# Script para configurar DNS records de Resend en Netlify
# Uso: ./setup-dns-netlify.sh
#

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📧 Configurador de DNS para Resend en Netlify"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Variables
DOMAIN="marsala.dev"
ZONE_ID=""  # Se obtendrá automáticamente

# Verificar que estamos loggeados
echo "🔑 Verificando autenticación con Netlify..."
if ! netlify status &>/dev/null; then
    echo "❌ No estás loggeado en Netlify"
    echo ""
    echo "Por favor ejecuta primero:"
    echo "  netlify login"
    echo ""
    exit 1
fi

echo "✅ Autenticado correctamente"
echo ""

# Obtener el Zone ID del dominio
echo "🔍 Buscando zona DNS para $DOMAIN..."
ZONES=$(netlify api listDnsZones 2>&1)

if echo "$ZONES" | grep -q "error"; then
    echo "❌ Error al obtener zonas DNS"
    echo ""
    echo "Esto puede pasar si:"
    echo "  1. El dominio no está en Netlify"
    echo "  2. No tienes permisos para gestionar DNS"
    echo ""
    echo "Verifica en: https://app.netlify.com/teams/<tu-team>/dns"
    exit 1
fi

# Aquí normalmente extraeríamos el zone_id del JSON
# Por ahora, mostraremos las instrucciones manuales

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 DNS Records a Agregar"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'EOF'
Opción A: Usar Netlify UI (Más fácil)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Ve a: https://app.netlify.com/teams/<tu-team>/dns/marsala.dev

2. Agrega estos 3 records:

   📝 Record 1: DKIM (TXT)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Hostname: resend._domainkey.marsala.dev
   Type: TXT
   Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJX9SNECgxXR9goMAA3db0PcTJ2F1kWxAgWFLKId/FT0V4BQtiboJLM2KHdOw2AoJd95uBH7UhwKl22d3rKHUgFfv6dt/vcmBM8pODUfhkGV5hz6CauDDyT36ixqeUGpnadrHQbK/9+3C8NMf/tQppfn92cjMgzaYMdaDTmod/pwIDAQAB
   TTL: 3600

   📝 Record 2: MX
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Hostname: send.marsala.dev
   Type: MX
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10
   TTL: 3600

   📝 Record 3: SPF (TXT)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Hostname: send.marsala.dev
   Type: TXT
   Value: v=spf1 include:amazonses.com ~all
   TTL: 3600


Opción B: Usar Netlify CLI (Avanzado)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Si prefieres usar el CLI, ejecuta estos comandos:

# 1. DKIM Record
netlify api createDnsRecord --data '{
  "zone_id": "TU_ZONE_ID",
  "type": "TXT",
  "hostname": "resend._domainkey.marsala.dev",
  "value": "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJX9SNECgxXR9goMAA3db0PcTJ2F1kWxAgWFLKId/FT0V4BQtiboJLM2KHdOw2AoJd95uBH7UhwKl22d3rKHUgFfv6dt/vcmBM8pODUfhkGV5hz6CauDDyT36ixqeUGpnadrHQbK/9+3C8NMf/tQppfn92cjMgzaYMdaDTmod/pwIDAQAB",
  "ttl": 3600
}'

# 2. MX Record
netlify api createDnsRecord --data '{
  "zone_id": "TU_ZONE_ID",
  "type": "MX",
  "hostname": "send.marsala.dev",
  "value": "feedback-smtp.us-east-1.amazonses.com",
  "priority": 10,
  "ttl": 3600
}'

# 3. SPF Record
netlify api createDnsRecord --data '{
  "zone_id": "TU_ZONE_ID",
  "type": "TXT",
  "hostname": "send.marsala.dev",
  "value": "v=spf1 include:amazonses.com ~all",
  "ttl": 3600
}'

Para obtener tu ZONE_ID:
  netlify api listDnsZones


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Después de agregar los DNS:
  1. Espera 10-15 minutos
  2. Verifica: node resend-domains-manager.js verify fd138caa-2fbb-43ec-925b-aadb00c984c1

EOF

echo ""
echo "✅ Script completado"
echo ""
