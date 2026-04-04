import { motion } from "framer-motion";
import { Plus, ChefHat } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { orders } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Orders() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">Track and manage kitchen orders.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Order
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        {orders.map((order, i) => (
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
                  <span className="text-sm font-bold text-primary">T{order.tableNumber}</span>
                </div>
                <div>
                  <p className="font-medium">Order #{order.id.slice(1)}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.waiter} · {order.chef && <><ChefHat className="w-3 h-3 inline" /> {order.chef}</>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold font-sans">${order.total}</p>
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {order.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Seat {item.seatNumber} · Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
