import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/detections")({
  component: DetectionsPage,
});

function DetectionsPage() {
  const { detections, radars, addDetection } = useStore();
  const [open, setOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const [speed, setSpeed] = useState("");
  const [radarId, setRadarId] = useState<string>(radars[0]?.id?.toString() ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber || !speed || !radarId) return;
    addDetection({
      plateNumber: plateNumber.toUpperCase(),
      speed: Number(speed),
      radarId: Number(radarId),
      detectionDate: new Date().toISOString(),
    });
    toast.success("Détection enregistrée");
    setOpen(false);
    setPlateNumber("");
    setSpeed("");
  };

  const sorted = [...detections].sort((a, b) => b.detectionDate.localeCompare(a.detectionDate));

  return (
    <>
      <PageHeader
        title="Détections"
        description="Passages de véhicules enregistrés par les radars"
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Nouvelle détection
          </Button>
        }
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Plaque</TableHead>
              <TableHead>Vitesse</TableHead>
              <TableHead>Radar</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((d) => {
              const radar = radars.find((r) => r.id === d.radarId);
              const violation = radar && d.speed > radar.maxSpeed;
              return (
                <TableRow key={d.id}>
                  <TableCell className="text-muted-foreground">#{d.id}</TableCell>
                  <TableCell className="font-mono font-medium">{d.plateNumber}</TableCell>
                  <TableCell>
                    <span className={violation ? "font-semibold text-destructive" : ""}>{d.speed} km/h</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {radar?.location ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm">{new Date(d.detectionDate).toLocaleString("fr-FR")}</TableCell>
                  <TableCell>
                    {violation ? (
                      <Badge variant="destructive">Infraction</Badge>
                    ) : (
                      <Badge variant="secondary">Conforme</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Aucune détection
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle détection</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plate">Plaque d'immatriculation</Label>
              <Input id="plate" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} placeholder="AB-123-CD" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sp">Vitesse mesurée (km/h)</Label>
              <Input id="sp" type="number" min="1" value={speed} onChange={(e) => setSpeed(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Radar</Label>
              <Select value={radarId} onValueChange={setRadarId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un radar" />
                </SelectTrigger>
                <SelectContent>
                  {radars.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.location} ({r.maxSpeed} km/h)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
