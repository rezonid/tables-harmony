// Mock data for the restaurant management system

export type TableStatus = "available" | "occupied" | "reserved" | "cleaning";
export type OrderStatus = "pending" | "preparing" | "ready" | "served" | "paid";
export type ReservationStatus = "confirmed" | "checked-in" | "cancelled" | "completed";
export type AccountRole = "receptionist" | "waiter" | "manager" | "chef";

export interface Branch {
  id: string;
  name: string;
  address: string;
}

export interface TableData {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  section: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  tableId: string;
  status: ReservationStatus;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  seatNumber: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  waiter: string;
  chef: string;
  createdAt: string;
  total: number;
}

export interface Staff {
  id: string;
  name: string;
  role: AccountRole;
  email: string;
  branch: string;
}

export const tables: TableData[] = [
  { id: "t1", number: 1, capacity: 2, status: "available", section: "Patio" },
  { id: "t2", number: 2, capacity: 4, status: "occupied", section: "Patio" },
  { id: "t3", number: 3, capacity: 6, status: "reserved", section: "Main Hall" },
  { id: "t4", number: 4, capacity: 2, status: "available", section: "Main Hall" },
  { id: "t5", number: 5, capacity: 8, status: "occupied", section: "Main Hall" },
  { id: "t6", number: 6, capacity: 4, status: "cleaning", section: "VIP" },
  { id: "t7", number: 7, capacity: 4, status: "available", section: "VIP" },
  { id: "t8", number: 8, capacity: 10, status: "reserved", section: "Private" },
  { id: "t9", number: 9, capacity: 2, status: "available", section: "Bar" },
  { id: "t10", number: 10, capacity: 4, status: "available", section: "Bar" },
  { id: "t11", number: 11, capacity: 6, status: "occupied", section: "Main Hall" },
  { id: "t12", number: 12, capacity: 2, status: "available", section: "Patio" },
];

export const reservations: Reservation[] = [
  { id: "r1", customerName: "Sarah Johnson", phone: "(555) 123-4567", date: "2026-04-04", time: "19:00", partySize: 4, tableId: "t3", status: "confirmed" },
  { id: "r2", customerName: "Michael Chen", phone: "(555) 234-5678", date: "2026-04-04", time: "20:00", partySize: 8, tableId: "t8", status: "confirmed" },
  { id: "r3", customerName: "Emily Davis", phone: "(555) 345-6789", date: "2026-04-04", time: "18:30", partySize: 2, tableId: "t1", status: "checked-in" },
  { id: "r4", customerName: "James Wilson", phone: "(555) 456-7890", date: "2026-04-05", time: "19:30", partySize: 6, tableId: "t5", status: "confirmed" },
  { id: "r5", customerName: "Olivia Martinez", phone: "(555) 567-8901", date: "2026-04-04", time: "21:00", partySize: 2, tableId: "t9", status: "cancelled" },
];

export const menuItems: MenuItem[] = [
  { id: "m1", name: "Truffle Risotto", description: "Arborio rice with black truffle and parmesan", price: 28, category: "Mains", available: true },
  { id: "m2", name: "Grilled Salmon", description: "Atlantic salmon with lemon butter sauce", price: 32, category: "Mains", available: true },
  { id: "m3", name: "Caesar Salad", description: "Romaine, croutons, parmesan, house dressing", price: 14, category: "Starters", available: true },
  { id: "m4", name: "Bruschetta", description: "Toasted bread with tomato, basil, and garlic", price: 12, category: "Starters", available: true },
  { id: "m5", name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 10, category: "Desserts", available: true },
  { id: "m6", name: "Crème Brûlée", description: "Vanilla custard with caramelized sugar top", price: 11, category: "Desserts", available: false },
  { id: "m7", name: "Filet Mignon", description: "8oz prime beef tenderloin with red wine jus", price: 45, category: "Mains", available: true },
  { id: "m8", name: "Lobster Bisque", description: "Creamy soup with lobster chunks", price: 16, category: "Starters", available: true },
  { id: "m9", name: "House Red Wine", description: "Cabernet Sauvignon, Napa Valley", price: 14, category: "Beverages", available: true },
  { id: "m10", name: "Sparkling Water", description: "San Pellegrino 750ml", price: 6, category: "Beverages", available: true },
];

export const orders: Order[] = [
  {
    id: "o1", tableNumber: 2, status: "preparing", waiter: "Ana López", chef: "Marco Rossi", createdAt: "2026-04-04T18:45:00",
    items: [
      { menuItemId: "m1", name: "Truffle Risotto", quantity: 1, price: 28, seatNumber: 1 },
      { menuItemId: "m3", name: "Caesar Salad", quantity: 1, price: 14, seatNumber: 2 },
      { menuItemId: "m9", name: "House Red Wine", quantity: 2, price: 14, seatNumber: 1 },
    ],
    total: 70,
  },
  {
    id: "o2", tableNumber: 5, status: "served", waiter: "Tom Baker", chef: "Marco Rossi", createdAt: "2026-04-04T18:30:00",
    items: [
      { menuItemId: "m7", name: "Filet Mignon", quantity: 2, price: 45, seatNumber: 1 },
      { menuItemId: "m8", name: "Lobster Bisque", quantity: 3, price: 16, seatNumber: 2 },
      { menuItemId: "m5", name: "Tiramisu", quantity: 2, price: 10, seatNumber: 3 },
    ],
    total: 158,
  },
  {
    id: "o3", tableNumber: 11, status: "pending", waiter: "Ana López", chef: "", createdAt: "2026-04-04T19:00:00",
    items: [
      { menuItemId: "m4", name: "Bruschetta", quantity: 2, price: 12, seatNumber: 1 },
      { menuItemId: "m2", name: "Grilled Salmon", quantity: 1, price: 32, seatNumber: 1 },
    ],
    total: 56,
  },
];

export const staff: Staff[] = [
  { id: "s1", name: "Marco Rossi", role: "chef", email: "marco@dinedesk.com", branch: "Main Branch" },
  { id: "s2", name: "Ana López", role: "waiter", email: "ana@dinedesk.com", branch: "Main Branch" },
  { id: "s3", name: "Tom Baker", role: "waiter", email: "tom@dinedesk.com", branch: "Main Branch" },
  { id: "s4", name: "Lisa Park", role: "receptionist", email: "lisa@dinedesk.com", branch: "Main Branch" },
  { id: "s5", name: "David Kim", role: "manager", email: "david@dinedesk.com", branch: "Main Branch" },
  { id: "s6", name: "Sophie Chen", role: "chef", email: "sophie@dinedesk.com", branch: "West Side" },
];
