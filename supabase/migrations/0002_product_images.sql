-- Fotos de producto: columna image_url + bucket de Storage para subidas del CMS.
-- Mantener en sync con src/lib/types.ts (Product.imageUrl) y src/lib/products.ts.

alter table public.products add column if not exists image_url text;

-- Bucket público para fotos de producto (lectura pública vía la public URL).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Políticas RLS del bucket. RLS ya está habilitado en storage.objects por la
-- plataforma (no somos su owner, así que NO lo togglamos aquí).

-- Lectura pública:
drop policy if exists "product-images public read" on storage.objects;
create policy "product-images public read"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Escritura solo para la dueña (authenticated):
drop policy if exists "product-images authenticated insert" on storage.objects;
create policy "product-images authenticated insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "product-images authenticated update" on storage.objects;
create policy "product-images authenticated update"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "product-images authenticated delete" on storage.objects;
create policy "product-images authenticated delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images');
