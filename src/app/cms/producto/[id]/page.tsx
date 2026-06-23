import { notFound } from "next/navigation";
import { getProduct, getProductTypes } from "@/lib/products";
import { CmsForm } from "@/components/organisms/CmsForm";

// id === "nuevo" → create form; otherwise edit an existing product.
export default async function CmsProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "nuevo";
  const [product, productTypes] = await Promise.all([
    isNew ? undefined : getProduct(id),
    getProductTypes(),
  ]);
  if (!isNew && !product) notFound();

  return (
    <div className="px-6 py-8">
      <h1 className="mb-7 font-display text-4xl font-bold text-rose">
        {isNew ? "Nuevo detalle" : `Editar · ${product!.name}`}
      </h1>
      <CmsForm product={product ?? undefined} productTypes={productTypes} />
    </div>
  );
}
