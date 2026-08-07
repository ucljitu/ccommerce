import DemoCheckout from "@/components/storefront/DemoCheckout";
import { isDemoStore } from "@/lib/demo";

export default async function CheckoutPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  return <DemoCheckout storeSlug={storeSlug} demoMode={isDemoStore(storeSlug)} />;
}
