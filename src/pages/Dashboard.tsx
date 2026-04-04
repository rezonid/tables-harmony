import { motion } from "framer-motion";
import { UtensilsCrossed, CalendarCheck, ClipboardList, DollarSign, Clock, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { tables, reservations, orders } from "@/lib/data";

export default function Dashboard() {
  const availableTables = tables.filter((t) => t.status === "available").length;
  const todayReservations = reservations.filter((r) => r.date === "2026-04-04" && r.status !== "cancelled").length;
  const activeOrders = orders.filter((o) => o.status !== "paid").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold">Good Evening</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening at your restaurant today.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard title="Available Tables" value={availableTables} subtitle={`of ${tables.length} total`} icon={UtensilsCrossed} />
        <StatCard title="Today's Reservations" value={todayReservations} icon={CalendarCheck} trend="up" trendValue="12% vs last week" />
        <StatCard title="Active Orders" value={activeOrders} icon={ClipboardList} />
        <StatCard title="Today's Revenue" value={`$${totalRevenue}`} icon={DollarSign} trend="up" trendValue="8% vs yesterday" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Upcoming Reservations */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-sans">Upcoming Reservations</h2>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {reservations
              .filter((r) => r.status === "confirmed")
              .slice(0, 4)
              .map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.customerName}</p>
                      <p className="text-xs text-muted-foreground">Party of {r.partySize} · Table {tables.find(t => t.id === r.tableId)?.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{r.time}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Active Orders */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-sans">Active Orders</h2>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">Table {o.tableNumber}</p>
                  <p className="text-xs text-muted-foreground">{o.items.length} items · {o.waiter}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold">${o.total}</p>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
