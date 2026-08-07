import FashionShop from "@/components/storefront/FashionShop";
import { fashionProducts, FASHION_DEMO_SLUG } from "@/lib/demo-fashion-store";
import { techProducts, TECH_DEMO_SLUG } from "@/lib/demo-tech-store";
import TechShop from "@/components/storefront/TechShop";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ storeSlug: string }>;
  searchParams: Promise<{ q?: string; cat?: string; tag?: string }>;
}) {
  const { storeSlug } = await params;
  const filters = await searchParams;
  if (storeSlug === TECH_DEMO_SLUG) {
    return <TechShop products={techProducts} storeSlug={storeSlug} initialQuery={filters.q || ""} initialCategory={filters.cat || "all"} initialTag={filters.tag || ""} />;
  }
  if (storeSlug !== FASHION_DEMO_SLUG) {
    return <div className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-3xl font-bold">Shop</h1><p className="mt-3 text-slate-600">Products for this merchant store will appear here.</p></div>;
  }
  return <FashionShop products={fashionProducts} storeSlug={storeSlug} initialQuery={filters.q || ""} initialCategory={filters.cat || "all"} initialTag={filters.tag || ""} />;
}
