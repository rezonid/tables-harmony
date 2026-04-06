export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export const menuItems: MenuItem[] = [
  // Starters
  { id: 'f3a4b5c6-d7e8-9012-3456-789012345678', name: 'Samosas (Beef)', description: 'Crispy pastry filled with spiced beef', price: 350, category: 'Starters', available: true },
  { id: 'a4b5c6d7-e8f9-0123-4567-890123456789', name: 'Fish Fingers', description: 'Breaded tilapia fingers with tartar sauce', price: 450, category: 'Starters', available: true },
  { id: 'b5c6d7e8-f9a0-1234-5678-901234567890', name: 'Mandazi', description: 'Sweet fried dough triangles', price: 200, category: 'Starters', available: true },

  // Mains
  { id: 'c6d7e8f9-a0b1-2345-6789-012345678901', name: 'Nyama Choma', description: 'Grilled goat ribs marinated in Kenyan spices', price: 1400, category: 'Mains', available: true },
  { id: 'd7e8f9a0-b1c2-3456-7890-123456789012', name: 'Beef Stew', description: 'Tender beef stew with potatoes and carrots, served with ugali', price: 950, category: 'Mains', available: true },
  { id: 'e8f9a0b1-c2d3-4567-8901-234567890123', name: 'Chicken Curry', description: 'Spicy chicken curry with coconut milk', price: 1100, category: 'Mains', available: true },
  { id: 'f9a0b1c2-d3e4-5678-9012-345678901234', name: 'Tilapia (Whole)', description: 'Fried whole tilapia with ugali and kachumbari', price: 1200, category: 'Mains', available: true },
  { id: 'a0b1c2d3-e4f5-6789-0123-456789012345', name: 'Chapati & Beans', description: 'Layered chapati with stewed beans', price: 650, category: 'Mains', available: true },

  // Sides
  { id: 'b1c2d3e4-f5a6-7890-1234-567890123456', name: 'Ugali', description: 'Traditional maize flour staple', price: 150, category: 'Sides', available: true },
  { id: 'c2d3e4f5-a6b7-8901-2345-678901234567', name: 'Chapati', description: 'Soft layered flatbread', price: 100, category: 'Sides', available: true },
  { id: 'd3e4f5a6-b7c8-9012-3456-789012345678', name: 'Sukuma Wiki', description: 'Collard greens cooked with onions & tomatoes', price: 250, category: 'Sides', available: true },
  { id: 'e4f5a6b7-c8d9-0123-4567-890123456789', name: 'Kachumbari Salad', description: 'Tomato, onion & cilantro salad', price: 200, category: 'Sides', available: true },
  { id: 'f5a6b7c8-d9e0-1234-5678-901234567890', name: 'Fries', description: 'Crispy french fries', price: 300, category: 'Sides', available: true },

  // Desserts
  { id: 'a6b7c8d9-e0f1-2345-6789-012345678901', name: 'Mango Cake', description: 'Fresh mango sponge cake', price: 400, category: 'Desserts', available: true },
  { id: 'b7c8d9e0-f1a2-3456-7890-123456789012', name: 'Ice Cream', description: 'Vanilla or chocolate scoop', price: 300, category: 'Desserts', available: true },

  // Beverages
  { id: 'c8d9e0f1-a2b3-4567-8901-234567890123', name: 'Mango Juice', description: 'Fresh pressed mango juice', price: 250, category: 'Beverages', available: true },
  { id: 'd9e0f1a2-b3c4-5678-9012-345678901234', name: 'Passion Juice', description: 'Fresh passion fruit juice', price: 250, category: 'Beverages', available: true },
  { id: 'e0f1a2b3-c4d5-6789-0123-456789012345', name: 'Soda', description: 'Coke, Fanta, Sprite (500ml)', price: 150, category: 'Beverages', available: true },
  { id: 'f1a2b3c4-d5e6-7890-1234-567890123456', name: 'Tusker Lager', description: 'Kenyan premium lager (500ml)', price: 350, category: 'Beverages', available: true },
  { id: 'a2b3c4d5-e6f7-8901-2345-678901234567', name: 'White Cap', description: 'Smooth lager beer (500ml)', price: 350, category: 'Beverages', available: true },

// Cocktails
  { id: 'b3c4d5e6-f7a8-9012-3456-789012345678', name: 'Kenyan Dawa', description: 'Vodka, honey, lime, crushed ice', price: 800, category: 'Cocktails', available: true },
  { id: 'c4d5e6f7-a8b9-0123-4567-890123456789', name: 'Tusker Mojito', description: 'Tusker beer, mint, lime, soda', price: 750, category: 'Cocktails', available: true },
  { id: 'd5e6f7a8-b9c0-1234-5678-901234567890', name: 'Sex on the Beach', description: 'Vodka, peach schnapps, cranberry, orange', price: 850, category: 'Cocktails', available: true },
  { id: 'e6f7a8b9-c0d1-2345-6789-012345678901', name: 'Margarita', description: 'Tequila, lime, triple sec', price: 900, category: 'Cocktails', available: true },
  { id: 'f7a8b9c0-d1e2-3456-7890-123456789012', name: 'Pina Colada', description: 'Rum, coconut cream, pineapple', price: 850, category: 'Cocktails', available: true },
  { id: 'a8b9c0d1-e2f3-4567-8901-234567890123', name: 'Whiskey Sour', description: 'Whiskey, lemon juice, sugar syrup', price: 850, category: 'Cocktails', available: true },
  { id: 'b9c0d1e2-f3a4-5678-9012-345678901234', name: 'Cosmopolitan', description: 'Vodka, cranberry, lime, triple sec', price: 900, category: 'Cocktails', available: true },
  { id: 'c0d1e2f3-a4b5-6789-0123-456789012345', name: 'Old Fashioned', description: 'Bourbon, sugar, bitters, orange twist', price: 950, category: 'Cocktails', available: true },

  // More Beverages
  { id: '29', name: 'Kenyan Tea', description: 'Chai masala with milk', price: 200, category: 'Beverages', available: true },
  { id: '30', name: 'Coffee', description: 'Fresh Kenyan coffee', price: 250, category: 'Beverages', available: true },
  { id: '31', name: 'Red Wine', description: 'House red (glass)', price: 650, category: 'Beverages', available: true },
  { id: '32', name: 'White Wine', description: 'House white (glass)', price: 650, category: 'Beverages', available: true },
];


