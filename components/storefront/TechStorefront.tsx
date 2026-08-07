import Image from "next/image";
import Link from "next/link";
import { Banknote, ChevronRight, Info, LifeBuoy, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "./ProductCard";
import { techBrands, techCategories, techGadgetsDemoStore, techProducts } from "@/lib/demo-tech-store";

export default function TechStorefront({ storeSlug }: { storeSlug: string }) {
  const base = `/store/${storeSlug}`;
  const deal = techProducts.find((product) => product.deal)!;
  const arrivals = techProducts.filter((product) => product.isNew).slice(0, 4);
  const featured = techProducts.filter((product) => product.featured && product.id !== deal.id).slice(0, 4);
  const recommended = techProducts.filter((product) => product.recommended).slice(0, 4);
  const benefits = [
    [Banknote, "Cash on Delivery", "Available nationwide"],
    [Truck, "Fast Delivery", techGadgetsDemoStore.delivery.estimatedTime],
    [RotateCcw, "Easy Returns", "Within 7 days"],
    [ShieldCheck, "Secure Checkout", "Safe demo experience"],
  ] as const;

  return <div className="overflow-x-clip bg-slate-50 pb-10">
    <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white">
      <div className="mx-auto grid max-w-[1536px] md:min-h-[600px] md:grid-cols-[46%_54%]">
        <div className="relative order-1 min-h-[330px] overflow-hidden md:order-2 md:min-h-[600px]"><Image src={techGadgetsDemoStore.heroImage} alt="Smartphone, laptop, earbuds, smartwatch and technology accessories" fill priority unoptimized sizes="(max-width: 768px) 100vw, 54vw" className="object-cover object-[68%_center] md:object-[72%_center]" /></div>
        <div className="order-2 flex items-center px-4 py-12 sm:px-8 md:order-1 md:px-10 lg:px-16"><div className="max-w-xl"><p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">Latest Technology</p><h1 className="mt-4 text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl">Upgrade Your Everyday Tech</h1><p className="mt-6 max-w-lg text-base leading-7 text-blue-100 sm:text-lg">Shop smartphones, accessories, audio devices and smart gadgets from one trusted demo store.</p><div className="mt-8 flex flex-wrap gap-3"><Link href={`${base}/shop?tag=new`} className="inline-flex min-h-12 items-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-500">Shop New Arrivals</Link><Link href={`${base}/shop?tag=sale`} className="inline-flex min-h-12 items-center rounded-lg border border-white/40 px-6 text-sm font-semibold text-white hover:bg-white/10">Explore Deals</Link></div></div></div>
      </div>
    </section>

    <section aria-label="Shopping benefits" className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">{benefits.map(([Icon, title, detail]) => <div key={title} className="flex gap-3 border-slate-200 px-2 py-5 sm:px-5 lg:border-r last:border-r-0"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><div><p className="text-sm font-semibold text-slate-950">{title}</p><p className="text-xs text-slate-500">{detail}</p></div></div>)}</div></section>

    <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
      <section aria-labelledby="tech-categories"><SectionHeading eyebrow="Browse Products" title="Shop by Category" /><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{techCategories.map((category) => <Link key={category.name} href={`${base}/shop?cat=${category.name.toLowerCase().replaceAll(" ", "-")}`} className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-300"><div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50"><Image src={category.image} alt={`${category.name} category`} fill unoptimized sizes="(max-width: 640px) 50vw, 17vw" className="object-cover transition-transform duration-300 group-hover:scale-105" /></div><h3 className="mt-3 text-sm font-semibold text-slate-950">{category.name}</h3><p className="mt-1 line-clamp-2 text-xs text-slate-500">{category.description}</p><p className="mt-2 text-xs font-semibold text-blue-600">{category.count} products</p></Link>)}</div></section>

      <section aria-labelledby="brands-title"><h2 id="brands-title" className="text-center text-2xl font-bold text-slate-950">Popular Brands</h2><div className="mt-6 flex flex-wrap justify-center gap-3">{techBrands.map((brand) => <Link href={`${base}/shop?q=${encodeURIComponent(brand)}`} key={brand} className="flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600">{brand}</Link>)}</div></section>

      <section className="grid overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-lg md:grid-cols-2"><div className="relative min-h-[360px] bg-slate-50"><Image src={deal.image} alt={deal.alt} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-10" /></div><div className="flex flex-col justify-center bg-gradient-to-br from-blue-950 to-slate-950 p-8 text-white sm:p-12"><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Limited-Time Offer</p><h2 className="mt-3 text-4xl font-bold">Deal of the Day</h2><p className="mt-5 text-sm font-semibold text-blue-200">{deal.brand}</p><h3 className="mt-1 text-2xl font-semibold">{deal.name}</h3><p className="mt-3 text-blue-100">{deal.specification}</p><div className="mt-5 flex items-baseline gap-3"><span className="text-3xl font-bold">৳{deal.salePrice?.toLocaleString()}</span><span className="text-lg text-slate-400 line-through">৳{deal.price.toLocaleString()}</span><span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-200">{Math.round((1 - (deal.salePrice ?? deal.price) / deal.price) * 100)}% OFF</span></div><p className="mt-4 text-sm font-medium text-emerald-300">In Stock</p><Link href={`${base}/product/${deal.id}`} className="mt-7 inline-flex min-h-12 w-fit items-center rounded-lg bg-blue-600 px-6 font-semibold text-white hover:bg-blue-500">View Details</Link></div></section>

      <TechProductSection title="New Arrivals" description="Explore the latest gadgets and accessories added to our store." products={arrivals} storeSlug={storeSlug} href={`${base}/shop?tag=new`} />

      <section className="grid gap-5 md:grid-cols-2"><Promo image="/demo-tech/anker-charger.jpg" title="Power Up Your Devices" description="Explore chargers, cables and power banks." href={`${base}/shop?cat=mobile-accessories`} /><Promo image="/demo-tech/gaming-keyboard.jpg" title="Upgrade Your Setup" description="Discover computer and gaming accessories." href={`${base}/shop?cat=gaming`} /></section>

      <TechProductSection title="Featured Products" description="Useful technology selected from across our demo catalogue." products={featured} storeSlug={storeSlug} href={`${base}/shop`} />
      <TechProductSection title="Recommended Products" description="Practical accessories for work, study and everyday use." products={recommended} storeSlug={storeSlug} href={`${base}/shop`} />

      <section className="rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:p-12"><SectionHeading eyebrow="Shop with confidence" title="Why Shop with Tech Gadgets BD?" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck, "Carefully Selected Products"], [Info, "Clear Product Information"], [Truck, "Delivery Across Bangladesh"], [LifeBuoy, "Easy Customer Support"]].map(([Icon, title]) => { const C = Icon as typeof ShieldCheck; return <div key={String(title)} className="rounded-2xl bg-slate-50 p-5"><C className="h-6 w-6 text-blue-600" /><h3 className="mt-4 font-semibold text-slate-950">{String(title)}</h3></div>; })}</div></section>
    </div>
  </div>;
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2></div>; }
function TechProductSection({ title, description, products, storeSlug, href }: { title: string; description: string; products: typeof techProducts; storeSlug: string; href: string }) { return <section><div className="mb-8 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2><p className="mt-2 text-slate-600">{description}</p></div><Link href={href} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 sm:flex">View All <ChevronRight className="h-4 w-4" /></Link></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={{ ...product, storeSlug }} />)}</div></section>; }
function Promo({ image, title, description, href }: { image: string; title: string; description: string; href: string }) { return <Link href={href} className="group relative min-h-[270px] overflow-hidden rounded-3xl bg-slate-900"><Image src={image} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-45 transition-transform duration-300 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" /><div className="relative flex min-h-[270px] max-w-sm flex-col justify-center p-8 text-white"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 text-slate-300">{description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">Shop Now <ChevronRight className="h-4 w-4" /></span></div></Link>; }
