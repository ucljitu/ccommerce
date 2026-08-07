import StoreHeader from "@/components/storefront/StoreHeader";
import StoreFooter from "@/components/storefront/StoreFooter";
import MobileBottomNav from "@/components/storefront/MobileBottomNav";
import WhatsAppButton from "@/components/storefront/WhatsAppButton";
import { getDemoStore } from "@/lib/demo";
import type { Metadata } from "next";
import StorefrontCartProvider from "@/components/storefront/StorefrontCartProvider";
import { FASHION_DEMO_SLUG } from "@/lib/demo-fashion-store";
import { TECH_DEMO_SLUG } from "@/lib/demo-tech-store";

export async function generateMetadata({ params }: { params: Promise<{ storeSlug: string }> }): Promise<Metadata> {
  const { storeSlug } = await params;
  if (storeSlug === TECH_DEMO_SLUG) return {
    title: "Tech Gadgets BD | Electronics and Gadgets Store",
    description: "Explore smartphones, accessories, audio devices, computers and smart gadgets at the Tech Gadgets BD demo store.",
    robots: { index: false, follow: true },
    openGraph: { title: "Tech Gadgets BD", description: "Shop modern electronics, accessories and smart gadgets through this C Commerce demo storefront.", images: ["/demo-tech/hero.jpg"] },
  };
  if (storeSlug !== FASHION_DEMO_SLUG) return {};
  return {
    title: "Dhaka Fashion Hub | Fashion and Lifestyle Store",
    description: "Shop clothing, footwear and accessories for women, men and kids at the Dhaka Fashion Hub demo store.",
    robots: { index: false, follow: true },
    openGraph: { title: "Dhaka Fashion Hub", description: "Explore modern fashion, accessories and everyday styles through this C Commerce demo store.", images: ["/demo-fashion/hero.png"] },
  };
}

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;
  const demoStore = getDemoStore(storeSlug);

  const storeConfig: Record<string, { name: string; emoji: string; phone: string; email: string; address: string; whatsapp: string }> = {
    "techzone-bd": {
      name: "TechZone BD",
      emoji: "⚡",
      phone: "01712-345678",
      email: "info@techzonebd.com",
      address: "Bashundhara City, Dhaka",
      whatsapp: "8801712345678",
    },
  };

  const store = demoStore ? {
    name: demoStore.name,
    emoji: "",
    phone: "",
    email: "",
    address: "Sample store in Bangladesh",
    whatsapp: "",
  } : storeConfig[storeSlug] ?? {
    name: storeSlug,
    emoji: "🛒",
    phone: "01700000000",
    email: "info@store.com",
    address: "Dhaka, Bangladesh",
    whatsapp: "8801833876434",
  };

  return (
    <StorefrontCartProvider storeSlug={storeSlug}>
    <div className="min-h-screen flex flex-col bg-[#faf8f4]">
      <StoreHeader storeName={store.name} storeSlug={storeSlug} phone={store.phone} isDemo={Boolean(demoStore)} isFashion={storeSlug === FASHION_DEMO_SLUG} isTech={storeSlug === TECH_DEMO_SLUG} />
      <main className="flex-1">{children}</main>
      <StoreFooter storeName={store.name} storeSlug={storeSlug} phone={store.phone} email={store.email} address={store.address} isDemo={Boolean(demoStore)} isFashion={storeSlug === FASHION_DEMO_SLUG} isTech={storeSlug === TECH_DEMO_SLUG} />
      {storeSlug !== FASHION_DEMO_SLUG && storeSlug !== TECH_DEMO_SLUG && <MobileBottomNav storeSlug={storeSlug} />}
      {!demoStore && <WhatsAppButton number={store.whatsapp} message={`Hi! I want to order from ${store.name}`} />}
    </div>
    </StorefrontCartProvider>
  );
}
