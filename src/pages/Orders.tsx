import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useRestaurant";
import { Button } from "@/components/ui/button";
import NewOrderDialog from "@/components/NewOrderDialog";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

const statusFlow: Database["public"]["Enums"]["order_status"][] = ["pending", "preparing", "ready", "served", "paid"];

export default function Orders() {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const advance = (id: string, current: string) => {
    const idx = statusFlow.indexOf(current as any);
    if (idx < statusFlow.length - 1) {
      updateStatus.mutate({ id, status: statusFlow[idx + 1] }, {
        onSuccess: () => toast.success(`Order updated to ${statusFlow[idx + 1]}`),
      });
    }
  };

  if (isLoading) return <div className="p-8"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">Track and manage kitchen orders.</p>
        </div>
        <NewOrderDialog />
      </div>

      <div className="mt-8 space-y-4">
        {orders.map((order: any, i: number) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">T{order.restaurant_tables?.table_number}</span>
                </div>
                <div>
                  <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.waiter_name} {order.chef_name && <><ChefHat className="w-3 h-3 inline" /> {order.chef_name}</>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold font-sans">${Number(order.total).toFixed(2)}</p>
                <StatusBadge status={order.status} />
                {order.status !== "paid" && (
                  <Button size="sm" variant="outline" onClick={() => advance(order.id, order.status)}>
                    → {statusFlow[statusFlow.indexOf(order.status) + 1]}
                  </Button>
                )}
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {order.order_items?.map((item: any, j: number) => (
                  <div key={j} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
                    <div>
                      <p className="text-sm font-medium">{item.item_name}</p>
                      <p className="text-xs text-muted-foreground">Seat {item.seat_number} · Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        {orders.length === 0 && <p className="text-muted-foreground text-center py-8">No orders yet</p>}
      </div>
    </div>
  );
}
