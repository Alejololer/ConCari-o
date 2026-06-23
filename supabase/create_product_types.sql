create table if not exists public.product_types (
  id          text primary key,
  label       text not null,
  tone        text[] not null default '{"#FBEAE6", "#F2D0C9"}'
);

alter table public.product_types enable row level security;

drop policy if exists "public reads product types" on public.product_types;
create policy "public reads product types" on public.product_types for select using (true);

drop policy if exists "authenticated write product types" on public.product_types;
create policy "authenticated write product types" on public.product_types for all to authenticated using (true) with check (true);

insert into public.product_types (id, label, tone) values
  ('fresas', 'Fresas con chocolate', array['#FBEAE6', '#F2D0C9']),
  ('desayunos', 'Desayunos sorpresa', array['#F5ECDD', '#E8D5BC']),
  ('boxes', 'Boxes y cajas', array['#F6E4EB', '#E8CCDB'])
on conflict (id) do nothing;
