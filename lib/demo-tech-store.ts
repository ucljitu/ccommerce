export const TECH_DEMO_SLUG = "demo-tech-gadgets";

export type TechProduct = {
  id: string;
  name: string;
  brand: string;
  category: "Smartphones" | "Mobile Accessories" | "Audio" | "Computers" | "Smart Devices" | "Gaming";
  sku: string;
  tags: string[];
  price: number;
  salePrice?: number;
  image: string;
  alt: string;
  inStock: boolean;
  isNew?: boolean;
  featured?: boolean;
  recommended?: boolean;
  deal?: boolean;
  variants?: { color?: string[]; storage?: string[] };
  specification: string;
  shortDescription: string;
  details: string[];
};

export const techGadgetsDemoStore = {
  name: "Tech Gadgets BD",
  tagline: "Smart Technology for Everyday Life",
  category: "Electronics and Gadgets",
  description: "Explore smartphones, accessories, audio devices, computers and smart gadgets selected for customers in Bangladesh.",
  colors: { primary: "#0f172a", secondary: "#2563eb", accent: "#06b6d4", background: "#f8fafc" },
  contact: { phone: "", email: "", whatsapp: "", address: "" },
  delivery: { freeDeliveryThreshold: 2000, standardCharge: 60, estimatedTime: "3–5 business days" },
  heroImage: "/demo-tech/hero.jpg",
} as const;

export const techProducts: TechProduct[] = [
  { id: "t1", name: "Samsung Galaxy A55 5G", brand: "Samsung", category: "Smartphones", sku: "TGB-SAM-A55", tags: ["android", "5g", "phone"], price: 52999, salePrice: 49999, image: "/demo-tech/galaxy-a55.jpg", alt: "Graphite Samsung Galaxy A55 5G smartphone", inStock: true, deal: true, variants: { color: ["Graphite", "Blue"], storage: ["8GB / 128GB", "8GB / 256GB"] }, specification: "8GB RAM · 256GB Storage", shortDescription: "A balanced 5G smartphone for work, entertainment and everyday photography.", details: ["6.6-inch display", "8GB memory configuration", "5G network support"] },
  { id: "t2", name: "Redmi Note 13 Pro", brand: "Xiaomi", category: "Smartphones", sku: "TGB-XMI-N13P", tags: ["android", "phone", "redmi"], price: 36999, image: "/demo-tech/redmi-note-13-pro.jpg", alt: "Silver Redmi Note 13 Pro smartphone", inStock: true, isNew: true, variants: { color: ["Silver", "Black"], storage: ["8GB / 256GB"] }, specification: "8GB RAM · 256GB Storage", shortDescription: "A feature-rich Android phone with generous storage for daily use.", details: ["High-resolution display", "8GB memory configuration", "USB-C charging"] },
  { id: "t3", name: "Realme 12 Plus 5G", brand: "Realme", category: "Smartphones", sku: "TGB-RLM-12P", tags: ["android", "5g", "phone"], price: 34999, image: "/demo-tech/realme-12-plus.jpg", alt: "Blue Realme 12 Plus 5G smartphone", inStock: true, isNew: true, variants: { color: ["Blue"], storage: ["8GB / 256GB"] }, specification: "8GB RAM · 256GB Storage", shortDescription: "Modern 5G performance in a slim everyday design.", details: ["5G connectivity", "8GB memory configuration", "Dual SIM support"] },
  { id: "t4", name: "Apple iPhone 15", brand: "Apple", category: "Smartphones", sku: "TGB-APL-IP15", tags: ["iphone", "ios", "phone"], price: 119999, image: "/demo-tech/iphone-15.jpg", alt: "Black Apple iPhone 15 smartphone", inStock: true, featured: true, variants: { color: ["Black", "Blue"], storage: ["128GB", "256GB"] }, specification: "128GB Storage · USB-C", shortDescription: "A refined smartphone experience with a bright display and USB-C connectivity.", details: ["128GB storage option", "USB-C connector", "Dual-camera system"] },
  { id: "t5", name: "Anker 20W USB-C Charger", brand: "Anker", category: "Mobile Accessories", sku: "TGB-ANK-20W", tags: ["charger", "usb-c", "power"], price: 2490, salePrice: 2190, image: "/demo-tech/anker-charger.jpg", alt: "White Anker 20W USB-C wall charger", inStock: true, isNew: true, specification: "20W USB-C Charging", shortDescription: "A compact USB-C wall charger for compatible phones and accessories.", details: ["20W output", "USB-C port", "Compact travel-friendly body"] },
  { id: "t6", name: "Baseus 20,000mAh Power Bank", brand: "Baseus", category: "Mobile Accessories", sku: "TGB-BAS-PB20", tags: ["power bank", "charging", "battery"], price: 3950, image: "/demo-tech/baseus-power-bank.jpg", alt: "Dark blue Baseus 20000mAh power bank", inStock: true, featured: true, specification: "20,000mAh Capacity", shortDescription: "High-capacity portable power for phones and everyday devices.", details: ["20,000mAh rated capacity", "Multiple output ports", "Battery level indicator"] },
  { id: "t7", name: "USB-C Fast Charging Cable", brand: "Baseus", category: "Mobile Accessories", sku: "TGB-BAS-C100", tags: ["cable", "usb-c", "charging"], price: 650, image: "/demo-tech/usb-c-cable.jpg", alt: "Braided USB-C fast charging cable", inStock: true, recommended: true, specification: "Braided USB-C Cable", shortDescription: "A durable braided cable for charging and data transfer.", details: ["USB-C connectors", "Braided outer layer", "Charging and data support"] },
  { id: "t8", name: "Protective Phone Case", brand: "TechShield", category: "Mobile Accessories", sku: "TGB-TSH-CASE", tags: ["case", "phone", "protection"], price: 850, image: "/demo-tech/phone-case.jpg", alt: "Clear protective smartphone case", inStock: true, recommended: true, specification: "Clear Shock-Absorbing Case", shortDescription: "Everyday scratch and impact protection in a clear profile.", details: ["Raised camera edge", "Flexible clear shell", "Precise button cutouts"] },
  { id: "t9", name: "JBL Tune Wireless Headphones", brand: "JBL", category: "Audio", sku: "TGB-JBL-TUNE", tags: ["headphones", "wireless", "bluetooth"], price: 6500, image: "/demo-tech/jbl-headphones.jpg", alt: "Black JBL Tune wireless over-ear headphones", inStock: true, featured: true, specification: "Wireless Over-Ear Audio", shortDescription: "Comfortable wireless listening for music, study and travel.", details: ["Wireless connection", "Over-ear cushions", "On-device controls"] },
  { id: "t10", name: "Wireless Earbuds with ANC", brand: "SoundCore", category: "Audio", sku: "TGB-SND-ANC", tags: ["earbuds", "anc", "bluetooth"], price: 4500, salePrice: 3800, image: "/demo-tech/anc-earbuds.jpg", alt: "White wireless ANC earbuds in charging case", inStock: true, deal: true, specification: "ANC · Bluetooth 5.3", shortDescription: "Compact true-wireless earbuds with active noise cancellation.", details: ["Active noise cancellation", "Bluetooth 5.3", "Pocket charging case"] },
  { id: "t11", name: "Logitech Wireless Mouse", brand: "Logitech", category: "Computers", sku: "TGB-LOG-MSE", tags: ["mouse", "wireless", "computer"], price: 1850, image: "/demo-tech/logitech-mouse.jpg", alt: "Graphite Logitech wireless mouse", inStock: true, recommended: true, specification: "Wireless · Adjustable DPI", shortDescription: "A comfortable wireless mouse for work, study and travel.", details: ["Wireless receiver", "Adjustable pointer speed", "Ambidextrous shape"] },
  { id: "t12", name: "Mechanical Gaming Keyboard", brand: "KeyPro", category: "Gaming", sku: "TGB-KYP-MECH", tags: ["keyboard", "gaming", "mechanical"], price: 5200, image: "/demo-tech/gaming-keyboard.jpg", alt: "Compact mechanical gaming keyboard", inStock: true, featured: true, specification: "Mechanical Switches · Compact Layout", shortDescription: "A compact mechanical keyboard for responsive gaming and typing.", details: ["Mechanical key switches", "Compact layout", "Wired USB connection"] },
  { id: "t13", name: "Adjustable Laptop Stand", brand: "Baseus", category: "Computers", sku: "TGB-BAS-STND", tags: ["laptop", "stand", "desk"], price: 2200, image: "/demo-tech/laptop-stand.jpg", alt: "Silver adjustable aluminum laptop stand", inStock: true, isNew: true, specification: "Adjustable Aluminum Stand", shortDescription: "Raise your laptop for a more comfortable and organized desk setup.", details: ["Multiple height positions", "Aluminum construction", "Foldable design"] },
  { id: "t14", name: "USB-C 7-in-1 Hub", brand: "Anker", category: "Computers", sku: "TGB-ANK-HUB7", tags: ["hub", "usb-c", "computer"], price: 2800, image: "/demo-tech/usb-c-hub.jpg", alt: "Silver USB-C seven-in-one hub", inStock: true, recommended: true, specification: "7 Ports · USB-C Connection", shortDescription: "Expand a compatible laptop with practical everyday ports.", details: ["USB-C host connection", "Seven expansion ports", "Compact aluminum body"] },
  { id: "t15", name: "Smart Watch Series 8", brand: "WearTech", category: "Smart Devices", sku: "TGB-WTC-S8", tags: ["watch", "smart", "wearable"], price: 12000, salePrice: 8500, image: "/demo-tech/smart-watch.jpg", alt: "Black Smart Watch Series 8", inStock: true, deal: true, specification: "Fitness Tracking · Notifications", shortDescription: "A connected everyday watch for notifications and activity tracking.", details: ["Activity tracking", "Phone notifications", "Interchangeable strap"] },
];

export const techCategories = [
  { name: "Smartphones", image: techProducts[0].image, description: "Android and iPhone devices" },
  { name: "Mobile Accessories", image: techProducts[4].image, description: "Chargers, cables and power banks" },
  { name: "Audio", image: techProducts[8].image, description: "Earbuds, headphones and speakers" },
  { name: "Computers", image: techProducts[12].image, description: "Computer and desk accessories" },
  { name: "Smart Devices", image: techProducts[14].image, description: "Smartwatches and connected gadgets" },
  { name: "Gaming", image: techProducts[11].image, description: "Gaming keyboards and accessories" },
].map((category) => ({ ...category, count: techProducts.filter((product) => product.category === category.name).length }));

export const techBrands = ["Samsung", "Apple", "Xiaomi", "Realme", "Anker", "Logitech", "Baseus", "JBL"];

export function getTechProduct(id: string) {
  return techProducts.find((product) => product.id === id);
}
