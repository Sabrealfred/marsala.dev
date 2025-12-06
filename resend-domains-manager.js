#!/usr/bin/env node
/**
 * Gestor de Dominios para Resend
 *
 * IMPORTANTE: Requiere un API key con permisos completos (no solo "sending")
 *
 * Para crear un API key con permisos completos:
 * 1. Ve a https://resend.com/api-keys
 * 2. Clic en "Create API Key"
 * 3. Nombre: "Full Access Key"
 * 4. Permission: "Full access" (no selecciones "Sending access only")
 * 5. Copia la key y agrégala a .env.local como RESEND_FULL_ACCESS_KEY
 */

const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

// Usar la key de full access si existe, sino la normal
const apiKey = process.env.RESEND_FULL_ACCESS_KEY || process.env.RESEND_API_KEY;
const resend = new Resend(apiKey);

const commands = {
  // Listar todos los dominios
  'list': async () => {
    console.log('📋 Listando dominios...\n');

    try {
      const { data, error } = await resend.domains.list();

      if (error) {
        if (error.name === 'restricted_api_key') {
          console.error('❌ Tu API key no tiene permisos para gestionar dominios.');
          console.log('\n💡 Solución:');
          console.log('1. Ve a https://resend.com/api-keys');
          console.log('2. Crea una nueva API key con "Full access"');
          console.log('3. Agrégala a .env.local como RESEND_FULL_ACCESS_KEY');
          process.exit(1);
        }
        throw error;
      }

      // Manejar diferentes formatos de respuesta
      const domains = Array.isArray(data) ? data : (data?.data || []);

      if (!domains || domains.length === 0) {
        console.log('📭 No tienes dominios configurados todavía.');
        console.log('\n💡 Agregar dominio: node resend-domains-manager.js add marsala.dev');
      } else {
        console.log(`✅ Encontrados ${domains.length} dominio(s):\n`);
        domains.forEach((domain, i) => {
          console.log(`${i + 1}. ${domain.name}`);
          console.log(`   ID: ${domain.id}`);
          console.log(`   Status: ${domain.status}`);
          console.log(`   Region: ${domain.region || 'us-east-1'}`);
          console.log(`   Created: ${domain.created_at}`);
          console.log('');
        });
      }
    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  },

  // Agregar un nuevo dominio
  'add': async (domain) => {
    if (!domain) {
      console.error('❌ Debes especificar un dominio.');
      console.log('Uso: node resend-domains-manager.js add marsala.dev');
      process.exit(1);
    }

    console.log(`📧 Agregando dominio: ${domain}...\n`);

    try {
      const { data, error } = await resend.domains.create({
        name: domain,
        region: 'us-east-1'  // Puedes cambiarlo a 'eu-west-1' si prefieres Europa
      });

      if (error) {
        if (error.name === 'restricted_api_key') {
          console.error('❌ Tu API key no tiene permisos para gestionar dominios.');
          console.log('\n💡 Necesitas crear una API key con "Full access"');
          console.log('   Ve a: https://resend.com/api-keys');
          process.exit(1);
        }
        throw error;
      }

      console.log('✅ Dominio agregado exitosamente!');
      console.log(`\n📋 Detalles:`);
      console.log(`   ID: ${data.id}`);
      console.log(`   Nombre: ${data.name}`);
      console.log(`   Status: ${data.status}`);
      console.log(`   Region: ${data.region}`);

      console.log('\n📝 Próximos pasos:');
      console.log('1. Verifica el dominio: node resend-domains-manager.js verify ' + data.id);
      console.log('2. Ve al dashboard para obtener los DNS records: https://resend.com/domains/' + data.id);

    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  },

  // Ver detalles de un dominio
  'get': async (domainId) => {
    if (!domainId) {
      console.error('❌ Debes especificar el ID del dominio.');
      console.log('Uso: node resend-domains-manager.js get <domain-id>');
      process.exit(1);
    }

    console.log(`🔍 Obteniendo información del dominio...\n`);

    try {
      const { data, error } = await resend.domains.get(domainId);

      if (error) throw error;

      console.log('✅ Dominio encontrado:\n');
      console.log(`Nombre: ${data.name}`);
      console.log(`ID: ${data.id}`);
      console.log(`Status: ${data.status}`);
      console.log(`Region: ${data.region}`);
      console.log(`Created: ${data.created_at}`);

      if (data.records) {
        console.log('\n📝 DNS Records necesarios:');
        data.records.forEach(record => {
          console.log(`\n  Tipo: ${record.record_type}`);
          console.log(`  Nombre: ${record.name}`);
          console.log(`  Valor: ${record.value}`);
          console.log(`  Status: ${record.status || 'pending'}`);
        });
      }

    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  },

  // Verificar un dominio
  'verify': async (domainId) => {
    if (!domainId) {
      console.error('❌ Debes especificar el ID del dominio.');
      console.log('Uso: node resend-domains-manager.js verify <domain-id>');
      process.exit(1);
    }

    console.log(`🔍 Verificando dominio...\n`);

    try {
      const { data, error } = await resend.domains.verify(domainId);

      if (error) throw error;

      console.log('✅ Verificación completada!\n');
      console.log(`Status: ${data.status}`);

      if (data.status === 'verified') {
        console.log('\n🎉 ¡Dominio verificado exitosamente!');
        console.log('   Ya puedes enviar emails desde este dominio.');
      } else {
        console.log('\n⏳ Dominio aún no verificado.');
        console.log('   Asegúrate de haber agregado todos los DNS records.');
        console.log('   La verificación puede tomar hasta 48 horas.');
      }

    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  },

  // Eliminar un dominio
  'remove': async (domainId) => {
    if (!domainId) {
      console.error('❌ Debes especificar el ID del dominio.');
      console.log('Uso: node resend-domains-manager.js remove <domain-id>');
      process.exit(1);
    }

    console.log(`🗑️  Eliminando dominio...\n`);

    try {
      const { error } = await resend.domains.remove(domainId);

      if (error) throw error;

      console.log('✅ Dominio eliminado exitosamente!');

    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  },

  'help': () => {
    console.log(`
📧 Resend Domains Manager
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  IMPORTANTE: Este script requiere un API key con permisos completos.

Tu API key actual: ${apiKey ? (apiKey.startsWith('re_') ? '✅ Configurada' : '❌ Inválida') : '❌ No encontrada'}
Tipo de key: ${process.env.RESEND_FULL_ACCESS_KEY ? 'Full Access ✅' : 'Solo envío ⚠️'}

Si ves errores de "restricted_api_key":
1. Ve a https://resend.com/api-keys
2. Crea nueva API key con "Full access"
3. Agrégala a .env.local:
   RESEND_FULL_ACCESS_KEY=re_tu_nueva_key_aqui

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comandos disponibles:

  list                      Listar todos los dominios
  add <domain>              Agregar nuevo dominio
  get <domain-id>           Ver detalles de un dominio
  verify <domain-id>        Verificar dominio
  remove <domain-id>        Eliminar dominio
  help                      Mostrar esta ayuda

Ejemplos:

  node resend-domains-manager.js list
  node resend-domains-manager.js add marsala.dev
  node resend-domains-manager.js get d1234567-89ab-cdef-0123-456789abcdef
  node resend-domains-manager.js verify d1234567-89ab-cdef-0123-456789abcdef

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dashboard web: https://resend.com/domains
    `);
  }
};

// Ejecutar comando
const cmd = process.argv[2] || 'help';
const arg = process.argv[3];

if (commands[cmd]) {
  commands[cmd](arg);
} else {
  console.error(`❌ Comando desconocido: ${cmd}`);
  console.log('\nUsa: node resend-domains-manager.js help');
  process.exit(1);
}
