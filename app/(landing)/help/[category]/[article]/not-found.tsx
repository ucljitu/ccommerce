import Link from "next/link";

export default function HelpArticleNotFound() {
  return <div className="min-h-[70vh] px-4 pt-32 text-center"><h1 className="text-3xl font-bold text-slate-900">Help Article Not Found</h1><p className="mx-auto mt-3 max-w-md text-slate-500">The article may have moved or is no longer available.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/help" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white">Return to Help Center</Link><Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700">Contact Support</Link></div></div>;
}
