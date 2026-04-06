import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateMenuItem } from "@/hooks/useRestaurant";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const categories = ["Starters", "Mains", "Desserts", "Beverages"];

export default function NewMenuItemDialog() {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(true);
  const createItem = useCreateMenuItem();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    createItem.mutate(
      {
        name: form.get("name") as string,
        description: form.get("description") as string,
        price: Number(form.get("price")),
        category: form.get("category") as string,
        available,
      },
      {
        onSuccess: () => {
          toast.success("Menu item added!");
          setOpen(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Menu Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" name="name" required maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" maxLength={255} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (KES)</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select name="category" defaultValue="Mains">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={available} onCheckedChange={setAvailable} />
            <Label>Available</Label>
          </div>
          <Button type="submit" className="w-full" disabled={createItem.isPending}>
            {createItem.isPending ? "Adding..." : "Add Item"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
