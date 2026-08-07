import { Badge } from "@/components/ui/badge";
import { Code2, Webhook, Key, ShoppingCart, Package, CreditCard, ArrowRight, ExternalLink } from "lucide-react";

export const metadata = { title: "API Documentation — C Commerce" };

const sections = [
  {
    icon: Key,
    color: "bg-amber-50 text-amber-600",
    title: "Authentication",
    desc: "Secure your API calls with store-level API keys.",
    endpoints: [
      { method: "POST", path: "/api/v1/auth/token", desc: "Generate an access token" },
      { method: "DELETE", path: "/api/v1/auth/token", desc: "Revoke an access token" },
    ],
  },
  {
    icon: Package,
    color: "bg-blue-50 text-blue-600",
    title: "Products",
    desc: "Create, update, and retrieve product listings.",
    endpoints: [
      { method: "GET", path: "/api/v1/products", desc: "List all products" },
      { method: "POST", path: "/api/v1/products", desc: "Create a new product" },
      { method: "PUT", path: "/api/v1/products/:id", desc: "Update a product" },
      { method: "DELETE", path: "/api/v1/products/:id", desc: "Delete a product" },
    ],
  },
  {
    icon: ShoppingCart,
    color: "bg-emerald-50 text-emerald-600",
    title: "Orders",
    desc: "Retrieve and manage customer orders.",
    endpoints: [
      { method: "GET", path: "/api/v1/orders", desc: "List all orders" },
      { method: "GET", path: "/api/v1/orders/:id", desc: "Get order details" },
      { method: "PATCH", path: "/api/v1/orders/:id/status", desc: "Update order status" },
    ],
  },
  {
    icon: CreditCard,
    color: "bg-purple-50 text-purple-600",
    title: "Payments",
    desc: "Verify payment status and trigger refunds.",
    endpoints: [
      { method: "GET", path: "/api/v1/payments/:trxId", desc: "Verify a payment transaction" },
      { method: "POST", path: "/api/v1/payments/refund", desc: "Initiate a refund" },
    ],
  },
  {
    icon: Webhook,
    color: "bg-rose-50 text-rose-600",
    title: "Webhooks",
    desc: "Receive real-time events when orders or payments change.",
    endpoints: [
      { method: "POST", path: "your-url/webhook", desc: "order.created — new order placed" },
      { method: "POST", path: "your-url/webhook", desc: "order.status_changed — order status update" },
      { method: "POST", path: "your-url/webhook", desc: "payment.confirmed — payment verified" },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-blue-100 text-blue-700",
  POST: "bg-emerald-100 text-emerald-700",
  PUT: "bg-amber-100 text-amber-700",
  PATCH: "bg-purple-100 text-purple-700",
  DELETE: "bg-rose-100 text-rose-700",
};

export default function DocsPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">API Docs</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">C Commerce API</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Integrate C Commerce into your apps, custom workflows, and third-party systems using our REST API.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Quick Start */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-mono text-sm font-semibold">Quick Start</span>
          </div>
          <pre className="text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed">
{`# Get your API key from Merchant Settings → API
curl -X GET https://api.ccommerce.com.bd/v1/products \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>

        {/* Base URL */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Base URL</p>
            <p className="font-mono text-sm text-slate-900">api.ccommerce.com.bd/v1</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Authentication</p>
            <p className="font-mono text-sm text-slate-900">Bearer Token (API Key)</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Response Format</p>
            <p className="font-mono text-sm text-slate-900">JSON</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${sec.color} flex items-center justify-center`}>
                  <sec.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{sec.title}</h3>
                  <p className="text-xs text-slate-500">{sec.desc}</p>
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {sec.endpoints.map((ep, j) => (
                  <div key={j} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors group cursor-pointer">
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${methodColors[ep.method] || "bg-slate-100 text-slate-600"} flex-shrink-0`}>
                      {ep.method}
                    </span>
                    <code className="text-sm text-slate-700 font-mono flex-1">{ep.path}</code>
                    <span className="text-xs text-slate-400 hidden sm:block">{ep.desc}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <p className="font-semibold text-slate-900 mb-2">Need help with the API?</p>
          <p className="text-sm text-slate-500 mb-4">Our developer support team can help you integrate C Commerce into your project.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
            Contact Developer Support <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
