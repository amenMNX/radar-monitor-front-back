import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/vehicules")({
  component: VehiculesPage,
});

function VehiculesPage() {
  const { vehicles } = useStore();
  const sorted = [...vehicles].sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));

  return (
    <>
      <PageHeader
        title="Véhicules"
        description="Tous les véhicules enregistrés par les utilisateurs"
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Plaque</TableHead>
              <TableHead>Chevaux fiscaux</TableHead>
              <TableHead>Propriétaire</TableHead>
              <TableHead>Enregistré le</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="text-muted-foreground">#{v.id}</TableCell>
                <TableCell className="font-mono font-medium">{v.plateNumber}</TableCell>
                <TableCell>{v.chevaux} CV</TableCell>
                <TableCell className="text-sm">{v.ownerEmail}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(v.registeredAt).toLocaleString("fr-FR")}
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Aucun véhicule
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
