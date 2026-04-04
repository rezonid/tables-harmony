import { motion } from "framer-motion";
import { Plus, Phone, Users, Calendar } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { reservations, tables } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Reservations() {
  const today = reservations.filter((r) => r.date === "2026-04-04");
  const upcoming = reservations.filter((r) => r.date !== "2026-04-04" && r.status !== "cancelled");

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reservations</h1>
          <p className="text-muted-foreground mt-1">Manage guest reservations and check-ins.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Reservation
        </Button>
      </div>

      {/* Today */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold font-sans mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> Today
        </h2>
        <div className="space-y-3">
          {today.map((r, i) => (
            <ReservationRow key={r.id} reservation={r} index={i} />
          ))}
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold font-sans mb-4">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((r, i) => (
              <ReservationRow key={r.id} reservation={r} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReservationRow({ reservation: r, index }: { reservation: typeof reservations[0]; index: number }) {
  const table = tables.find((t) => t.id === r.tableId);
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-xl border p-4 flex items-center justify-between hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">{r.customerName}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{r.phone}</span>
            <span>Party of {r.partySize}</span>
            <span>Table {table?.number}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{r.time}</p>
          <p className="text-xs text-muted-foreground">{r.date}</p>
        </div>
        <StatusBadge status={r.status} />
        {r.status === "confirmed" && (
          <Button size="sm" variant="outline">Check In</Button>
        )}
        {r.status === "confirmed" && (
          <Button size="sm" variant="ghost" className="text-destructive">Cancel</Button>
        )}
      </div>
    </motion.div>
  );
}
