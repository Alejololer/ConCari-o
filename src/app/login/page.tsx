import { redirect } from "next/navigation";
import { hasSupabase } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { signIn } from "@/app/cms/actions";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { FieldLabel, Input } from "@/components/atoms/Field";

export const metadata = { title: "Acceso · Con cariño" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!hasSupabase) redirect("/cms"); // demo mode: no auth
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/cms");

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-[380px] rounded-panel border border-line bg-surface p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Logo size={52} />
          <p className="text-[13.5px] text-ink-mute">Acceso del propietario · Panel</p>
        </div>
        <form action={signIn} className="flex flex-col gap-4">
          <div>
            <FieldLabel>Correo</FieldLabel>
            <Input name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <FieldLabel>Contraseña</FieldLabel>
            <Input name="password" type="password" required autoComplete="current-password" />
          </div>
          {error && <p className="text-[13px] text-rose">Correo o contraseña incorrectos.</p>}
          <Button className="mt-1 w-full">Entrar</Button>
        </form>
      </div>
    </main>
  );
}
