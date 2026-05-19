import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Detection, Radar, Violation, Vehicle, Role, Account } from "./types";

const STORAGE_KEY = "radar-app-state-v3";

interface State {
  radars: Radar[];
  detections: Detection[];
  violations: Violation[];
  vehicles: Vehicle[];
  accounts: Account[];
  authed: boolean;
  role: Role | null;
  currentEmail: string | null;
}

const seed: State = {
  authed: false,
  role: null,
  currentEmail: null,
  accounts: [
    { id: 1, email: "admin@radar.fr", password: "admin", role: "admin", createdAt: "2026-05-01T00:00:00" },
    { id: 2, email: "jean@exemple.fr", password: "jean", role: "user", createdAt: "2026-05-10T10:00:00" },
    { id: 3, email: "marie@exemple.fr", password: "marie", role: "user", createdAt: "2026-05-11T14:30:00" },
  ],
  radars: [
    { id: 1, location: "A7 — Lyon Sud, km 12", maxSpeed: 110, active: true },
    { id: 2, location: "Av. des Champs-Élysées, Paris", maxSpeed: 50, active: true },
    { id: 3, location: "Périphérique Est, Porte de Bagnolet", maxSpeed: 70, active: false },
    { id: 4, location: "N20 — Étampes, sortie 12", maxSpeed: 90, active: true },
  ],
  detections: [
    { id: 1, plateNumber: "AB-123-CD", speed: 132, detectionDate: "2026-05-14T08:42:00", radarId: 1 },
    { id: 2, plateNumber: "ZX-902-PL", speed: 105, detectionDate: "2026-05-14T09:10:00", radarId: 1 },
    { id: 3, plateNumber: "FR-555-GO", speed: 78, detectionDate: "2026-05-14T10:30:00", radarId: 2 },
    { id: 4, plateNumber: "MK-221-RT", speed: 96, detectionDate: "2026-05-14T11:05:00", radarId: 4 },
    { id: 5, plateNumber: "AB-123-CD", speed: 142, detectionDate: "2026-05-15T07:22:00", radarId: 1 },
  ],
  violations: [
    { id: 1, plateNumber: "AB-123-CD", speed: 132, exceededBy: 22, fine: 135, violationDate: "2026-05-14T08:42:00", radarId: 1 },
    { id: 2, plateNumber: "FR-555-GO", speed: 78, exceededBy: 28, fine: 135, violationDate: "2026-05-14T10:30:00", radarId: 2 },
    { id: 3, plateNumber: "MK-221-RT", speed: 96, exceededBy: 6, fine: 68, violationDate: "2026-05-14T11:05:00", radarId: 4 },
    { id: 4, plateNumber: "AB-123-CD", speed: 142, exceededBy: 32, fine: 375, violationDate: "2026-05-15T07:22:00", radarId: 1 },
  ],
  vehicles: [
    { id: 1, plateNumber: "AB-123-CD", chevaux: 7, ownerEmail: "jean@exemple.fr", registeredAt: "2026-05-10T10:00:00" },
    { id: 2, plateNumber: "FR-555-GO", chevaux: 5, ownerEmail: "marie@exemple.fr", registeredAt: "2026-05-11T14:30:00" },
  ],
};

function load(): State {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    return { ...seed, ...JSON.parse(raw) };
  } catch {
    return seed;
  }
}

interface StoreContext extends State {
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  addRadar: (r: Omit<Radar, "id">) => void;
  updateRadar: (id: number, patch: Partial<Radar>) => void;
  deleteRadar: (id: number) => void;
  toggleRadar: (id: number) => void;
  addDetection: (d: Omit<Detection, "id">) => void;
  addVehicle: (v: Omit<Vehicle, "id" | "registeredAt" | "ownerEmail">) => void;
  setUserRole: (id: number, role: Role) => void;
  deleteAccount: (id: number) => void;
}

const Ctx = createContext<StoreContext | null>(null);

function fineFor(exceededBy: number) {
  if (exceededBy < 20) return 68;
  if (exceededBy < 30) return 135;
  if (exceededBy < 50) return 375;
  return 1500;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(seed);

  useEffect(() => {
    setState(load());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const value: StoreContext = {
    ...state,
    login: (email, password) => {
      const e = email.trim().toLowerCase();
      const account = state.accounts.find((a) => a.email.toLowerCase() === e);
      if (!account) return { ok: false, error: "Aucun compte avec cet email" };
      if (account.password !== password) return { ok: false, error: "Mot de passe incorrect" };
      setState((s) => ({ ...s, authed: true, role: account.role, currentEmail: account.email }));
      return { ok: true };
    },
    register: (email, password) => {
      const e = email.trim().toLowerCase();
      if (!e || !password) return { ok: false, error: "Email et mot de passe requis" };
      if (state.accounts.some((a) => a.email.toLowerCase() === e)) {
        return { ok: false, error: "Cet email est déjà utilisé" };
      }
      const newAccount: Account = {
        id: Math.max(0, ...state.accounts.map((a) => a.id)) + 1,
        email: e,
        password,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        accounts: [...s.accounts, newAccount],
        authed: true,
        role: "user",
        currentEmail: e,
      }));
      return { ok: true };
    },
    logout: () => setState((s) => ({ ...s, authed: false, role: null, currentEmail: null })),
    addRadar: (r) =>
      setState((s) => ({
        ...s,
        radars: [...s.radars, { ...r, id: Math.max(0, ...s.radars.map((x) => x.id)) + 1 }],
      })),
    updateRadar: (id, patch) =>
      setState((s) => ({
        ...s,
        radars: s.radars.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      })),
    deleteRadar: (id) =>
      setState((s) => ({ ...s, radars: s.radars.filter((r) => r.id !== id) })),
    toggleRadar: (id) =>
      setState((s) => ({
        ...s,
        radars: s.radars.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
      })),
    addDetection: (d) =>
      setState((s) => {
        const detection: Detection = {
          ...d,
          id: Math.max(0, ...s.detections.map((x) => x.id)) + 1,
        };
        const radar = s.radars.find((r) => r.id === d.radarId);
        let violations = s.violations;
        if (radar && d.speed > radar.maxSpeed) {
          const exceededBy = +(d.speed - radar.maxSpeed).toFixed(1);
          const v: Violation = {
            id: Math.max(0, ...s.violations.map((x) => x.id)) + 1,
            plateNumber: d.plateNumber,
            speed: d.speed,
            exceededBy,
            fine: fineFor(exceededBy),
            violationDate: d.detectionDate,
            radarId: d.radarId,
          };
          violations = [...violations, v];
        }
        return { ...s, detections: [...s.detections, detection], violations };
      }),
    addVehicle: (v) =>
      setState((s) => ({
        ...s,
        vehicles: [
          ...s.vehicles,
          {
            ...v,
            plateNumber: v.plateNumber.toUpperCase(),
            id: Math.max(0, ...s.vehicles.map((x) => x.id)) + 1,
            ownerEmail: s.currentEmail ?? "anonyme",
            registeredAt: new Date().toISOString(),
          },
        ],
      })),
    setUserRole: (id, role) =>
      setState((s) => ({
        ...s,
        accounts: s.accounts.map((a) => (a.id === id ? { ...a, role } : a)),
      })),
    deleteAccount: (id) =>
      setState((s) => ({ ...s, accounts: s.accounts.filter((a) => a.id !== id) })),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
