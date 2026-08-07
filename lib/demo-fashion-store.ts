export const FASHION_DEMO_SLUG = "demo-dhaka-fashion";

export type FashionProduct = {
  id: string;
  name: string;
  category: "Women" | "Men" | "Kids" | "Footwear" | "Bags" | "Accessories";
  price: number;
  salePrice?: number;
  image: string;
  alt: string;
  inStock: boolean;
  isNew?: boolean;
  recommended?: boolean;
  variants?: { size?: string[]; color?: string[] };
  shortDescription: string;
  details: string[];
};

export const demoFashionStore = {
  name: "Dhaka Fashion Hub",
  tagline: "Modern Fashion for Everyday Style",
  category: "Fashion and Lifestyle",
  description: "Discover stylish clothing, footwear and accessories selected for modern lifestyles in Bangladesh.",
  colors: { primary: "#172033", accent: "#7b263a", background: "#faf8f4" },
  contact: { phone: "", whatsapp: "", email: "", address: "" },
  delivery: { freeDeliveryThreshold: 2000, standardCharge: 60, estimatedTime: "3–5 business days" },
  heroImage: "/demo-fashion/hero.png",
  logo: "/demo-fashion/dhaka-fashion-hub-logo.png",
  collections: [
    { id: "new", title: "New Arrivals", description: "Fresh silhouettes for the season.", image: "/demo-fashion/collection-new-arrivals.jpg", query: "tag=new" },
    { id: "eid", title: "Eid Collection", description: "Refined festive styles for every celebration.", image: "/demo-fashion/collection-eid.jpg", query: "collection=eid" },
    { id: "essentials", title: "Everyday Essentials", description: "Easy pieces designed for daily comfort.", image: "/demo-fashion/collection-essentials.jpg", query: "collection=essentials" },
  ],
} as const;

export const fashionProducts: FashionProduct[] = [
  { id: "f1", name: "Embroidered Cotton Kurti", category: "Women", price: 1850, salePrice: 1550, image: "/demo-fashion/embroidered-kurti.jpg", alt: "Burgundy embroidered cotton kurti", inStock: true, isNew: true, variants: { size: ["S", "M", "L", "XL"], color: ["Burgundy"] }, shortDescription: "A breathable cotton kurti finished with refined embroidery.", details: ["Soft cotton fabric", "Embroidered neckline and cuffs", "Comfortable everyday fit"] },
  { id: "f2", name: "Printed Lawn Three-Piece", category: "Women", price: 3200, salePrice: 2750, image: "/demo-fashion/lawn-three-piece.jpg", alt: "Teal printed lawn three-piece set", inStock: true, variants: { size: ["S", "M", "L"], color: ["Teal"] }, shortDescription: "A coordinated printed lawn set for polished warm-weather dressing.", details: ["Three-piece set", "Lightweight lawn fabric", "Printed dupatta included"] },
  { id: "f3", name: "Premium Georgette Hijab", category: "Accessories", price: 650, image: "/demo-fashion/georgette-hijab.jpg", alt: "Cream premium georgette hijab", inStock: true, isNew: true, variants: { color: ["Cream", "Rose", "Charcoal"] }, shortDescription: "Lightweight georgette with an elegant fluid drape.", details: ["Breathable georgette", "Soft non-slip texture", "Everyday coverage"] },
  { id: "f4", name: "Linen Casual Top", category: "Women", price: 1450, image: "/demo-fashion/linen-top.jpg", alt: "Rust linen casual top", inStock: true, recommended: true, variants: { size: ["S", "M", "L"], color: ["Rust"] }, shortDescription: "A relaxed linen-blend top designed for effortless layering.", details: ["Linen-blend fabric", "Relaxed silhouette", "Roll-tab sleeves"] },
  { id: "f5", name: "Classic Cotton Panjabi", category: "Men", price: 2400, salePrice: 1990, image: "/demo-fashion/cotton-panjabi.jpg", alt: "Charcoal classic cotton panjabi", inStock: true, isNew: true, variants: { size: ["M", "L", "XL", "XXL"], color: ["Charcoal"] }, shortDescription: "A clean, versatile panjabi cut from comfortable cotton.", details: ["Premium cotton", "Subtle placket detail", "Regular fit"] },
  { id: "f6", name: "Premium Oxford Shirt", category: "Men", price: 1750, image: "/demo-fashion/oxford-shirt.jpg", alt: "Light blue premium Oxford shirt", inStock: true, recommended: true, variants: { size: ["M", "L", "XL"], color: ["Sky Blue"] }, shortDescription: "A crisp Oxford shirt that moves easily from work to weekend.", details: ["Cotton Oxford weave", "Button-down collar", "Regular fit"] },
  { id: "f7", name: "Slim-Fit Chino Trousers", category: "Men", price: 1950, image: "/demo-fashion/chino-trousers.jpg", alt: "Beige slim-fit chino trousers", inStock: true, variants: { size: ["30", "32", "34", "36"], color: ["Beige"] }, shortDescription: "Versatile stretch chinos with a modern tapered line.", details: ["Cotton stretch twill", "Slim fit", "Four-pocket design"] },
  { id: "f8", name: "Everyday Cotton T-Shirt", category: "Men", price: 850, image: "/demo-fashion/cotton-tshirt.jpg", alt: "Cream everyday cotton T-shirt", inStock: true, isNew: true, variants: { size: ["S", "M", "L", "XL"], color: ["Cream"] }, shortDescription: "A soft cotton staple with a clean, easy fit.", details: ["Combed cotton", "Crew neck", "Regular fit"] },
  { id: "f9", name: "Girls Floral Party Dress", category: "Kids", price: 1650, image: "/demo-fashion/girls-party-dress.jpg", alt: "Girls cream floral party dress", inStock: true, isNew: true, variants: { size: ["4Y", "6Y", "8Y", "10Y"] }, shortDescription: "A charming floral dress made for celebrations.", details: ["Soft lined fabric", "Floral print", "Bow waist detail"] },
  { id: "f10", name: "Boys Panjabi Set", category: "Kids", price: 1450, image: "/demo-fashion/boys-panjabi-set.jpg", alt: "Boys navy panjabi and trouser set", inStock: true, variants: { size: ["4Y", "6Y", "8Y", "10Y"] }, shortDescription: "A comfortable coordinated panjabi set for festive days.", details: ["Two-piece set", "Soft cotton blend", "Embroidered placket"] },
  { id: "f11", name: "Women’s Casual Handbag", category: "Bags", price: 2250, image: "/demo-fashion/casual-handbag.jpg", alt: "Tan women's casual handbag", inStock: true, recommended: true, shortDescription: "A structured everyday handbag with generous storage.", details: ["Textured vegan leather", "Zip closure", "Interior pockets"] },
  { id: "f12", name: "Men’s Leather Wallet", category: "Accessories", price: 950, image: "/demo-fashion/leather-wallet.jpg", alt: "Brown men's leather wallet", inStock: true, recommended: true, shortDescription: "A compact bifold wallet with a timeless finish.", details: ["Genuine leather", "Multiple card slots", "Slim profile"] },
  { id: "f13", name: "Classic Women’s Sandals", category: "Footwear", price: 1650, image: "/demo-fashion/womens-sandals.jpg", alt: "Burgundy women's classic sandals", inStock: true, variants: { size: ["36", "37", "38", "39", "40"], color: ["Burgundy"] }, shortDescription: "Comfortable flat sandals with polished everyday appeal.", details: ["Cushioned footbed", "Adjustable ankle strap", "Durable outsole"] },
  { id: "f14", name: "Minimalist Wrist Watch", category: "Accessories", price: 2800, image: "/demo-fashion/wrist-watch.jpg", alt: "Minimalist gold-tone wrist watch", inStock: true, recommended: true, shortDescription: "A refined minimalist watch for understated styling.", details: ["Quartz movement", "Stainless steel mesh strap", "Splash resistant"] },
];

export const fashionCategories = [
  { name: "Women", image: fashionProducts[0].image },
  { name: "Men", image: fashionProducts[4].image },
  { name: "Kids", image: fashionProducts[8].image },
  { name: "Footwear", image: fashionProducts[12].image },
  { name: "Bags", image: fashionProducts[10].image },
  { name: "Accessories", image: fashionProducts[13].image },
].map((category) => ({ ...category, count: fashionProducts.filter((product) => product.category === category.name).length }));

export function getFashionProduct(id: string) {
  return fashionProducts.find((product) => product.id === id);
}
