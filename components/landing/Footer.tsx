import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";

const footerLinks = {
  Product: [["Features", "/features"], ["Pricing", "/pricing"], ["Demo", "/demo"], ["Changelog", "/changelog"], ["Roadmap", "/roadmap"]],
  Solutions: [["Fashion", "/solutions/fashion"], ["Electronics", "/solutions/electronics"], ["Grocery", "/solutions/grocery"], ["Restaurants", "/solutions/restaurant"], ["Local Retail", "/solutions/local-retail"]],
  Resources: [["Help Center", "/help"], ["Video Tutorials", "/tutorials"], ["API Documentation", "/docs"], ["Contact", "/contact"]],
  Company: [["About", "/about"], ["Partner Program", "/partners"], ["Privacy Policy", "/privacy"], ["Terms and Conditions", "/terms"]],
} as const;

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" aria-label="C Commerce home" className="inline-flex rounded-lg bg-white px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              <BrandLogo className="h-9 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">A simple online store platform for businesses in Bangladesh.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              <ul className="mt-4 space-y-3">
                {links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} C Commerce. All rights reserved.</p>
          <p>Designed and developed by <a href="https://creationtechbd.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Creation Tech</a></p>
        </div>
      </div>
    </footer>
  );
}
