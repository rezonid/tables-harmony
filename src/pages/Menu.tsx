import { motion } from "framer-motion";
import { Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import { useMenuItems } from "@/hooks/useRestaurant";
import { Button } from "@/components/ui/button";
import NewMenuItemDialog from "@/components/NewMenuItemDialog";

export default function Menu() {
  const { data: menuItems = [], isLoading } = useMenuItems();
  const categories = [...new Set(menuItems.map((m) => m.category))];

  if (isLoading) return <div className="p-8"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menu</h1>
          <p className="text-muted-foreground mt-1">Manage your restaurant's menu items.</p>
        </div>
        <NewMenuItemDialog />
      </div>

      {categories.map((category) => (
        <div key={category} className="mt-8">
          <h2 className="text-lg font-semibold font-sans mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems
              .filter((m) => m.category === category)
              .map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card rounded-xl border p-4 hover:shadow-md transition-shadow ${!item.available ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <p className="text-lg font-bold font-sans text-primary">KES {Math.round(Number(item.price))}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      {item.available ? (
                        <><ToggleRight className="w-4 h-4 text-success" /> Available</>
                      ) : (
                        <><ToggleLeft className="w-4 h-4 text-destructive" /> Unavailable</>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
