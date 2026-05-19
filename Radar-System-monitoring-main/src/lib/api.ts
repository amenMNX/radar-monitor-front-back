// API Configuration for Spring Boot Backend
// In Docker: uses relative path (proxied by Nginx)
// In dev: uses localhost:8081
const API_BASE = 
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? "http://localhost:8081/api"
    : "/api";

// Types for API responses
export interface ApiRadar {
  id: number;
  code: string;
  location: string;
  maxSpeed: number;
  status: "ONLINE" | "DEGRADED" | "OFFLINE" | "MAINTENANCE";
}

export interface ApiTelemetry {
  id: number;
  radarId: number;
  signalStrength: number;
  cpuLoad: number;
  temperature: number;
  timestamp: string;
}

export interface ApiAlert {
  id: number;
  radarId: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "ACKNOWLEDGED" | "RESOLVED";
  message: string;
  createdAt: string;
}

// Radar API calls
export const radarApi = {
  getAll: async (): Promise<ApiRadar[]> => {
    const response = await fetch(`${API_BASE}/radars`);
    if (!response.ok) throw new Error("Failed to fetch radars");
    return response.json();
  },

  getById: async (id: number): Promise<ApiRadar> => {
    const response = await fetch(`${API_BASE}/radars/${id}`);
    if (!response.ok) throw new Error("Failed to fetch radar");
    return response.json();
  },

  create: async (radar: Omit<ApiRadar, "id">): Promise<ApiRadar> => {
    const response = await fetch(`${API_BASE}/radars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(radar),
    });
    if (!response.ok) throw new Error("Failed to create radar");
    return response.json();
  },

  updateStatus: async (id: number, status: string): Promise<ApiRadar> => {
    const response = await fetch(`${API_BASE}/radars/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update radar status");
    return response.json();
  },
};

// Telemetry API calls
export const telemetryApi = {
  getLatest: async (): Promise<ApiTelemetry[]> => {
    const response = await fetch(`${API_BASE}/telemetry/latest`);
    if (!response.ok) throw new Error("Failed to fetch telemetry");
    return response.json();
  },

  create: async (telemetry: Omit<ApiTelemetry, "id" | "timestamp">): Promise<ApiTelemetry> => {
    const response = await fetch(`${API_BASE}/telemetry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(telemetry),
    });
    if (!response.ok) throw new Error("Failed to create telemetry");
    return response.json();
  },
};

// Alert API calls
export const alertApi = {
  getAll: async (): Promise<ApiAlert[]> => {
    const response = await fetch(`${API_BASE}/alerts`);
    if (!response.ok) throw new Error("Failed to fetch alerts");
    return response.json();
  },

  getOpen: async (): Promise<ApiAlert[]> => {
    const response = await fetch(`${API_BASE}/alerts?status=OPEN`);
    if (!response.ok) throw new Error("Failed to fetch open alerts");
    return response.json();
  },

  create: async (alert: Omit<ApiAlert, "id" | "createdAt">): Promise<ApiAlert> => {
    const response = await fetch(`${API_BASE}/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alert),
    });
    if (!response.ok) throw new Error("Failed to create alert");
    return response.json();
  },

  acknowledge: async (id: number): Promise<ApiAlert> => {
    const response = await fetch(`${API_BASE}/alerts/${id}/acknowledge`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to acknowledge alert");
    return response.json();
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string }> => {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) throw new Error("Backend is not healthy");
    return response.json();
  },
};
