import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { WhatsappProvider } from "@/lib/whatsappContext";
import { getWhatsappSettings } from "@/lib/products";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  // ponytail: NO pasamos phone_number al cliente — solo las plantillas de mensaje.
  const { phone_number, ...templates } = await getWhatsappSettings();
  void phone_number;

  return (
    <WhatsappProvider templates={templates}>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </WhatsappProvider>
  );
}
