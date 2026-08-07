export const demoStores = [
  {
    id: "fashion",
    name: "Dhaka Fashion Hub",
    slug: "demo-dhaka-fashion",
    category: "Fashion",
    description: "Clothing, accessories and fashion products.",
    visual: "from-rose-100 to-pink-200",
  },
  {
    id: "electronics",
    name: "Tech Gadgets BD",
    slug: "demo-tech-gadgets",
    category: "Electronics",
    description: "Phones, gadgets and technology accessories.",
    visual: "from-blue-100 to-indigo-200",
  },
  {
    id: "agro",
    name: "Green Agro Store",
    slug: "demo-green-agro",
    category: "Food and Agro",
    description: "Food, agro products and seeds.",
    visual: "from-emerald-100 to-green-200",
  },
  {
    id: "baby",
    name: "Baby World Shop",
    slug: "demo-baby-world",
    category: "Baby and Kids",
    description: "Baby clothes, toys and accessories.",
    visual: "from-amber-100 to-orange-200",
  },
] as const;

export function getDemoStore(storeSlug: string) {
  return demoStores.find((store) => store.slug === storeSlug);
}

export function isDemoStore(storeSlug: string) {
  return Boolean(getDemoStore(storeSlug));
}
