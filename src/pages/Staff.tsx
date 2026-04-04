import { motion } from "framer-motion";
import { Plus, Mail } from "lucide-react";
import { staff } from "@/lib/data";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";

const roleColors: Record<string, string> = {
  chef: "bg-primary/10 text-primary",
  waiter: "bg-success/15 text-success",
  receptionist: "bg-warning/15 text-warning",
  manager: "bg-destructive/15 text-destructive",
};

export default function Staff() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff</h1>
          <p className="text-muted-foreground mt-1">Manage employees across branches.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Employee
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${roleColors[member.role]}`}>
                  {member.role}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t space-y-1.5">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3 h-3" /> {member.email}
              </p>
              <p className="text-xs text-muted-foreground">{member.branch}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
