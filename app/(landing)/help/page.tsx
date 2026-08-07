import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, CreditCard, Mail, MessageCircle, Package, Settings, Truck } from "lucide-react";
import HelpSearch from "@/components/help/HelpSearch";
import { helpArticleHref, popularArticleSlugs, publishedArticles, publishedCategories, support } from "@/lib/help-content";

export const metadata: Metadata = {
  title: "C Commerce Help Center | Store Setup and Support Guides",
  description: "Find simple guides for setting up your C Commerce store, managing products, orders, payments, delivery and store settings.",
  alternates: { canonical: "/help" },
  openGraph: { title: "C Commerce Help Center", description: "Search guides and step-by-step instructions for managing your C Commerce online store." },
};

const icons = { "getting-started": BookOpen, products: Package, payments: CreditCard, delivery: Truck, "store-settings": Settings, "orders-reports": BarChart3 };
const popular = popularArticleSlugs.map((slug) => publishedArticles.find((item) => item.slug === slug)).filter((item) => item !== undefined);
const setupSteps = ["create-store-account", "complete-business-information", "add-first-product", "set-payments-delivery", "publish-store"].map((slug) => publishedArticles.find((item) => item.slug === slug)).filter((item) => item !== undefined);
const whatsappUrl = `https://wa.me/${support.whatsappNumber}?text=${encodeURIComponent(support.whatsappMessage)}`;

export default function HelpPage() {
  return (
    <div className="pt-16">
      <section className="bg-blue-700 px-4 py-16 text-center sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Help Center</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">How Can We Help?</h1>
        <p className="mx-auto mb-8 mt-4 max-w-xl text-blue-100">Search the Help Center or browse a topic below.</p>
        <HelpSearch />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-blue-600">Quick answers</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Popular Help Articles</h2></div></div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => <Link key={item.slug} href={helpArticleHref(item.categorySlug, item.slug)} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><p className="text-xs font-semibold text-blue-600">{item.categoryTitle}</p><h3 className="mt-2 font-semibold text-slate-900 group-hover:text-blue-700">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.summary}</p><p className="mt-4 text-xs text-slate-400">{item.readingTime} min read</p></Link>)}
        </div>
      </section>

      <section id="browse-topics" className="border-y border-slate-100 bg-slate-50 py-14 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900">Browse by Topic</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {publishedCategories.map((category) => {
              const Icon = icons[category.slug as keyof typeof icons];
              return <article key={category.slug} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon aria-hidden="true" className="h-5 w-5" /></div><h3 className="mt-4 font-semibold text-slate-900">{category.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{category.description}</p><ul className="mt-4 space-y-2">{category.articles.slice(0, 4).map((item) => <li key={item.slug}><Link href={helpArticleHref(category.slug, item.slug)} className="inline-flex min-h-8 items-center gap-2 text-sm text-slate-700 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-blue-500" />{item.title}</Link></li>)}</ul><Link href={`/help/${category.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">View All <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-9"><p className="text-sm font-semibold text-blue-600">Getting started guide</p><h2 className="mt-2 text-2xl font-bold text-slate-900">New to C Commerce?</h2><p className="mt-2 text-slate-600">Follow the setup guide to prepare your online store.</p><ol className="mt-7 grid gap-3 md:grid-cols-5">{setupSteps.map((item, index) => <li key={item.slug}><Link href={helpArticleHref(item.categorySlug, item.slug)} className="block h-full rounded-2xl bg-white p-4 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span><span className="mt-3 block text-sm font-semibold text-slate-900">{item.title}</span></Link></li>)}</ol><Link href="/help/getting-started" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">View Getting Started Guide <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
      </section>

      <section className="bg-slate-950 py-14 text-white"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 className="text-2xl font-bold">Still Need Help?</h2><p className="mx-auto mt-3 max-w-xl text-slate-300">Contact our support team if you cannot find the answer you need.</p><p className="mt-2 text-sm text-slate-400">{support.availability}</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><MessageCircle className="h-5 w-5" />Contact Support</Link><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><MessageCircle className="h-5 w-5" />WhatsApp Support</a><a href={`mailto:${support.email}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-semibold hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Mail className="h-5 w-5" />Email Support</a></div></div></section>
    </div>
  );
}
