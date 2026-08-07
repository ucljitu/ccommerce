"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStorefrontCart } from "./StorefrontCartProvider";

export interface Product {
  id: string;
  name: string;
  category?: string;
  brand?: string;
  specification?: string;
  price: number;
  salePrice?: number;
  image: string;
  alt?: string;
  inStock: boolean;
  storeSlug: string;
  variants?: { size?: string[]; color?: string[] };
  isNew?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const cart = useStorefrontCart();
  const wished = cart.wishlist.includes(product.id);
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  const currentPrice = product.salePrice ?? product.price;
  const requiresOptions = Boolean(product.variants?.size?.length || (product.variants?.color?.length ?? 0) > 1);
  const href = `/store/${product.storeSlug}/product/${product.id}`;
  const isTech = product.storeSlug === "demo-tech-gadgets";
  const accent = isTech ? "#2563eb" : "#7b263a";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <div className={`relative overflow-hidden ${isTech ? "aspect-square bg-slate-50" : "aspect-[4/5] bg-[#f4efe7]"}`}>
        <Link href={href} aria-label={`View ${product.name}`}>
          <Image src={product.image} alt={product.alt || product.name} fill unoptimized sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]" />
        </Link>
        <button type="button" aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`} aria-pressed={wished} onClick={() => cart.toggleWishlist(product.id)}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 md:opacity-0 md:group-hover:opacity-100" style={{ "--tw-ring-color": accent } as React.CSSProperties}>
          <Heart className={`h-4 w-4 ${wished ? "fill-red-500 text-red-500" : ""}`} />
        </button>
        {discount > 0 && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${isTech ? "bg-blue-600" : "bg-[#7b263a]"}`}>{discount}% OFF</span>}
        {product.isNew && !discount && <span className="absolute left-3 top-3 rounded-full bg-[#172033] px-2.5 py-1 text-xs font-semibold text-white">New</span>}
        {!product.inStock && <div className="absolute inset-0 flex items-center justify-center bg-white/70"><span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">Out of Stock</span></div>}
      </div>
      <div className="p-3.5 sm:p-4">
        {(product.brand || product.category) && <p className={`mb-1 text-xs font-semibold uppercase tracking-[0.14em] ${isTech ? "text-blue-600" : "text-[#7b263a]"}`}>{product.brand || product.category}</p>}
        <Link href={href}><h3 className={`mb-2 line-clamp-2 min-h-10 text-[15px] font-medium leading-5 text-[#172033] ${isTech ? "hover:text-blue-600" : "hover:text-[#7b263a]"}`}>{product.name}</h3></Link>
        {product.specification && <p className="mb-2 line-clamp-1 text-xs text-slate-500">{product.specification}</p>}
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-[#172033]">৳{currentPrice.toLocaleString()}</span>
          {product.salePrice && <span className="text-sm text-slate-400 line-through">৳{product.price.toLocaleString()}</span>}
        </div>
        {requiresOptions ? (
          <Button asChild variant="outline" className="min-h-11 w-full border-[#172033] text-[#172033] hover:bg-[#172033] hover:text-white"><Link href={href}>Select Options</Link></Button>
        ) : (
          <Button type="button" disabled={!product.inStock} onClick={() => cart.add({ productId: product.id, name: product.name, image: product.image, price: currentPrice })}
            className={`min-h-11 w-full gap-2 text-white ${isTech ? "bg-blue-600 hover:bg-blue-700" : "bg-[#172033] hover:bg-[#7b263a]"}`}>
            <ShoppingBag className="h-4 w-4" />{product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </div>
    </article>
  );
}
