import { motion } from "framer-motion";
import { UtensilsCrossed, CalendarCheck, ClipboardList, DollarSign, Clock, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { useTables, useReservations, useOrders } from "@/hooks/useRestaurant";

export default function Dashboard() {
  const { data: tables = [] } = useTables();
  const { data: reservations = [] } = useReservations();
  const { data: orders = [] } = useOrders();

  const today = new Date().toISOString().split("T")[0];
  const availableTables = tables.filter((t) => t.status === "available").length;
  const todayReservations = reservations.filter((r: any) => r.reservation_date === today && r.status !== "cancelled").length;
  const activeOrders = orders.filter((o: any) => o.status !== "paid").length;
  const totalRevenue = orders.reduce((sum: number, o: any) => sum + Number(o.total), 0);

  return (
    <div className="p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold">Good Evening</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening at your restaurant today.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard title="Available Tables" value={availableTables} subtitle={`of ${tables.length} total`} icon={UtensilsCrossed} />
        <StatCard title="Today's Reservations" value={todayReservations} icon={CalendarCheck} />
        <StatCard title="Active Orders" value={activeOrders} icon={ClipboardList} />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-sans">Upcoming Reservations</h2>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {reservations
              .filter((r: any) => r.status === "confirmed")
              .slice(0, 4)
              .map((r: any) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.customer_name}</p>
                      <p className="text-xs text-muted-foreground">Party of {r.party_size} · Table {r.restaurant_tables?.table_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{r.reservation_time?.slice(0, 5)}</p>
                    <p className="text-xs text-muted-foreground">{r.reservation_date}</p>
                  </div>
                </div>
              ))}
            {reservations.filter((r: any) => r.status === "confirmed").length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No upcoming reservations</p>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-sans">Active Orders</h2>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {orders.filter((o: any) => o.status !== "paid").map((o: any) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">Table {o.restaurant_tables?.table_number}</p>
                  <p className="text-xs text-muted-foreground">{o.order_items?.length ?? 0} items · {o.waiter_name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold">${Number(o.total).toFixed(2)}</p>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
            {orders.filter((o: any) => o.status !== "paid").length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No active orders</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
