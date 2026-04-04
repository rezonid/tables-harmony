import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type RestaurantTable = Tables["restaurant_tables"]["Row"];
type Reservation = Tables["reservations"]["Row"];
type MenuItem = Tables["menu_items"]["Row"];
type Order = Tables["orders"]["Row"];
type OrderItem = Tables["order_items"]["Row"];

// ---- Tables ----
export function useTables() {
  return useQuery({
    queryKey: ["restaurant_tables"],
    queryFn: async () => {
      const { data, error } = await supabase.from("restaurant_tables").select("*").order("table_number");
      if (error) throw error;
      return data as RestaurantTable[];
    },
  });
}

// ---- Reservations ----
export function useReservations() {
  return useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reservations").select("*, restaurant_tables(table_number)").order("reservation_date").order("reservation_time");
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: Tables["reservations"]["Insert"]) => {
      const { data, error } = await supabase.from("reservations").insert(values).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
      qc.invalidateQueries({ queryKey: ["restaurant_tables"] });
    },
  });
}

export function useUpdateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string } & Tables["reservations"]["Update"]) => {
      const { data, error } = await supabase.from("reservations").update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

// ---- Menu Items ----
export function useMenuItems() {
  return useQuery({
    queryKey: ["menu_items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("menu_items").select("*").order("category").order("name");
      if (error) throw error;
      return data as MenuItem[];
    },
  });
}

export function useCreateMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values: Tables["menu_items"]["Insert"]) => {
      const { data, error } = await supabase.from("menu_items").insert(values).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["menu_items"] }),
  });
}

// ---- Orders ----
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*, order_items(*), restaurant_tables(table_number)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ items, ...order }: Tables["orders"]["Insert"] & { items: Omit<Tables["order_items"]["Insert"], "order_id">[] }) => {
      const { data: orderData, error: orderError } = await supabase.from("orders").insert(order).select().single();
      if (orderError) throw orderError;

      if (items.length > 0) {
        const orderItems = items.map((item) => ({ ...item, order_id: orderData.id }));
        const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
        if (itemsError) throw itemsError;
      }

      return orderData;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["restaurant_tables"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Database["public"]["Enums"]["order_status"] }) => {
      const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
