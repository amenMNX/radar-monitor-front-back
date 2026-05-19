export interface Radar {
  id: number;
  location: string;
  maxSpeed: number;
  active: boolean;
}

export interface Detection {
  id: number;
  plateNumber: string;
  speed: number;
  detectionDate: string;
  radarId: number;
}

export interface Violation {
  id: number;
  plateNumber: string;
  speed: number;
  exceededBy: number;
  fine: number;
  violationDate: string;
  radarId: number;
}

export interface Vehicle {
  id: number;
  plateNumber: string;
  chevaux: number;
  ownerEmail: string;
  registeredAt: string;
}

export type Role = "admin" | "user";

export interface Account {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
}
