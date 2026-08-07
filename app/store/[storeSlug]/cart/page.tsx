import FashionCart from "@/components/storefront/FashionCart";

export default async function CartPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  return <FashionCart storeSlug={storeSlug} />;
}
