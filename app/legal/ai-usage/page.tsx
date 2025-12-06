import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Usage",
  description: "Marsala OS policy on AI usage, prompts, logging, and transparency.",
};

const items = [
  {
    en: "We disclose when AI models assist in content, code, or automation delivered to clients.",
    es: "Divulgamos cuando modelos de IA asisten en contenido, código o automatización entregada a clientes.",
  },
  {
    en: "Prompts and outputs are logged in secure repositories with access control.",
    es: "Los prompts y outputs se registran en repositorios seguros con control de acceso.",
  },
  {
    en: "Sensitive data is anonymized or excluded from prompt payloads.",
    es: "Los datos sensibles se anonimizan o se excluyen de los prompts.",
  },
  {
    en: "We respect provider policies (OpenAI, Anthropic) and monitor for drift or hallucination.",
    es: "Respetamos las políticas de proveedores (OpenAI, Anthropic) y monitoreamos drift o alucinaciones.",
  },
];

export default function AIUsagePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">AI Usage · Uso de IA</h1>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <p key={item.en} className="rounded-sm border border-border bg-white/80 p-5 text-sm text-foreground shadow-card">
            {item.en}
            <span className="mt-1 block text-xs text-foreground-muted">{item.es}</span>
          </p>
        ))}
      </div>
    </main>
  );
}
