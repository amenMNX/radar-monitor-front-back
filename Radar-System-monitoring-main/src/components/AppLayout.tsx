import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Car,
  Gauge,
  LayoutDashboard,
  LogOut,
  Radar as RadarIcon,
  ScanLine,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const adminNav = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/radars", label: "Radars", icon: RadarIcon },
  { to: "/detections", label: "Detections", icon: ScanLine },
  { to: "/violations", label: "Infractions", icon: AlertTriangle },
  { to: "/vehicules", label: "Vehicules", icon: Car },
  { to: "/utilisateurs", label: "Utilisateurs", icon: Users },
] as const;

const userNav = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/mon-vehicule", label: "Mon vehicule", icon: Car },
] as const;

export function AppLayout() {
  const { authed, role, currentEmail, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authed && location.pathname !== "/login") {
      navigate({ to: "/login" });
    }
  }, [authed, location.pathname, navigate]);

  if (!authed) return <Outlet />;

  const nav = role === "user" ? userNav : adminNav;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">Radar Control</div>
            <div className="text-xs text-muted-foreground">Gestion routiere</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3 text-xs">
          {role === "admin" ? (
            <Shield className="h-3.5 w-3.5 text-primary" />
          ) : (
            <User className="h-3.5 w-3.5 text-primary" />
          )}
          <span className="font-medium capitalize">{role}</span>
          <span className="truncate text-muted-foreground">- {currentEmail}</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: !!("exact" in item && item.exact) }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Deconnexion
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
