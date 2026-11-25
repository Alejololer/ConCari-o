import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { CartToast } from "@/components/molecules/CartToast";
import { WhatsappFab } from "@/components/molecules/WhatsappFab";
import { WhatsappProvider } from "@/lib/whatsappContext";
import { getOccasions, getProducts, getWhatsappSettings } from "@/lib/products";
import { buildCategoryPreviews } from "@/lib/storefront";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  // ponytail: NO pasamos phone_number al cliente — solo las plantillas de mensaje.
  const [waSettings, products, occasions] = await Promise.all([
    getWhatsappSettings(),
    getProducts(),
    getOccasions(),
  ]);
  const { phone_number, ...templates } = waSettings;
  void phone_number;

  const categories = buildCategoryPreviews(occasions, products);

  return (
    <WhatsappProvider templates={templates}>
      <CartProvider>
        <Header categories={categories} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer categories={categories} />
        <CartDrawer />
        <CartToast />
        <WhatsappFab />
      </CartProvider>
    </WhatsappProvider>
  );
}
