import { cn } from "@/lib/utils";

type StatusType = "available" | "occupied" | "reserved" | "cleaning" |
  "pending" | "preparing" | "ready" | "served" | "paid" |
  "confirmed" | "checked-in" | "cancelled" | "completed";

const statusStyles: Record<StatusType, string> = {
  available: "bg-success/15 text-success",
  occupied: "bg-destructive/15 text-destructive",
  reserved: "bg-primary/15 text-primary",
  cleaning: "bg-warning/15 text-warning",
  pending: "bg-warning/15 text-warning",
  preparing: "bg-primary/15 text-primary",
  ready: "bg-success/15 text-success",
  served: "bg-muted text-muted-foreground",
  paid: "bg-success/15 text-success",
  confirmed: "bg-primary/15 text-primary",
  "checked-in": "bg-success/15 text-success",
  cancelled: "bg-destructive/15 text-destructive",
  completed: "bg-muted text-muted-foreground",
};

export default function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full capitalize", statusStyles[status])}>
      {status}
    </span>
  );
}
