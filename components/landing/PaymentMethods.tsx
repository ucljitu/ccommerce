import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Banknote, Building2, CreditCard } from "lucide-react";

const logoPayments = [
  { name: "bKash", src: "/logos/bkash.png", width: 110, height: 48 },
  { name: "Nagad", src: "/logos/nagad.png", width: 110, height: 48 },
  { name: "Rocket", src: "/logos/rocket.png", width: 110, height: 48 },
  { name: "SSLCommerz", src: "/logos/sslcommerz.png", width: 125, height: 48 },
  { name: "UddoktaPay", src: "/logos/uddoktapay.png", width: 125, height: 48 },
] as const;

const textPayments = [
  { name: "Cash on Delivery", icon: Banknote },
  { name: "Card Payment", icon: CreditCard },
  { name: "Bank Transfer", icon: Building2 },
] as const;

export default function PaymentMethods() {
  return (
    <section aria-labelledby="payments-title" className="border-y border-slate-100 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Badge className="mb-4 border-0 bg-blue-100 text-blue-700">Payments</Badge>
        <h2 id="payments-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Accept Popular Payment Methods
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Connect the payment methods your customers already use.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {logoPayments.map((payment) => (
            <div key={payment.name} className="flex min-h-20 min-w-36 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
              <Image src={payment.src} alt={`${payment.name} payment`} width={payment.width} height={payment.height} className="h-10 w-auto object-contain" />
            </div>
          ))}
          {textPayments.map((payment) => (
            <div key={payment.name} className="flex min-h-20 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 font-medium text-slate-700">
              <payment.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              {payment.name}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Connect supported payment gateways using your merchant credentials.
        </p>
      </div>
    </section>
  );
}

