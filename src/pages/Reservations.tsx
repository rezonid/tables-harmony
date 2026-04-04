import { motion } from "framer-motion";
import { Phone, Users, Calendar } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useReservations, useUpdateReservation } from "@/hooks/useRestaurant";
import { Button } from "@/components/ui/button";
import NewReservationDialog from "@/components/NewReservationDialog";
import { toast } from "sonner";

export default function Reservations() {
  const { data: reservations = [], isLoading } = useReservations();
  const updateReservation = useUpdateReservation();

  const today = new Date().toISOString().split("T")[0];
  const todayRes = reservations.filter((r: any) => r.reservation_date === today);
  const upcoming = reservations.filter((r: any) => r.reservation_date !== today && r.status !== "cancelled");

  const handleCheckIn = (id: string) => {
    updateReservation.mutate({ id, status: "checked_in" }, {
      onSuccess: () => toast.success("Guest checked in!"),
    });
  };

  const handleCancel = (id: string) => {
    updateReservation.mutate({ id, status: "cancelled" }, {
      onSuccess: () => toast.success("Reservation cancelled"),
    });
  };

  if (isLoading) return <div className="p-8"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reservations</h1>
          <p className="text-muted-foreground mt-1">Manage guest reservations and check-ins.</p>
        </div>
        <NewReservationDialog />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold font-sans mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> Today
        </h2>
        <div className="space-y-3">
          {todayRes.map((r: any, i: number) => (
            <ReservationRow key={r.id} r={r} index={i} onCheckIn={handleCheckIn} onCancel={handleCancel} />
          ))}
          {todayRes.length === 0 && <p className="text-sm text-muted-foreground">No reservations today</p>}
        </div>
      </div>

      {upcoming.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold font-sans mb-4">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((r: any, i: number) => (
              <ReservationRow key={r.id} r={r} index={i} onCheckIn={handleCheckIn} onCancel={handleCancel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReservationRow({ r, index, onCheckIn, onCancel }: { r: any; index: number; onCheckIn: (id: string) => void; onCancel: (id: string) => void }) {
  // Map DB enum to display status
  const displayStatus = r.status === "checked_in" ? "checked-in" : r.status;

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
          <p className="font-medium">{r.customer_name}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
            {r.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{r.phone}</span>}
            <span>Party of {r.party_size}</span>
            <span>Table {r.restaurant_tables?.table_number}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{r.reservation_time?.slice(0, 5)}</p>
          <p className="text-xs text-muted-foreground">{r.reservation_date}</p>
        </div>
        <StatusBadge status={displayStatus} />
        {r.status === "confirmed" && (
          <>
            <Button size="sm" variant="outline" onClick={() => onCheckIn(r.id)}>Check In</Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onCancel(r.id)}>Cancel</Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
