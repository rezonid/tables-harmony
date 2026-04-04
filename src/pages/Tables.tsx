import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { tables, type TableData } from "@/lib/data";
import { Button } from "@/components/ui/button";

const sections = [...new Set(tables.map((t) => t.section))];

export default function Tables() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tables</h1>
          <p className="text-muted-foreground mt-1">Manage floor plan and table assignments.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Table
        </Button>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4 mt-6 flex-wrap">
        {(["available", "occupied", "reserved", "cleaning"] as const).map((status) => (
          <div key={status} className="flex items-center gap-2 bg-card rounded-lg border px-4 py-2">
            <StatusBadge status={status} />
            <span className="text-sm font-medium">{tables.filter((t) => t.status === status).length}</span>
          </div>
        ))}
      </div>

      {/* Table grid by section */}
      {sections.map((section) => (
        <div key={section} className="mt-8">
          <h2 className="text-lg font-semibold font-sans mb-4">{section}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {tables
              .filter((t) => t.section === section)
              .map((table, i) => (
                <TableCard key={table.id} table={table} index={i} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TableCard({ table, index }: { table: TableData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold font-sans">T{table.number}</span>
        <StatusBadge status={table.status} />
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Users className="w-3.5 h-3.5" />
        <span className="text-xs">{table.capacity} seats</span>
      </div>
    </motion.div>
  );
}
