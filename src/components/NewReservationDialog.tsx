import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTables, useCreateReservation } from "@/hooks/useRestaurant";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function NewReservationDialog() {
  const [open, setOpen] = useState(false);
  const { data: tables } = useTables();
  const createReservation = useCreateReservation();

  const availableTables = tables?.filter((t) => t.status === "available") ?? [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    createReservation.mutate(
      {
        customer_name: form.get("customer_name") as string,
        phone: form.get("phone") as string,
        reservation_date: form.get("date") as string,
        reservation_time: form.get("time") as string,
        party_size: Number(form.get("party_size")),
        table_id: form.get("table_id") as string,
      },
      {
        onSuccess: () => {
          toast.success("Reservation created successfully!");
          setOpen(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4 mr-2" /> New Reservation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Reservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Guest Name</Label>
            <Input id="customer_name" name="customer_name" required maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" maxLength={20} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="party_size">Party Size</Label>
              <Input id="party_size" name="party_size" type="number" min={1} max={20} defaultValue={2} required />
            </div>
            <div className="space-y-2">
              <Label>Table</Label>
              <Select name="table_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {availableTables.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      Table {t.table_number} ({t.capacity} seats) — {t.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={createReservation.isPending}>
            {createReservation.isPending ? "Creating..." : "Create Reservation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
