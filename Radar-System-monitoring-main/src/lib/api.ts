/**
 * API client — talks to the Spring Boot backend.
 *
 * Base URL resolution (in priority order):
 *  1. VITE_API_URL build-time env var  (set via docker-compose build args)
 *  2. /api  (proxied to http://localhost:8081/api by vite.config.ts in dev)
 */
const BASE =
  (typeof import.meta !== "undefined" && (import.meta as { env?: Record<string, string> }).env?.VITE_API_URL) ||
  "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${body}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Radar stations ─────────────────────────────────────────────────────────────

export interface ApiRadarStation {
  id: number;
  code: string;
  name: string;
  location: string;
  status: "ONLINE" | "OFFLINE" | "DEGRADED" | "MAINTENANCE";
  rangeKm: number;
}

export interface CreateRadarStationPayload {
  code: string;
  name: string;
  location: string;
  status: ApiRadarStation["status"];
  rangeKm: number;
}

export const radarsApi = {
  getAll: () => request<ApiRadarStation[]>("/radars"),
  getById: (id: number) => request<ApiRadarStation>(`/radars/${id}`),
  create: (data: CreateRadarStationPayload) =>
    request<ApiRadarStation>("/radars", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id: number, status: ApiRadarStation["status"]) =>
    request<ApiRadarStation>(`/radars/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};

// ── Telemetry ──────────────────────────────────────────────────────────────────

export interface ApiTelemetryReading {
  id: number;
  radarId: number;
  radarCode: string;
  recordedAt: string;
  signalStrength: number;
  cpuLoad: number;
  temperatureCelsius: number;
}

export interface CreateTelemetryPayload {
  radarId: number;
  signalStrength: number;
  cpuLoad: number;
  temperatureCelsius: number;
}

export const telemetryApi = {
  getLatest: () => request<ApiTelemetryReading[]>("/telemetry/latest"),
  create: (data: CreateTelemetryPayload) =>
    request<ApiTelemetryReading>("/telemetry", { method: "POST", body: JSON.stringify(data) }),
};

// ── Alerts ─────────────────────────────────────────────────────────────────────

export interface ApiAlert {
  id: number;
  radarId: number;
  radarCode: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "ACKNOWLEDGED";
  message: string;
  createdAt: string;
}

export interface CreateAlertPayload {
  radarId: number;
  severity: ApiAlert["severity"];
  message: string;
}

export const alertsApi = {
  getAll: (status?: ApiAlert["status"]) =>
    request<ApiAlert[]>(`/alerts${status ? `?status=${status}` : ""}`),
  create: (data: CreateAlertPayload) =>
    request<ApiAlert>("/alerts", { method: "POST", body: JSON.stringify(data) }),
  acknowledge: (id: number) =>
    request<ApiAlert>(`/alerts/${id}/acknowledge`, { method: "PATCH" }),
};
