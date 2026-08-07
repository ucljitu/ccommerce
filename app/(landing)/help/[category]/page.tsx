import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { getHelpCategory, helpArticleHref, publishedCategories } from "@/lib/help-content";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return publishedCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getHelpCategory(slug);
  if (!category) return { title: "Help Topic Not Found", robots: { index: false, follow: false } };
  return { title: `${category.title} Help | C Commerce`, description: category.description, alternates: { canonical: `/help/${category.slug}` } };
}

export default async function HelpCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getHelpCategory(slug);
  if (!category) notFound();
  return <div className="min-h-screen bg-slate-50 pt-24 pb-16"><main className="mx-auto max-w-5xl px-4 sm:px-6"><nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500"><li><Link href="/help" className="inline-flex items-center gap-1 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><Home className="h-4 w-4" />Help Center</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-slate-800">{category.title}</li></ol></nav><section className="mt-8 rounded-3xl bg-blue-700 p-7 text-white sm:p-10"><p className="text-sm font-semibold text-blue-200">Help topic</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">{category.title}</h1><p className="mt-3 max-w-2xl text-blue-100">{category.description}</p></section><section className="mt-8"><h2 className="text-xl font-bold text-slate-900">Articles in this topic</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{category.articles.map((item) => <Link key={item.slug} href={helpArticleHref(category.slug, item.slug)} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><div className="flex justify-between gap-4"><div><h3 className="font-semibold text-slate-900 group-hover:text-blue-700">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{item.summary}</p><p className="mt-4 text-xs text-slate-400">{item.readingTime} min read</p></div><ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 group-hover:text-blue-600" /></div></Link>)}</div></section><Link href="/help" className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ArrowLeft className="h-4 w-4" />Return to Help Center</Link></main></div>;
}
