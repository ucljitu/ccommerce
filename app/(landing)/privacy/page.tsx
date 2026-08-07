import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Privacy Policy — C Commerce" };

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information in the following ways:

**Account Information:** When you sign up, we collect your name, email address, phone number, business name, and payment details.

**Store Data:** Products, orders, customer records, and other content you create on our platform.

**Customer Data:** Information your store customers provide during checkout (name, address, phone number). You are the data controller of your customers' data.

**Usage Data:** How you use the platform — pages visited, features used, time spent. Collected via cookies and analytics tools.

**Device Information:** Browser type, IP address, operating system, and device identifiers.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to:

• Provide and improve the C Commerce platform
• Process payments and manage your subscription
• Send service-related communications (invoices, password resets, important updates)
• Provide customer support
• Analyze platform usage to improve features
• Comply with legal obligations
• Prevent fraud and ensure platform security

We do not sell your personal information to third parties.`,
  },
  {
    title: "3. Your Customers' Data",
    content: "As a merchant, you control the personal data of your store customers. C Commerce processes this data on your behalf as a data processor. You are responsible for obtaining necessary consents from your customers and complying with applicable data protection laws. We will only use your customers' data to provide you with the services you requested.",
  },
  {
    title: "4. Data Sharing",
    content: `We share your data only with:

**Payment Processors:** bKash, Nagad, SSLCommerz, Rocket, UddoktaPay — to process transactions. Each has their own privacy policy.

**Service Providers:** Hosting providers, analytics tools, and email services — who process data on our behalf under strict confidentiality agreements.

**Legal Requirements:** When required by Bangladeshi law, court order, or government authority.

**Business Transfers:** If C Commerce is acquired or merged, your data may transfer to the new entity under the same privacy protections.`,
  },
  {
    title: "5. Data Security",
    content: "We implement industry-standard security measures to protect your data: SSL/TLS encryption for data in transit, encrypted storage for sensitive data, regular security audits, access controls and authentication, and automatic backups. However, no system is 100% secure. We encourage you to use a strong password and keep your account credentials private.",
  },
  {
    title: "6. Cookies",
    content: "C Commerce uses cookies to maintain your session, remember your preferences, analyze platform usage, and prevent fraud. Essential cookies are required for the platform to function. Analytics and preference cookies can be managed via our Cookie Settings. See our Cookie Policy for full details.",
  },
  {
    title: "7. Data Retention",
    content: "We retain your account data for as long as your account is active. After account deletion, we retain data for 30 days to allow for recovery, then permanently delete it. Order and transaction records may be retained for up to 7 years as required by Bangladeshi financial regulations. Analytics data is retained in aggregated, anonymized form.",
  },
  {
    title: "8. Your Rights",
    content: `You have the right to:

• **Access:** Request a copy of the personal data we hold about you
• **Correction:** Request correction of inaccurate data
• **Deletion:** Request deletion of your data (subject to legal retention requirements)
• **Portability:** Export your store data in a standard format
• **Objection:** Object to certain types of processing

To exercise these rights, contact us at privacy@ccommerce.com.bd`,
  },
  {
    title: "9. Children's Privacy",
    content: "C Commerce is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it.",
  },
  {
    title: "10. International Data Transfers",
    content: "C Commerce operates primarily in Bangladesh. If you access our services from outside Bangladesh, your data may be transferred to and stored in Bangladesh. By using our services, you consent to this transfer.",
  },
  {
    title: "11. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on the platform at least 14 days before the change takes effect. Your continued use of C Commerce after changes take effect constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <div className="gradient-hero py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge className="mb-4 bg-slate-100 text-slate-700 border-0">Legal</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      <section className="py-14 max-w-3xl mx-auto px-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 text-sm text-blue-800">
          <strong>Summary:</strong> We collect data to run the platform. We don't sell your data. You own your customers' data. You can export or delete your data anytime. Contact us with any privacy concerns.
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h2>
              <div className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{s.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-500">
          <p className="mb-2">For privacy-related questions or to exercise your rights:</p>
          <p>Email: <a href="mailto:privacy@ccommerce.com.bd" className="text-blue-600 hover:underline">privacy@ccommerce.com.bd</a></p>
          <p>Address: C Commerce, Dhaka, Bangladesh</p>
        </div>
      </section>
    </div>
  );
}
