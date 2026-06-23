create table if not exists public.whatsapp_settings (
  id                text primary key default 'default',
  cart_template     text not null default 'Hola! Quiero hacer un pedido con cariño

{items}

Total aproximado: {total}',
  product_template  text not null default 'Hola! Me interesa el detalle "{name}" ({qty}x - {price}). Me ayudas a coordinarlo?',
  generic_template  text not null default 'Hola Con cariño! Quisiera información sobre sus detalles'
);

alter table public.whatsapp_settings enable row level security;

drop policy if exists "public reads whatsapp settings" on public.whatsapp_settings;
create policy "public reads whatsapp settings" on public.whatsapp_settings for select using (true);

drop policy if exists "authenticated write whatsapp settings" on public.whatsapp_settings;
create policy "authenticated write whatsapp settings" on public.whatsapp_settings for all to authenticated using (true) with check (true);

insert into public.whatsapp_settings (id) values ('default') on conflict (id) do nothing;
