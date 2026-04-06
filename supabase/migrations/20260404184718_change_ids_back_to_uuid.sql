-- Change ID columns back from TEXT to UUID

-- Drop foreign key constraints first
ALTER TABLE public.restaurant_tables DROP CONSTRAINT IF EXISTS restaurant_tables_branch_id_fkey;
ALTER TABLE public.reservations DROP CONSTRAINT IF EXISTS reservations_table_id_fkey;
ALTER TABLE public.menu_items DROP CONSTRAINT IF EXISTS menu_items_branch_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_table_id_fkey;
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_menu_item_id_fkey;

-- Change column types from TEXT back to UUID
ALTER TABLE public.branches ALTER COLUMN id TYPE UUID USING id::uuid;
ALTER TABLE public.restaurant_tables ALTER COLUMN id TYPE UUID USING id::uuid;
ALTER TABLE public.restaurant_tables ALTER COLUMN branch_id TYPE UUID USING branch_id::uuid;
ALTER TABLE public.reservations ALTER COLUMN id TYPE UUID USING id::uuid;
ALTER TABLE public.reservations ALTER COLUMN table_id TYPE UUID USING table_id::uuid;
ALTER TABLE public.menu_items ALTER COLUMN id TYPE UUID USING id::uuid;
ALTER TABLE public.menu_items ALTER COLUMN branch_id TYPE UUID USING branch_id::uuid;
ALTER TABLE public.orders ALTER COLUMN id TYPE UUID USING id::uuid;
ALTER TABLE public.orders ALTER COLUMN table_id TYPE UUID USING table_id::uuid;
ALTER TABLE public.order_items ALTER COLUMN id TYPE UUID USING id::uuid;
ALTER TABLE public.order_items ALTER COLUMN order_id TYPE UUID USING order_id::uuid;
ALTER TABLE public.order_items ALTER COLUMN menu_item_id TYPE UUID USING menu_item_id::uuid;

-- Add UUID defaults back
ALTER TABLE public.branches ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.restaurant_tables ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.reservations ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.menu_items ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.orders ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.order_items ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Recreate foreign key constraints
ALTER TABLE public.restaurant_tables ADD CONSTRAINT restaurant_tables_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;
ALTER TABLE public.reservations ADD CONSTRAINT reservations_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.restaurant_tables(id) ON DELETE SET NULL;
ALTER TABLE public.menu_items ADD CONSTRAINT menu_items_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;
ALTER TABLE public.orders ADD CONSTRAINT orders_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.restaurant_tables(id) ON DELETE SET NULL;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id) ON DELETE SET NULL;