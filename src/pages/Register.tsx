import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { saveAuth, type Role } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await api<{ token: string; user: any }>("/register", {
        method: "POST",
        body: JSON.stringify({
          username: name,
          password: password,
          role: role,
        }),
      });

      console.log(res)

      saveAuth(res.token, res.user);
      toast.success("Compte créé avec succès!");
      navigate(res.user.role === "teacher" ? "/teacher" : "/student");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "30px auto", padding: 16 }}>
      <h2>Inscription</h2>

      <form onSubmit={submit}>
        <Input
          placeholder="Nom d'utilisateur"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <Select
          value={role}
          onValueChange={(value) => setRole(value as Role)}
        >
          <SelectTrigger className="w-full mb-2">
            <SelectValue placeholder="Choisir un rôle" />
          </SelectTrigger>
        
          <SelectContent>
            <SelectItem value="student">Étudiant</SelectItem>
            <SelectItem value="teacher">Enseignant</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="password"
          placeholder="Mot de passe (8 caractères min.)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <Button style={{ width: "100%" }}>Créer un compte</Button>
      </form>

      <p style={{ marginTop: 10 }}>
        Déjà un compte ? <Link className="text-blue-500 dark:text-blue-300"to="/login">Connexion</Link>
      </p>
    </div>
  );
}
