export interface RestaurantTable {
  id: string;
  table_number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  section: string;
}

export const restaurantTables: RestaurantTable[] = [
  // Main Hall (Indoor)
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', table_number: 1, capacity: 4, status: 'available', section: 'Main Hall' },
  { id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012', table_number: 2, capacity: 4, status: 'available', section: 'Main Hall' },
  { id: 'c3d4e5f6-a7b8-9012-cdef-345678901234', table_number: 3, capacity: 6, status: 'available', section: 'Main Hall' },
  { id: 'd4e5f6a7-b8c9-0123-def0-456789012345', table_number: 4, capacity: 2, status: 'available', section: 'Main Hall' },
  { id: 'e5f6a7b8-c9d0-1234-ef01-567890123456', table_number: 5, capacity: 8, status: 'occupied', section: 'Main Hall' },
  { id: 'f6a7b8c9-d0e1-2345-f012-678901234567', table_number: 6, capacity: 4, status: 'reserved', section: 'Main Hall' },

  // Bar Area
  { id: 'a7b8c9d0-e1f2-3456-0123-789012345678', table_number: 7, capacity: 4, status: 'available', section: 'Bar' },
  { id: 'b8c9d0e1-f2a3-4567-1234-890123456789', table_number: 8, capacity: 6, status: 'available', section: 'Bar' },
  { id: 'c9d0e1f2-a3b4-5678-2345-901234567890', table_number: 9, capacity: 2, status: 'cleaning', section: 'Bar' },

  // Patio (Outdoor)
  { id: 'd0e1f2a3-b4c5-6789-3456-012345678901', table_number: 10, capacity: 4, status: 'available', section: 'Patio' },
  { id: 'e1f2a3b4-c5d6-7890-4567-123456789012', table_number: 11, capacity: 4, status: 'available', section: 'Patio' },
  { id: 'f2a3b4c5-d6e7-8901-5678-234567890123', table_number: 12, capacity: 6, status: 'available', section: 'Patio' },

  // VIP/Private Room
  { id: 'a3b4c5d6-e7f8-9012-6789-345678901234', table_number: 13, capacity: 10, status: 'available', section: 'VIP Room' },
  { id: 'b4c5d6e7-f8a9-0123-7890-456789012345', table_number: 14, capacity: 12, status: 'reserved', section: 'VIP Room' }
];

