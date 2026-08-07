import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Terms of Service — C Commerce" };

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By creating an account or using C Commerce's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our platform. These terms apply to all users, including merchants, administrators, and visitors.",
  },
  {
    title: "2. Description of Service",
    content: "C Commerce provides a Software-as-a-Service (SaaS) ecommerce platform that enables businesses to create and manage online stores, process payments, manage inventory, and sell products to customers in Bangladesh and internationally. We reserve the right to modify, suspend, or discontinue any part of the service at any time.",
  },
  {
    title: "3. Account Registration",
    content: "You must provide accurate, complete, and current information when creating your account. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old or have parental consent to use our services. You are responsible for all activities that occur under your account.",
  },
  {
    title: "4. Subscription and Payments",
    content: "C Commerce offers subscription plans on a monthly or annual basis. Subscription fees are billed in advance. Payments may be made via bKash, Nagad, bank transfer, or other supported methods. All fees are non-refundable except as specified in our Refund Policy. We may change pricing with 30 days' notice.",
  },
  {
    title: "5. Merchant Responsibilities",
    content: "As a merchant using C Commerce, you are solely responsible for: the products and services you sell; compliance with all applicable laws in Bangladesh; accurate product descriptions and pricing; fulfilling customer orders; handling customer complaints and returns; and obtaining any necessary licenses or permits for your business.",
  },
  {
    title: "6. Prohibited Activities",
    content: "You may not use C Commerce to sell: counterfeit products; illegal items or controlled substances; products that infringe intellectual property rights; adult content without proper age verification; or any products prohibited under Bangladeshi law. We reserve the right to suspend accounts involved in prohibited activities.",
  },
  {
    title: "7. Payment Processing",
    content: "C Commerce integrates with third-party payment processors (bKash, Nagad, SSLCommerz, etc.). You agree to their respective terms of service when using these integrations. C Commerce does not store your customers' payment information. Transaction disputes are handled according to the payment gateway's policies.",
  },
  {
    title: "8. Intellectual Property",
    content: "C Commerce retains all intellectual property rights to the platform, software, and documentation. You retain ownership of your store's content (product images, descriptions, etc.). By using our platform, you grant C Commerce a license to display your content for the purpose of providing the service.",
  },
  {
    title: "9. Data and Privacy",
    content: "Your use of C Commerce is also governed by our Privacy Policy. We collect, store, and process data as described therein. You own your customer data. We will not sell your customer data to third parties. Upon account termination, we will provide you with a data export for 30 days.",
  },
  {
    title: "10. Service Availability",
    content: "We aim for 99.5% uptime but do not guarantee uninterrupted service. Scheduled maintenance windows will be announced 24 hours in advance where possible. C Commerce is not liable for losses caused by service interruptions beyond our reasonable control.",
  },
  {
    title: "11. Limitation of Liability",
    content: "C Commerce's total liability to you for any claim shall not exceed the amount you paid in subscription fees in the three months preceding the claim. We are not liable for indirect, incidental, or consequential damages including lost profits or data.",
  },
  {
    title: "12. Termination",
    content: "Either party may terminate your account at any time. We may suspend or terminate accounts for: violation of these terms; non-payment; fraudulent activity; or any legal requirement. Upon termination, your access to the platform will cease and your store will go offline.",
  },
  {
    title: "13. Changes to Terms",
    content: "We may update these Terms of Service from time to time. We will notify you of significant changes via email or a prominent notice on the platform. Your continued use of C Commerce after changes take effect constitutes your acceptance of the revised terms.",
  },
  {
    title: "14. Governing Law",
    content: "These terms are governed by the laws of the People's Republic of Bangladesh. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-slate-100 text-slate-700 border-0">Legal</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      <section className="py-14 max-w-3xl mx-auto px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 text-sm text-amber-800">
          <strong>Summary:</strong> By using C Commerce, you agree to these terms. You're responsible for your store and products. We provide the platform; you run the business. Read below for full details.
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{s.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-500">
          <p className="mb-2">If you have questions about these Terms of Service, please contact us:</p>
          <p>Email: <a href="mailto:legal@ccommerce.com.bd" className="text-blue-600 hover:underline">legal@ccommerce.com.bd</a></p>
          <p>Address: C Commerce, Dhaka, Bangladesh</p>
        </div>
      </section>
    </div>
  );
}
