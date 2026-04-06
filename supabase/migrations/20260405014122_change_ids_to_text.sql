-- Change ID columns from UUID to TEXT to support simple string IDs

-- Drop foreign key constraints first
ALTER TABLE public.restaurant_tables DROP CONSTRAINT IF EXISTS restaurant_tables_branch_id_fkey;
ALTER TABLE public.reservations DROP CONSTRAINT IF EXISTS reservations_table_id_fkey;
ALTER TABLE public.menu_items DROP CONSTRAINT IF EXISTS menu_items_branch_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_table_id_fkey;
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_menu_item_id_fkey;

-- Change column types from UUID to TEXT
ALTER TABLE public.branches ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.restaurant_tables ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.restaurant_tables ALTER COLUMN branch_id TYPE TEXT;
ALTER TABLE public.reservations ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.reservations ALTER COLUMN table_id TYPE TEXT;
ALTER TABLE public.menu_items ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.menu_items ALTER COLUMN branch_id TYPE TEXT;
ALTER TABLE public.orders ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.orders ALTER COLUMN table_id TYPE TEXT;
ALTER TABLE public.order_items ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.order_items ALTER COLUMN order_id TYPE TEXT;
ALTER TABLE public.order_items ALTER COLUMN menu_item_id TYPE TEXT;

-- Remove UUID defaults
ALTER TABLE public.branches ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.restaurant_tables ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.reservations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.menu_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.order_items ALTER COLUMN id DROP DEFAULT;

-- Recreate foreign key constraints
ALTER TABLE public.restaurant_tables ADD CONSTRAINT restaurant_tables_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;
ALTER TABLE public.reservations ADD CONSTRAINT reservations_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.restaurant_tables(id) ON DELETE SET NULL;
ALTER TABLE public.menu_items ADD CONSTRAINT menu_items_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;
ALTER TABLE public.orders ADD CONSTRAINT orders_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.restaurant_tables(id) ON DELETE SET NULL;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id) ON DELETE SET NULL;