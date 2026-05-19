import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Radar } from "@/lib/types";
import { toast } from "sonner";

export const Route = createFileRoute("/radars")({
  component: RadarsPage,
});

function RadarsPage() {
  const { radars, addRadar, updateRadar, deleteRadar, toggleRadar } = useStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Radar | null>(null);
  const [location, setLocation] = useState("");
  const [maxSpeed, setMaxSpeed] = useState("90");

  const startCreate = () => {
    setEditing(null);
    setLocation("");
    setMaxSpeed("90");
    setOpen(true);
  };

  const startEdit = (r: Radar) => {
    setEditing(r);
    setLocation(r.location);
    setMaxSpeed(String(r.maxSpeed));
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const speed = Number(maxSpeed);
    if (!location.trim() || !speed) return;
    if (editing) {
      updateRadar(editing.id, { location, maxSpeed: speed });
      toast.success("Radar mis à jour");
    } else {
      addRadar({ location, maxSpeed: speed, active: true });
      toast.success("Radar ajouté");
    }
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Radars"
        description="Gérer les radars de circulation"
        actions={
          <Button onClick={startCreate}>
            <Plus className="h-4 w-4 mr-2" /> Ajouter un radar
          </Button>
        }
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Vitesse max</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {radars.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="text-muted-foreground">#{r.id}</TableCell>
                <TableCell className="font-medium">{r.location}</TableCell>
                <TableCell>{r.maxSpeed} km/h</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Switch checked={r.active} onCheckedChange={() => toggleRadar(r.id)} />
                    <Badge variant={r.active ? "default" : "secondary"}>
                      {r.active ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(r)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      deleteRadar(r.id);
                      toast.success("Radar supprimé");
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {radars.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Aucun radar enregistré
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le radar" : "Nouveau radar"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="speed">Vitesse maximale (km/h)</Label>
              <Input id="speed" type="number" min="10" value={maxSpeed} onChange={(e) => setMaxSpeed(e.target.value)} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button type="submit">{editing ? "Enregistrer" : "Ajouter"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
