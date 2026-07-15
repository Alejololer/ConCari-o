-- Varias fotos por producto: image_urls[1] es la portada (Product.imageUrl derivado).
-- Sync: src/lib/types.ts (Product.images) y el mapeo en src/lib/products.ts.
alter table public.products add column if not exists image_urls text[];

update public.products set image_urls = array[image_url]
  where image_url is not null and image_urls is null;

alter table public.products drop column if exists image_url;
