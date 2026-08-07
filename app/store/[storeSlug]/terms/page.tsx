export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      body: "By accessing and placing an order with us, you confirm that you are in agreement with and bound by these Terms and Conditions. These terms apply to the entire website and any email or other type of communication between you and us.",
    },
    {
      title: "2. Orders & Availability",
      body: "All orders are subject to availability and confirmation of the order price. We reserve the right to refuse any order you place with us. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or mobile number provided at the time the order was made.",
    },
    {
      title: "3. Pricing",
      body: "All prices shown on the website are in Bangladeshi Taka (৳). Prices are subject to change without notice. Delivery charges are calculated at checkout based on your district and delivery method selected. All prices are inclusive of applicable VAT.",
    },
    {
      title: "4. Payment",
      body: "We accept bKash, Nagad, Rocket, Credit/Debit Card via SSLCommerz, and Cash on Delivery (COD). For mobile banking payments, please send to the number provided at checkout and enter the transaction ID. COD orders must be paid in full upon delivery.",
    },
    {
      title: "5. Delivery",
      body: "Standard delivery takes 3–7 business days depending on your location. Express delivery is available in select areas within 1–2 business days. Delivery timelines may be affected during public holidays, natural disasters, or other unforeseen circumstances.",
    },
    {
      title: "6. Returns & Refunds",
      body: "Products may be returned within 7 days of delivery if they are defective, damaged, or not as described. Refer to our Return Policy for full details. Refunds are processed within 3–5 business days after the return is approved.",
    },
    {
      title: "7. Privacy",
      body: "We are committed to protecting your personal information. Your name, mobile number, and address are used solely for order processing and delivery. We do not sell or share your personal data with third parties for marketing purposes.",
    },
    {
      title: "8. Limitation of Liability",
      body: "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products purchased from us.",
    },
    {
      title: "9. Changes to Terms",
      body: "We reserve the right to update these Terms and Conditions at any time. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.",
    },
    {
      title: "10. Contact",
      body: "If you have any questions about these Terms and Conditions, please contact us via WhatsApp or email listed on our Contact page.",
    },
  ];

  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-slate-800 text-white py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-slate-400 text-sm">Last updated: June 25, 2026</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          Please read these Terms and Conditions carefully before using our website or placing an order. By using our service, you agree to these terms.
        </div>
        {sections.map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-2">{s.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
