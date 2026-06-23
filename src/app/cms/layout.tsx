import { redirect } from "next/navigation";
import { hasSupabase } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { CmsSidebar } from "@/components/organisms/CmsSidebar";

export const metadata = { title: "Panel · Con cariño" };

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  // Gate on a real session when Supabase is configured. In seed/demo mode the
  // panel is open (read-only preview) so the UI can be built without a backend.
  if (hasSupabase) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <CmsSidebar />
      <div className="flex-1 bg-cream">
        {!hasSupabase && (
          <p className="border-b border-line bg-blush px-6 py-2.5 text-[13px] text-berry">
            Modo demo: conecta Supabase para guardar cambios (ver <code>handoff.md</code>).
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
