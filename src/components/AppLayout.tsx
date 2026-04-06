import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  ClipboardList,
  BookOpen,
  Users,
  Building2,
  ChefHat,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/tables", icon: UtensilsCrossed, label: "Tables" },
  { to: "/reservations", icon: CalendarCheck, label: "Reservations" },
  { to: "/orders", icon: ClipboardList, label: "Orders" },
  { to: "/menu", icon: BookOpen, label: "Menu" },
  { to: "/staff", icon: Users, label: "Staff" },
];

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
<h1 className="text-base font-semibold font-sans tracking-normal">Noir et Or</h1>
            <p className="text-xs text-sidebar-muted">Fine Dining Experience</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <Building2 className="w-4 h-4 text-sidebar-primary" />
            </div>
            <div>
<p className="text-sm font-medium">Noir et Or Main</p>
              <p className="text-xs text-sidebar-muted">Nairobi CBD</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
