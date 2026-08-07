"use client";

import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { helpArticleHref, publishedArticles } from "@/lib/help-content";

const suggestions = [
  ["Add a product", "add-first-product"],
  ["Set delivery charges", "set-delivery-charges"],
  ["Connect a custom domain", "connect-custom-domain"],
  ["Manage an order", "view-orders"],
] as const;

function mark(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0 || !query) return text;
  return <>{text.slice(0, index)}<mark className="rounded bg-blue-100 text-inherit">{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>;
}

export default function HelpSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(input.trim()), 180);
    return () => window.clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return publishedArticles
      .map((item) => {
        const fields = [item.title, item.summary, item.categoryTitle, ...item.keywords].join(" ").toLowerCase();
        return { item, score: terms.reduce((total, term) => total + (fields.includes(term) ? 1 : 0), 0) };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 7)
      .map(({ item }) => item);
  }, [query]);

  const chooseSuggestion = (value: string) => {
    setInput(value);
    setQuery(value);
    setOpen(true);
    setActive(-1);
  };

  return (
    <div ref={wrapper} className="relative mx-auto max-w-2xl">
      <form role="search" onSubmit={(event) => { event.preventDefault(); setQuery(input.trim()); setOpen(true); }} className="relative">
        <label htmlFor="help-search" className="sr-only">Search the Help Center</label>
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          id="help-search"
          value={input}
          onChange={(event) => { setInput(event.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => input.length >= 2 && setOpen(true)}
          onKeyDown={(event) => {
            if (!open || !results.length) return;
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((current) => (current + 1) % results.length); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive((current) => (current - 1 + results.length) % results.length); }
            if (event.key === "Escape") setOpen(false);
            if (event.key === "Enter" && active >= 0) {
              event.preventDefault();
              window.location.href = helpArticleHref(results[active].categorySlug, results[active].slug);
            }
          }}
          placeholder="Search for help, for example “add a product”"
          aria-expanded={open && query.length >= 2}
          aria-controls="help-search-results"
          aria-activedescendant={active >= 0 ? `help-result-${active}` : undefined}
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          className="h-14 w-full rounded-2xl border-0 bg-white pl-12 pr-12 text-base text-slate-900 shadow-xl outline-none placeholder:text-slate-400 focus-visible:ring-4 focus-visible:ring-blue-300"
        />
        {input && <button type="button" onClick={() => { setInput(""); setQuery(""); setOpen(false); }} aria-label="Clear search" className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><X className="h-5 w-5" /></button>}
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Suggested searches">
        {suggestions.map(([label]) => <button key={label} type="button" onClick={() => chooseSuggestion(label)} className="min-h-11 rounded-full border border-blue-400/40 bg-blue-700 px-4 py-2 text-sm text-blue-50 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{label}</button>)}
      </div>

      <div id="help-search-status" className="sr-only" aria-live="polite">{query.length >= 2 ? `${results.length} help articles found` : ""}</div>
      {open && query.length >= 2 && (
        <div id="help-search-results" role="listbox" aria-label="Help search results" className="absolute z-30 mt-3 max-h-[28rem] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-2xl">
          {results.length ? results.map((item, index) => (
            <Link
              id={`help-result-${index}`}
              role="option"
              aria-selected={active === index}
              key={`${item.categorySlug}-${item.slug}`}
              href={helpArticleHref(item.categorySlug, item.slug)}
              onMouseEnter={() => setActive(index)}
              className={`flex min-h-20 items-start justify-between gap-4 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${active === index ? "bg-blue-50" : "hover:bg-slate-50"}`}
            >
              <span><span className="block text-xs font-semibold text-blue-600">{item.categoryTitle}</span><span className="mt-0.5 block font-semibold text-slate-900">{mark(item.title, query)}</span><span className="mt-1 block text-sm text-slate-500">{mark(item.summary, query)}</span></span>
              <ArrowRight aria-hidden="true" className="mt-6 h-4 w-4 shrink-0 text-slate-400" />
            </Link>
          )) : (
            <div className="p-6 text-center"><p className="font-semibold text-slate-900">No Help Articles Found</p><p className="mt-1 text-sm text-slate-500">Try a different word or browse the topics below.</p><button type="button" onClick={() => { setOpen(false); document.getElementById("browse-topics")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 min-h-11 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Browse All Topics</button></div>
          )}
        </div>
      )}
    </div>
  );
}
