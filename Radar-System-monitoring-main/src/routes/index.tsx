import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, AlertTriangle, Car, MapPin, Radar as RadarIcon, ScanLine, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const { role } = useStore();

  if (role === "user") {
    return <UserDashboardPage />;
  }

  return <AdminDashboardPage />;
}

function AdminDashboardPage() {
  const { radars, detections, violations } = useStore();
  const activeRadars = radars.filter((r) => r.active).length;
  const totalFines = violations.reduce((s, v) => s + v.fine, 0);

  const counts = new Map<number, number>();
  violations.forEach((v) => counts.set(v.radarId, (counts.get(v.radarId) ?? 0) + 1));
  const dangerZones = [...counts.entries()]
    .map(([radarId, count]) => ({
      radar: radars.find((r) => r.id === radarId),
      count,
    }))
    .filter((z) => z.radar)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recent = [...violations].sort((a, b) => b.violationDate.localeCompare(a.violationDate)).slice(0, 5);

  return (
    <>
      <PageHeader title="Tableau de bord" description="Vue d'ensemble du parc de radars et des infractions" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Radars totaux" value={radars.length} icon={RadarIcon} accent="bg-primary/10 text-primary" />
        <StatCard label="Radars actifs" value={activeRadars} icon={Activity} accent="bg-emerald-500/10 text-emerald-600" />
        <StatCard label="Detections" value={detections.length} icon={ScanLine} accent="bg-blue-500/10 text-blue-600" />
        <StatCard label="Infractions" value={violations.length} icon={AlertTriangle} accent="bg-destructive/10 text-destructive" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zones les plus dangereuses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dangerZones.length === 0 && <p className="text-sm text-muted-foreground">Aucune infraction enregistree.</p>}
            {dangerZones.map((z) => (
              <div key={z.radar!.id} className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm">{z.radar!.location}</span>
                </div>
                <span className="text-sm font-semibold tabular-nums">{z.count} infractions</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Infractions recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.length === 0 && <p className="text-sm text-muted-foreground">Aucune infraction.</p>}
            {recent.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex min-w-0 flex-col">
                  <span className="font-medium">{v.plateNumber}</span>
                  <span className="text-xs text-muted-foreground">{new Date(v.violationDate).toLocaleString("fr-FR")}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-destructive">+{v.exceededBy} km/h</div>
                  <div className="text-xs text-muted-foreground">{v.fine} EUR</div>
                </div>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Total des amendes</span>
              <span className="font-semibold">{totalFines} EUR</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function UserDashboardPage() {
  const { radars, detections, violations, vehicles, currentEmail } = useStore();
  const myVehicles = vehicles.filter((v) => v.ownerEmail === currentEmail);
  const myPlates = myVehicles.map((v) => v.plateNumber.toUpperCase());
  const [plateSearch, setPlateSearch] = useState(myPlates[0] ?? "");
  const normalizedSearch = plateSearch.trim().toUpperCase();
  const selectedPlates = normalizedSearch
    ? myPlates.filter((plate) => plate.includes(normalizedSearch))
    : myPlates;

  const myDetections = detections
    .filter((d) => selectedPlates.includes(d.plateNumber.toUpperCase()))
    .sort((a, b) => b.detectionDate.localeCompare(a.detectionDate));
  const myViolations = violations
    .filter((v) => selectedPlates.includes(v.plateNumber.toUpperCase()))
    .sort((a, b) => b.violationDate.localeCompare(a.violationDate));
  const totalFines = myViolations.reduce((sum, violation) => sum + violation.fine, 0);
  const averageExceededBy = myViolations.length
    ? (myViolations.reduce((sum, violation) => sum + violation.exceededBy, 0) / myViolations.length).toFixed(1)
    : "0";

  const touchedRadars = [...new Set([...myDetections.map((d) => d.radarId), ...myViolations.map((v) => v.radarId)])]
    .map((radarId) => {
      const radar = radars.find((r) => r.id === radarId);
      const radarViolations = myViolations.filter((v) => v.radarId === radarId);
      return {
        radar,
        detections: myDetections.filter((d) => d.radarId === radarId).length,
        violations: radarViolations.length,
        fines: radarViolations.reduce((sum, violation) => sum + violation.fine, 0),
      };
    })
    .filter((entry) => entry.radar);

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Vos passages radar, infractions et couts selon votre matricule"
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="plate-search">Rechercher par matricule</Label>
              <Input
                id="plate-search"
                value={plateSearch}
                onChange={(event) => setPlateSearch(event.target.value.toUpperCase())}
                placeholder="AB-123-CD"
                className="font-mono"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {myPlates.map((plate) => (
                <button
                  key={plate}
                  type="button"
                  onClick={() => setPlateSearch(plate)}
                  className="rounded-md border border-input px-3 py-2 font-mono text-sm transition-colors hover:bg-accent"
                >
                  {plate}
                </button>
              ))}
              {myPlates.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucun vehicule enregistre. Ajoutez votre matricule dans la page Mon vehicule.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Vehicules" value={myVehicles.length} icon={Car} accent="bg-primary/10 text-primary" />
        <StatCard label="Radars rencontres" value={touchedRadars.length} icon={RadarIcon} accent="bg-emerald-500/10 text-emerald-600" />
        <StatCard label="Passages detectes" value={myDetections.length} icon={ScanLine} accent="bg-blue-500/10 text-blue-600" />
        <StatCard label="Cout total" value={`${totalFines} EUR`} icon={Wallet} accent="bg-destructive/10 text-destructive" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Radars lies a votre matricule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {touchedRadars.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun passage radar trouve pour ce matricule.</p>
            )}
            {touchedRadars.map((entry) => (
              <div key={entry.radar!.id} className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{entry.radar!.location}</p>
                    <p className="text-xs text-muted-foreground">Limite {entry.radar!.maxSpeed} km/h</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">{entry.violations} infractions</p>
                  <p className="text-xs text-muted-foreground">{entry.fines} EUR</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resume des penalites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Infractions</span>
              <span className="font-semibold">{myViolations.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Depassement moyen</span>
              <span className="font-semibold">{averageExceededBy} km/h</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4 text-sm">
              <span className="text-muted-foreground">Cout total</span>
              <span className="font-semibold text-destructive">{totalFines} EUR</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Mes infractions recentes</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matricule</TableHead>
              <TableHead>Vitesse</TableHead>
              <TableHead>Exces</TableHead>
              <TableHead>Amende</TableHead>
              <TableHead>Radar</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myViolations.map((violation) => {
              const radar = radars.find((r) => r.id === violation.radarId);
              return (
                <TableRow key={violation.id}>
                  <TableCell className="font-mono font-medium">{violation.plateNumber}</TableCell>
                  <TableCell>{violation.speed} km/h</TableCell>
                  <TableCell>
                    <Badge variant="destructive">+{violation.exceededBy} km/h</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{violation.fine} EUR</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{radar?.location ?? "-"}</TableCell>
                  <TableCell className="text-sm">{new Date(violation.violationDate).toLocaleString("fr-FR")}</TableCell>
                </TableRow>
              );
            })}
            {myViolations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  Aucune infraction trouvee pour ce matricule.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
