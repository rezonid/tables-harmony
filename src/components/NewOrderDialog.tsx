import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTables, useMenuItems, useCreateOrder } from "@/hooks/useRestaurant";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface OrderItemDraft {
  menu_item_id: string;
  item_name: string;
  quantity: number;
  price: number;
  seat_number: number;
}

export default function NewOrderDialog() {
  const [open, setOpen] = useState(false);
  const [tableId, setTableId] = useState("");
  const [waiter, setWaiter] = useState("");
  const [items, setItems] = useState<OrderItemDraft[]>([]);
  const { data: tables } = useTables();
  const { data: menuItems } = useMenuItems();
  const createOrder = useCreateOrder();

  const occupiedTables = tables?.filter((t) => t.status === "occupied" || t.status === "reserved" || t.status === "available") ?? [];
  const availableMenuItems = menuItems?.filter((m) => m.available) ?? [];

  const addItem = () => {
    if (availableMenuItems.length === 0) return;
    const first = availableMenuItems[0];
    setItems([...items, { menu_item_id: first.id, item_name: first.name, quantity: 1, price: Number(first.price), seat_number: 1 }]);
  };

  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, menuItemId: string) => {
    const mi = availableMenuItems.find((m) => m.id === menuItemId);
    if (!mi) return;
    const updated = [...items];
    updated[index] = { ...updated[index], menu_item_id: mi.id, item_name: mi.name, price: Number(mi.price) };
    setItems(updated);
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = () => {
    if (!tableId || items.length === 0) {
      toast.error("Select a table and add at least one item");
      return;
    }

    createOrder.mutate(
      { table_id: tableId, waiter_name: waiter, total, items },
      {
        onSuccess: () => {
          toast.success("Order placed!");
          setOpen(false);
          setItems([]);
          setTableId("");
          setWaiter("");
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4 mr-2" /> New Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Place New Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Table</Label>
              <Select value={tableId} onValueChange={setTableId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {occupiedTables.map((t) => (
                    <SelectItem key={t.id} value={t.id}>Table {t.table_number} — {t.section}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Waiter</Label>
              <Input value={waiter} onChange={(e) => setWaiter(e.target.value)} placeholder="Waiter name" maxLength={100} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Order Items</Label>
              <Button type="button" size="sm" variant="outline" onClick={addItem}>
                <Plus className="w-3 h-3 mr-1" /> Add Item
              </Button>
            </div>
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                <Select value={item.menu_item_id} onValueChange={(v) => updateItem(i, v)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMenuItems.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.name} — KES {Math.round(Number(m.price))}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i].quantity = Number(e.target.value);
                    setItems(updated);
                  }}
                  className="w-16"
                />
                <Input
                  type="number"
                  min={1}
                  value={item.seat_number}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[i].seat_number = Number(e.target.value);
                    setItems(updated);
                  }}
                  className="w-16"
                  placeholder="Seat"
                />
                <Button type="button" size="sm" variant="ghost" onClick={() => removeItem(i)}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Button>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No items added yet</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <p className="text-sm font-medium">Total: <span className="text-lg font-bold">KES {Math.round(total)}</span></p>
            <Button onClick={handleSubmit} disabled={createOrder.isPending}>
              {createOrder.isPending ? "Placing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
