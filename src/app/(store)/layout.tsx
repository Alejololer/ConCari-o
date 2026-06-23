import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { WhatsappProvider } from "@/lib/whatsappContext";
import { getWhatsappSettings } from "@/lib/products";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const whatsappSettings = await getWhatsappSettings();

  return (
    <WhatsappProvider settings={whatsappSettings}>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </WhatsappProvider>
  );
}
