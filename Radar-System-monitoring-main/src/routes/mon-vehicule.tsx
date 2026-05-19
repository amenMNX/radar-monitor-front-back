import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Car } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/mon-vehicule")({
  component: MonVehiculePage,
});

function MonVehiculePage() {
  const { vehicles, addVehicle, currentEmail } = useStore();
  const [plateNumber, setPlateNumber] = useState("");
  const [chevaux, setChevaux] = useState("");

  const mine = vehicles.filter((v) => v.ownerEmail === currentEmail);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ch = Number(chevaux);
    if (!plateNumber.trim() || !ch || ch < 1 || ch > 50) {
      toast.error("Plaque et chevaux fiscaux requis (1–50)");
      return;
    }
    addVehicle({ plateNumber: plateNumber.trim(), chevaux: ch });
    toast.success("Véhicule enregistré");
    setPlateNumber("");
    setChevaux("");
  };

  return (
    <>
      <PageHeader
        title="Mon véhicule"
        description="Enregistrez votre plaque et le nombre de chevaux fiscaux"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plate">Plaque d'immatriculation</Label>
                <Input
                  id="plate"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="AB-123-CD"
                  maxLength={15}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ch">Nombre de chevaux fiscaux</Label>
                <Input
                  id="ch"
                  type="number"
                  min={1}
                  max={50}
                  value={chevaux}
                  onChange={(e) => setChevaux(e.target.value)}
                  placeholder="7"
                  required
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Car className="h-4 w-4" /> Enregistrer le véhicule
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plaque</TableHead>
                <TableHead>Chevaux</TableHead>
                <TableHead>Enregistré le</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mine.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-mono font-medium">{v.plateNumber}</TableCell>
                  <TableCell>{v.chevaux} CV</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(v.registeredAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                </TableRow>
              ))}
              {mine.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    Aucun véhicule enregistré
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}
