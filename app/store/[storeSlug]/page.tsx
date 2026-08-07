import Image from "next/image";
import Link from "next/link";
import { Banknote, ChevronRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import ProductCard, { Product } from "@/components/storefront/ProductCard";
import { demoFashionStore, fashionCategories, fashionProducts, FASHION_DEMO_SLUG } from "@/lib/demo-fashion-store";
import { TECH_DEMO_SLUG } from "@/lib/demo-tech-store";
import TechStorefront from "@/components/storefront/TechStorefront";

const benefits = [
  { icon: Banknote, title: "Cash on Delivery", detail: "Available nationwide" },
  { icon: Truck, title: "Free Delivery", detail: "Above ৳2,000" },
  { icon: RotateCcw, title: "Easy Returns", detail: "Within 7 days" },
  { icon: ShieldCheck, title: "Secure Checkout", detail: "Safe demo experience" },
];

function card(product: (typeof fashionProducts)[number], storeSlug: string): Product {
  return { ...product, storeSlug };
}

export default async function StorePage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const base = `/store/${storeSlug}`;
  if (storeSlug === TECH_DEMO_SLUG) return <TechStorefront storeSlug={storeSlug} />;
  if (storeSlug !== FASHION_DEMO_SLUG) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">Welcome to your store</h1><Link className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-slate-900 px-6 text-white" href={`${base}/shop`}>Browse Products</Link></div>;
  }
  const sale = fashionProducts.filter((product) => product.salePrice).slice(0, 4);
  const arrivals = fashionProducts.filter((product) => product.isNew).slice(0, 4);
  const recommended = fashionProducts.filter((product) => product.recommended).slice(0, 4);

  return (
    <div className="overflow-x-clip pb-10">
      <section className="bg-[#f2e5d3]">
        <div className="mx-auto grid max-w-[1536px] md:min-h-[600px] md:grid-cols-[46%_54%]">
          <div className="relative order-1 min-h-[340px] overflow-hidden md:order-2 md:min-h-[600px]">
            <Image src={demoFashionStore.heroImage} alt="Dhaka Fashion Hub new season collection" fill priority unoptimized sizes="(max-width: 768px) 100vw, 54vw" className="object-cover object-[70%_center] md:object-[75%_center]" />
          </div>
          <div className="order-2 flex items-center px-4 py-12 sm:px-8 md:order-1 md:px-10 lg:px-16">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#7b263a]">New Season Collection</p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#172033] sm:text-6xl lg:text-7xl">Style Made for Every Day</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-700 sm:text-lg">Explore modern clothing and accessories selected for comfort, confidence and everyday life.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${base}/shop?tag=new`} className="inline-flex min-h-12 items-center justify-center bg-[#172033] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#7b263a]">Shop New Arrivals</Link>
              <Link href="#collections" className="inline-flex min-h-12 items-center justify-center border border-[#172033] bg-white/60 px-6 text-sm font-semibold text-[#172033] hover:bg-white">Explore Collections</Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section aria-label="Shopping benefits" className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {benefits.map(({ icon: Icon, title, detail }) => <div key={title} className="flex gap-3 border-stone-200 px-2 py-5 sm:px-5 lg:border-r last:border-r-0"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#7b263a]" /><div><p className="text-sm font-semibold text-[#172033]">{title}</p><p className="text-xs text-slate-500">{detail}</p></div></div>)}
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <section aria-labelledby="categories-title">
          <div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7b263a]">Find your style</p><h2 id="categories-title" className="mt-2 font-serif text-3xl font-semibold text-[#172033] sm:text-4xl">Shop by Category</h2></div><Link href={`${base}/shop`} className="hidden items-center gap-1 text-sm font-semibold text-[#7b263a] sm:flex">View All <ChevronRight className="h-4 w-4" /></Link></div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {fashionCategories.map((category) => <Link key={category.name} href={`${base}/shop?cat=${category.name.toLowerCase()}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#eee8df]"><Image src={category.image} alt={`${category.name} fashion collection`} fill unoptimized sizes="(max-width: 640px) 50vw, 17vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="mt-3"><h3 className="font-semibold text-[#172033]">{category.name}</h3><p className="text-sm text-slate-500">{category.count} products</p></div>
            </Link>)}
          </div>
        </section>

        <section id="collections" aria-labelledby="collections-title">
          <div className="mb-8 text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7b263a]">Curated edits</p><h2 id="collections-title" className="mt-2 font-serif text-3xl font-semibold text-[#172033] sm:text-4xl">Featured Collections</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {demoFashionStore.collections.map((collection) => <Link key={collection.id} href={`${base}/shop?${collection.query}`} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={collection.image} alt={collection.title} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white"><h3 className="font-serif text-2xl font-semibold">{collection.title}</h3><p className="mt-1 text-sm text-white/80">{collection.description}</p><span className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4">Shop Collection</span></div>
            </Link>)}
          </div>
        </section>

        <ProductSection title="Limited-Time Offers" description="Selected styles at special demo prices." products={sale} storeSlug={storeSlug} href={`${base}/shop?tag=sale`} />

        <section className="relative min-h-[390px] overflow-hidden rounded-3xl bg-[#172033]">
          <Image src="/demo-fashion/collection-eid.jpg" alt="Festive fashion collection" fill unoptimized sizes="100vw" className="object-cover object-center opacity-55 md:object-[70%_35%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172033] via-[#172033]/85 to-transparent" />
          <div className="relative flex min-h-[390px] max-w-xl flex-col justify-center p-8 text-white sm:p-12"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e3c9ae]">Special Collection</p><h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">Celebrate in Style</h2><p className="mt-4 max-w-md leading-7 text-white/80">Explore festive fashion for women, men and kids.</p><Link href={`${base}/shop?collection=eid`} className="mt-7 inline-flex min-h-12 w-fit items-center bg-white px-6 text-sm font-semibold text-[#172033]">Shop the Collection</Link></div>
        </section>

        <ProductSection title="New Arrivals" description="Fresh styles recently added to Dhaka Fashion Hub." products={arrivals} storeSlug={storeSlug} href={`${base}/shop?tag=new`} />
        <ProductSection title="Recommended for You" description="Versatile pieces selected for everyday wardrobes." products={recommended} storeSlug={storeSlug} href={`${base}/shop`} />
      </div>
    </div>
  );
}

function ProductSection({ title, description, products, storeSlug, href }: { title: string; description: string; products: typeof fashionProducts; storeSlug: string; href: string }) {
  return <section aria-labelledby={`${title.replaceAll(" ", "-")}-title`}>
    <div className="mb-8 flex items-end justify-between gap-4"><div><h2 id={`${title.replaceAll(" ", "-")}-title`} className="font-serif text-3xl font-semibold text-[#172033] sm:text-4xl">{title}</h2><p className="mt-2 text-slate-600">{description}</p></div><Link href={href} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#7b263a] sm:flex">View All <ChevronRight className="h-4 w-4" /></Link></div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={card(product, storeSlug)} />)}</div>
  </section>;
}
