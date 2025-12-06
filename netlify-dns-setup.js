#!/usr/bin/env node
/**
 * Script para agregar DNS records de Resend a Netlify automáticamente
 * Uso: node netlify-dns-setup.js
 */

const { execSync } = require('child_process');

const DOMAIN = 'marsala.dev';

// DNS Records de Resend
const DNS_RECORDS = [
  {
    name: 'DKIM',
    type: 'TXT',
    hostname: 'resend._domainkey.marsala.dev',
    value: 'p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJX9SNECgxXR9goMAA3db0PcTJ2F1kWxAgWFLKId/FT0V4BQtiboJLM2KHdOw2AoJd95uBH7UhwKl22d3rKHUgFfv6dt/vcmBM8pODUfhkGV5hz6CauDDyT36ixqeUGpnadrHQbK/9+3C8NMf/tQppfn92cjMgzaYMdaDTmod/pwIDAQAB',
    ttl: 3600
  },
  {
    name: 'MX',
    type: 'MX',
    hostname: 'send.marsala.dev',
    value: 'feedback-smtp.us-east-1.amazonses.com',
    priority: 10,
    ttl: 3600
  },
  {
    name: 'SPF',
    type: 'TXT',
    hostname: 'send.marsala.dev',
    value: 'v=spf1 include:amazonses.com ~all',
    ttl: 3600
  }
];

function runCommand(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (error) {
    throw new Error(error.stderr || error.message);
  }
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Setup DNS de Resend en Netlify');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Verificar autenticación
  console.log('🔑 Verificando autenticación con Netlify...');
  try {
    runCommand('netlify status');
    console.log('✅ Autenticado correctamente\n');
  } catch (error) {
    console.error('❌ No estás autenticado en Netlify');
    console.log('\n💡 Ejecuta primero:');
    console.log('   netlify login\n');
    process.exit(1);
  }

  // 2. Obtener zona DNS
  console.log(`🔍 Buscando zona DNS para ${DOMAIN}...`);
  let zones;
  try {
    const output = runCommand('netlify api getDnsZones');
    zones = JSON.parse(output);
  } catch (error) {
    console.error('❌ Error al obtener zonas DNS:', error.message);
    console.log('\n💡 Asegúrate de que:');
    console.log('   1. El dominio marsala.dev está en Netlify');
    console.log('   2. Los nameservers están apuntando a Netlify');
    console.log('   3. Tienes permisos para gestionar DNS\n');
    console.log('Verifica en: https://app.netlify.com/teams/<tu-team>/dns\n');
    process.exit(1);
  }

  // Buscar la zona para marsala.dev
  const zone = zones.find(z => z.name === DOMAIN);

  if (!zone) {
    console.error(`❌ No se encontró la zona DNS para ${DOMAIN}`);
    console.log('\n📋 Zonas disponibles:');
    zones.forEach(z => console.log(`   - ${z.name} (ID: ${z.id})`));
    console.log('\n💡 Agrega el dominio primero en: https://app.netlify.com/teams/<tu-team>/dns\n');
    process.exit(1);
  }

  console.log(`✅ Zona encontrada: ${zone.name} (ID: ${zone.id})\n`);

  // 3. Obtener records existentes
  console.log('📋 Verificando DNS records existentes...');
  let existingRecords = [];
  try {
    const output = runCommand(`netlify api getDnsRecords --data '{"zone_id": "${zone.id}"}'`);
    existingRecords = JSON.parse(output);
  } catch (error) {
    console.warn('⚠️  No se pudieron obtener records existentes (continuando...)');
  }

  // 4. Agregar cada DNS record
  console.log('\n📝 Agregando DNS records de Resend...\n');

  for (const record of DNS_RECORDS) {
    console.log(`   Agregando ${record.name} (${record.type})...`);

    // Verificar si ya existe
    const exists = existingRecords.some(r =>
      r.hostname === record.hostname && r.type === record.type
    );

    if (exists) {
      console.log(`   ⏭️  Ya existe - omitiendo`);
      continue;
    }

    try {
      const data = {
        zone_id: zone.id,
        type: record.type,
        hostname: record.hostname,
        value: record.value,
        ttl: record.ttl
      };

      if (record.priority !== undefined) {
        data.priority = record.priority;
      }

      runCommand(`netlify api createDnsRecord --data '${JSON.stringify(data)}'`);
      console.log(`   ✅ Agregado correctamente`);
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ DNS records agregados!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📝 Próximos pasos:\n');
  console.log('1. Espera 10-15 minutos para propagación DNS');
  console.log('2. Verifica el dominio en Resend:');
  console.log('   node resend-domains-manager.js verify fd138caa-2fbb-43ec-925b-aadb00c984c1');
  console.log('');
  console.log('3. Verifica los records en Netlify:');
  console.log(`   https://app.netlify.com/teams/<tu-team>/dns/${DOMAIN}`);
  console.log('');
}

main().catch(error => {
  console.error('\n❌ Error inesperado:', error.message);
  process.exit(1);
});
