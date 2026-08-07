import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Share2, MessageCircle } from "lucide-react";

interface StoreFooterProps {
  storeName: string;
  storeSlug: string;
  phone?: string;
  email?: string;
  address?: string;
  isDemo?: boolean;
  isFashion?: boolean;
  isTech?: boolean;
}

export default function StoreFooter({ storeName, storeSlug, phone, email, address, isDemo = false, isFashion = false, isTech = false }: StoreFooterProps) {
  const base = `/store/${storeSlug}`;
  if (isFashion) return (
    <footer className="bg-[#172033] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={base} aria-label={`${storeName} home`} className="inline-flex rounded-lg bg-white p-2">
              <Image src="/demo-fashion/dhaka-fashion-hub-logo.png" alt="Dhaka Fashion Hub" width={529} height={225} unoptimized className="h-auto w-48 object-contain" />
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">Modern clothing, footwear and accessories for everyday style.</p>
          </div>
          <FooterColumn title="Shop" links={[["New Arrivals", `${base}/shop?tag=new`], ["Women", `${base}/shop?cat=women`], ["Men", `${base}/shop?cat=men`], ["Kids", `${base}/shop?cat=kids`], ["Sale", `${base}/shop?tag=sale`]]} />
          <FooterColumn title="Customer Care" links={[["Contact Us", `${base}/contact`], ["Track Order", `${base}/track-order`], ["Return Policy", `${base}/return-policy`], ["Delivery Information", `${base}/terms`]]} />
          <FooterColumn title="About" links={[["About Us", `${base}/about`], ["Terms and Conditions", `${base}/terms`], ["My Account", `${base}/account`]]} />
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs leading-6 text-slate-400"><p>© 2026 {storeName}. All rights reserved.</p><p>Powered by <span className="text-white">C Commerce</span> · Designed and developed by <a href="https://creationtechbd.com/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">Creation Tech</a></p></div>
      </div>
    </footer>
  );
  if (isTech) return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div><Link href={base} className="inline-flex items-center gap-2 text-xl font-bold text-white"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-black">TG</span>{storeName}</Link><p className="mt-4 text-sm leading-6 text-slate-400">Smartphones, accessories, computers and gadgets for everyday technology needs.</p></div>
          <FooterColumn title="Shop" links={[["New Arrivals", `${base}/shop?tag=new`], ["Smartphones", `${base}/shop?cat=smartphones`], ["Accessories", `${base}/shop?cat=mobile-accessories`], ["Audio", `${base}/shop?cat=audio`], ["Computers", `${base}/shop?cat=computers`], ["Deals", `${base}/shop?tag=sale`]]} />
          <FooterColumn title="Customer Care" links={[["Contact Us", `${base}/contact`], ["Track Order", `${base}/track-order`], ["Delivery Information", `${base}/terms`], ["Return Policy", `${base}/return-policy`]]} />
          <FooterColumn title="Information" links={[["About Us", `${base}/about`], ["Terms and Conditions", `${base}/terms`], ["My Account", `${base}/account`]]} />
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs leading-6 text-slate-400"><p>© 2026 {storeName}. All rights reserved.</p><p>Powered by <span className="text-white">C Commerce</span> · Designed and developed by <a href="https://creationtechbd.com/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">Creation Tech</a></p></div>
      </div>
    </footer>
  );
  return (
    <footer className="bg-slate-900 text-slate-300 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">{storeName}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{isDemo ? "A sample storefront for exploring C Commerce. No real orders or payments are processed." : "Your trusted online store in Bangladesh. Quality products, fast delivery, easy returns."}</p>
            <div className="flex gap-2">
              {[Share2, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[["Home", base], ["Shop", `${base}/shop`], ["Track Order", `${base}/track-order`], ["My Account", `${base}/account`]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Policies</h4>
            <ul className="space-y-2">
              {[["Terms & Conditions", `${base}/terms`], ["Return Policy", `${base}/return-policy`], ["Privacy Policy", `${base}/privacy`], ["About Us", `${base}/about`]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              {phone && <li className="flex items-center gap-2 text-sm text-slate-400"><Phone className="w-4 h-4 shrink-0" />{phone}</li>}
              {email && <li className="flex items-center gap-2 text-sm text-slate-400"><Mail className="w-4 h-4 shrink-0" />{email}</li>}
              {address && <li className="flex items-start gap-2 text-sm text-slate-400"><MapPin className="w-4 h-4 shrink-0 mt-0.5" />{address}</li>}
            </ul>
            {/* Payment badges */}
            {!isDemo && <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">We Accept</p>
              <div className="flex flex-wrap gap-1.5">
                {["bKash", "Nagad", "COD", "Card"].map(m => (
                  <span key={m} className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400">{m}</span>
                ))}
              </div>
            </div>}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {storeName}. All rights reserved. Powered by <span className="text-blue-400">C Commerce</span> · Design & Developed by{" "}
          <a href="https://creationtechbd.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Creation Tech</a></p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return <div><h3 className="font-semibold text-white">{title}</h3><ul className="mt-4 space-y-3">{links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-slate-400 hover:text-white">{label}</Link></li>)}</ul></div>;
}
