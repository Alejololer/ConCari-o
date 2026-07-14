create table if not exists public.occasions (
  id    text primary key,
  label text not null,
  sub   text not null default ''
);

-- ponytail: sin FK a products.occ (text[]); borrar una ocasión deja ids huérfanos
-- en productos viejos, solo dejan de matchear en filtros. Mismo trade-off que product_types.
alter table public.occasions enable row level security;

drop policy if exists "public reads occasions" on public.occasions;
create policy "public reads occasions" on public.occasions for select using (true);

drop policy if exists "authenticated write occasions" on public.occasions;
create policy "authenticated write occasions" on public.occasions for all to authenticated using (true) with check (true);

insert into public.occasions (id, label, sub) values
  ('amor', 'Para el amor de tu vida', 'Romance y aniversarios'),
  ('mama', 'Para mamá consentida', 'Mimos para ella'),
  ('papa', 'Para papá valiente', 'Su día, su detalle'),
  ('especial', 'Para esa persona especial', 'Amistad y cariño'),
  ('porquesi', 'Solo porque sí', 'Sorpresas sin motivo'),
  ('cumple', 'Para celebrar la vida', 'Cumpleaños y logros'),
  ('mujer', 'Día de la mujer', 'Celebra tu fuerza y belleza'),
  ('navidad', 'Navidad', 'Magia y alegría en cada detalle'),
  ('nino', 'Día del niño', 'Sorpresas dulces para los más pequeños')
on conflict (id) do nothing;
