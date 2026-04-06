# Noir et Or Restaurant Update TODO

## Completed: [x] Create TODO.md

**Completed Steps:**
- [x] AppLayout.tsx renamed to Noir et Or
- [x] NewMenuItemDialog.tsx price label to KES
- [x] NewOrderDialog.tsx currency and total to KES
- [x] Dashboard.tsx revenue and orders to KES
- [x] Menu.tsx prices to KES
- [x] Orders.tsx totals/items to KES
- [x] CSS @import fixed

**Remaining:**
1. Test changes - Visit http://localhost:8080/ , check sidebar name "Noir et Or", all prices "KES XXX" (no decimals), add test menu item.
2. Add sample menu items via /menu "Add Item" or Supabase SQL:
```
INSERT INTO public.menu_items (name, description, price, category, available, branch_id) VALUES
('Nyama Choma', 'Grilled goat ribs marinated in spices', 1200, 'Mains', true, (SELECT id FROM branches LIMIT 1)),
('Ugali', 'Maize flour staple', 100, 'Sides', true, (SELECT id FROM branches LIMIT 1)),
('Sukuma Wiki', 'Collard greens stir fry', 200, 'Sides', true, (SELECT id FROM branches LIMIT 1)),
('Beef Stew', 'Tender beef with vegetables', 950, 'Mains', true, (SELECT id FROM branches LIMIT 1)),
('Mango Juice', 'Fresh mango nectar', 250, 'Beverages', true, (SELECT id FROM branches LIMIT 1));
```
Run `npx update-browserslist-db@latest` optional.

*Updated after each step.*

