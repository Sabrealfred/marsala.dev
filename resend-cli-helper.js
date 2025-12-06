#!/usr/bin/env node
/**
 * Helper CLI para gestionar Resend desde la terminal
 * Uso: node resend-cli-helper.js [comando]
 */

const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

const commands = {
  // Enviar email de prueba
  'test': async () => {
    console.log('📧 Enviando email de prueba...\n');

    try {
      const { data, error } = await resend.emails.send({
        from: 'Marsala Test <onboarding@resend.dev>',
        to: ['sabre.alfredo@gmail.com'],
        subject: 'Test desde CLI Helper',
        html: '<h1>✅ Funciona!</h1><p>Este email fue enviado usando el CLI helper de Resend.</p>',
      });

      if (error) {
        console.error('❌ Error:', error);
        process.exit(1);
      }

      console.log('✅ Email enviado exitosamente!');
      console.log('📬 ID:', data.id);
    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  },

  // Verificar API key
  'verify': async () => {
    console.log('🔑 Verificando API key...\n');

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('❌ No se encontró RESEND_API_KEY en .env.local');
      process.exit(1);
    }

    if (!apiKey.startsWith('re_')) {
      console.error('❌ API key inválida (debe empezar con "re_")');
      process.exit(1);
    }

    console.log('✅ API key encontrada:', apiKey.substring(0, 10) + '...');

    // Test de conexión
    try {
      await resend.emails.send({
        from: 'Test <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],  // Email de test de Resend
        subject: 'API Key Verification',
        html: '<p>Test</p>',
      });
      console.log('✅ Conexión con Resend exitosa!');
    } catch (err) {
      console.error('❌ Error de conexión:', err.message);
      process.exit(1);
    }
  },

  // Listar dominios (requiere API diferente, mostrar info)
  'info': () => {
    console.log(`
📧 Resend CLI Helper
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configuración Actual:
  • API Key: ${process.env.RESEND_API_KEY ? '✅ Configurada' : '❌ No configurada'}
  • From: Marsala Contact Form <onboarding@resend.dev>
  • To: sabre.alfredo@gmail.com

Dashboard de Resend:
  🌐 https://resend.com/home

Para verificar tu dominio:
  🌐 https://resend.com/domains

Comandos disponibles:
  node resend-cli-helper.js test     → Enviar email de prueba
  node resend-cli-helper.js verify   → Verificar API key
  node resend-cli-helper.js info     → Mostrar esta información
    `);
  },

  'help': () => {
    commands.info();
  }
};

// Ejecutar comando
const cmd = process.argv[2] || 'help';

if (commands[cmd]) {
  commands[cmd]();
} else {
  console.error(`❌ Comando desconocido: ${cmd}`);
  console.log('\nComandos disponibles: test, verify, info, help');
  process.exit(1);
}
