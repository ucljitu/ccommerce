import { Badge } from "@/components/ui/badge";
import { Banknote, Languages, MapPin, MessageCircle, WalletCards } from "lucide-react";

const localFeatures = [
  { title: "bKash and Nagad", description: "Easy connection with supported local payment gateways.", icon: WalletCards },
  { title: "Cash on Delivery", description: "Receive and manage Cash on Delivery orders.", icon: Banknote },
  { title: "Local Delivery Charges", description: "Set delivery charges by district, area or upazila.", icon: MapPin },
  { title: "WhatsApp Orders", description: "Let customers contact or order through WhatsApp.", icon: MessageCircle },
] as const;

export default function BangladeshSection() {
  return (
    <section aria-labelledby="bangladesh-title" className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge className="mb-4 border-0 bg-emerald-100 text-emerald-700">Built for Bangladesh</Badge>
          <h2 id="bangladesh-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">Tools Made for Local Businesses</h2>
          <p className="mt-4 text-lg text-slate-600">Support the payments, delivery methods and order process commonly used in Bangladesh.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {localFeatures.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <feature.icon className="h-7 w-7 text-blue-600" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <Languages className="h-7 w-7 shrink-0 text-blue-600" aria-hidden="true" />
          <div><h3 className="font-semibold text-slate-900">Store Content in Bangla or English</h3><p className="mt-2 text-slate-600">Merchants can add product names, descriptions and store content in Bangla or English. Dashboard navigation and system messages remain in English.</p></div>
        </div>
      </div>
    </section>
  );
}
