import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/violations")({
  component: ViolationsPage,
});

function severity(exceededBy: number) {
  if (exceededBy < 20) return { label: "Mineure", variant: "secondary" as const };
  if (exceededBy < 30) return { label: "Modérée", variant: "default" as const };
  if (exceededBy < 50) return { label: "Grave", variant: "destructive" as const };
  return { label: "Très grave", variant: "destructive" as const };
}

function ViolationsPage() {
  const { violations, radars } = useStore();
  const sorted = [...violations].sort((a, b) => b.violationDate.localeCompare(a.violationDate));
  const totalFines = violations.reduce((s, v) => s + v.fine, 0);

  return (
    <>
      <PageHeader title="Infractions" description="Excès de vitesse détectés et amendes générées" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Total infractions</p>
          <p className="mt-2 text-3xl font-semibold">{violations.length}</p>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Total amendes</p>
          <p className="mt-2 text-3xl font-semibold">{totalFines} €</p>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Excès moyen</p>
          <p className="mt-2 text-3xl font-semibold">
            {violations.length ? (violations.reduce((s, v) => s + v.exceededBy, 0) / violations.length).toFixed(1) : "0"} km/h
          </p>
        </CardContent></Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Plaque</TableHead>
              <TableHead>Vitesse</TableHead>
              <TableHead>Excès</TableHead>
              <TableHead>Amende</TableHead>
              <TableHead>Gravité</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((v) => {
              const sev = severity(v.exceededBy);
              const radar = radars.find((r) => r.id === v.radarId);
              return (
                <TableRow key={v.id}>
                  <TableCell className="text-muted-foreground">#{v.id}</TableCell>
                  <TableCell className="font-mono font-medium">{v.plateNumber}</TableCell>
                  <TableCell>{v.speed} km/h</TableCell>
                  <TableCell className="font-semibold text-destructive">+{v.exceededBy} km/h</TableCell>
                  <TableCell className="font-semibold">{v.fine} €</TableCell>
                  <TableCell><Badge variant={sev.variant}>{sev.label}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{radar?.location ?? "—"}</TableCell>
                  <TableCell className="text-sm">{new Date(v.violationDate).toLocaleString("fr-FR")}</TableCell>
                </TableRow>
              );
            })}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  Aucune infraction
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
