import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export default async function StoreContactPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  await params;
  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-slate-300">We're here to help. Reach out via any channel below.</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Send a Message</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Your Name</Label><Input placeholder="Rahim Miah" /></div>
                <div className="space-y-1.5"><Label>Mobile Number</Label><Input placeholder="01XXXXXXXXX" /></div>
              </div>
              <div className="space-y-1.5"><Label>Email (Optional)</Label><Input type="email" placeholder="you@email.com" /></div>
              <div className="space-y-1.5"><Label>Subject</Label><Input placeholder="Order issue, product question..." /></div>
              <div className="space-y-1.5"><Label>Message</Label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="w-full gradient-primary text-white border-0">Send Message</Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                <h3 className="font-semibold text-slate-900">WhatsApp Support</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">Get instant responses via WhatsApp — fastest way to reach us!</p>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 w-full gap-2">
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </Button>
            </div>

            {[
              { icon: Phone, label: "Phone / Hotline", value: "01712-345678", sub: "Call between 9 AM – 9 PM" },
              { icon: Mail, label: "Email", value: "support@mystore.com", sub: "Reply within 24 hours" },
              { icon: MapPin, label: "Address", value: "Dhaka, Bangladesh", sub: "We operate online" },
              { icon: Clock, label: "Business Hours", value: "Sat–Thu, 9 AM – 9 PM", sub: "Closed on Fridays" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="font-semibold text-slate-900 text-sm">{item.value}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
