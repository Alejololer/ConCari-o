alter table public.products add column if not exists featured_banner boolean not null default false;

-- Reset and set the default two banner products
update public.products set featured_banner = false;
update public.products set featured_banner = true where id in ('amor-2', 'amor-18');
