-- Con Cariño — initial schema.
-- Run with: supabase db push   (then load supabase/seed.sql)

create table if not exists public.products (
  id          text primary key,
  name        text        not null,
  price       numeric(10,2) not null check (price >= 0),
  type        text        not null,           -- 'fresas' | 'desayunos' | 'boxes'
  occ         text[]      not null default '{}',
  description text        not null default '',
  inc         text[]      not null default '{}',
  badge       text,
  active      boolean     not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists products_active_idx on public.products (active);

alter table public.products enable row level security;

-- Anonymous visitors: only active products.
create policy "public reads active products"
  on public.products for select to anon
  using (active = true);

-- The owner (signed in): full read.
create policy "authenticated reads all products"
  on public.products for select to authenticated
  using (true);

-- Only the signed-in owner can write.
create policy "authenticated inserts products"
  on public.products for insert to authenticated with check (true);
create policy "authenticated updates products"
  on public.products for update to authenticated using (true) with check (true);
create policy "authenticated deletes products"
  on public.products for delete to authenticated using (true);
