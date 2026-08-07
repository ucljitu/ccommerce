import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/storefront/ProductCard";
import FashionProductDetail from "@/components/storefront/FashionProductDetail";
import { fashionProducts, FASHION_DEMO_SLUG, getFashionProduct } from "@/lib/demo-fashion-store";
import { getTechProduct, techProducts, TECH_DEMO_SLUG } from "@/lib/demo-tech-store";
import TechProductDetail from "@/components/storefront/TechProductDetail";

export default async function ProductPage({ params }: { params: Promise<{ storeSlug: string; id: string }> }) {
  const { storeSlug, id } = await params;
  const base = `/store/${storeSlug}`;
  const techProduct = storeSlug === TECH_DEMO_SLUG ? getTechProduct(id) : undefined;
  if (techProduct) {
    const relatedTech = techProducts.filter((item) => item.category === techProduct.category && item.id !== techProduct.id).slice(0, 4);
    return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-1.5 text-sm text-slate-500"><Link href={base}>Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href={`${base}/shop?cat=${techProduct.category.toLowerCase().replaceAll(" ", "-")}`}>{techProduct.category}</Link><ChevronRight className="h-3.5 w-3.5" /><span className="line-clamp-1 text-slate-800">{techProduct.name}</span></nav><TechProductDetail product={techProduct} storeSlug={storeSlug} />{relatedTech.length > 0 && <section className="mt-20"><h2 className="mb-7 text-3xl font-bold text-slate-950">Related Products</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{relatedTech.map((item) => <ProductCard key={item.id} product={{ ...item, storeSlug }} />)}</div></section>}</main>;
  }
  const product = storeSlug === FASHION_DEMO_SLUG ? getFashionProduct(id) : undefined;
  if (!product) return <div className="mx-auto max-w-7xl px-4 py-20 text-center"><h1 className="text-2xl font-semibold">Product not found</h1><Link href={`${base}/shop`} className="mt-5 inline-flex min-h-11 items-center bg-slate-900 px-5 text-white">Return to Shop</Link></div>;
  const related = fashionProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-1.5 text-sm text-slate-500"><Link href={base}>Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href={`${base}/shop?cat=${product.category.toLowerCase()}`}>{product.category}</Link><ChevronRight className="h-3.5 w-3.5" /><span className="line-clamp-1 text-slate-800">{product.name}</span></nav>
    <FashionProductDetail product={product} storeSlug={storeSlug} />
    <section className="mt-20"><h2 className="mb-7 font-serif text-3xl font-semibold text-[#172033]">Related Products</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={{ ...item, storeSlug }} />)}</div></section>
  </main>;
}
