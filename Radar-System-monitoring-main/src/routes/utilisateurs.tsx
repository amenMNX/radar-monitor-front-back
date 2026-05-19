import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, User as UserIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/utilisateurs")({
  component: UtilisateursPage,
});

function UtilisateursPage() {
  const { accounts, setUserRole, deleteAccount, currentEmail } = useStore();
  const sorted = [...accounts].sort((a, b) => a.id - b.id);

  return (
    <>
      <PageHeader
        title="Utilisateurs"
        description="Gérez les comptes et promouvez des utilisateurs en administrateurs"
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((a) => {
              const isMe = a.email === currentEmail;
              return (
                <TableRow key={a.id}>
                  <TableCell className="text-muted-foreground">#{a.id}</TableCell>
                  <TableCell className="font-medium">
                    {a.email}
                    {isMe && <span className="ml-2 text-xs text-muted-foreground">(vous)</span>}
                  </TableCell>
                  <TableCell>
                    {a.role === "admin" ? (
                      <Badge className="gap-1"><Shield className="h-3 w-3" /> Admin</Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1"><UserIcon className="h-3 w-3" /> Utilisateur</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(a.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {a.role === "user" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setUserRole(a.id, "admin");
                          toast.success(`${a.email} promu administrateur`);
                        }}
                      >
                        <Shield className="h-3.5 w-3.5 mr-1" /> Promouvoir admin
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isMe}
                        onClick={() => {
                          setUserRole(a.id, "user");
                          toast.success(`${a.email} rétrogradé utilisateur`);
                        }}
                      >
                        <UserIcon className="h-3.5 w-3.5 mr-1" /> Rétrograder
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={isMe}
                      onClick={() => {
                        deleteAccount(a.id);
                        toast.success("Compte supprimé");
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
