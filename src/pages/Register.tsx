import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { saveAuth, type Role } from "@/lib/auth";
export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await api<{ token: string; user: any }>("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: name || undefined,
          email,
          password,
          role,
        }),
      });

      saveAuth(res.token, res.user);
      navigate(res.user.role === "teacher" ? "/teacher" : "/student");
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "30px auto", padding: 16 }}>
      <h2>Inscription</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          placeholder="Nom (optionnel)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <input
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          style={{ width: "100%", marginBottom: 8 }}
        >
          <option value="student">Étudiant</option>
          <option value="teacher">Enseignant</option>
        </select>

        <input
          type="password"
          placeholder="Mot de passe (8 caractères min.)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <button style={{ width: "100%" }}>Créer un compte</button>
      </form>

      <p style={{ marginTop: 10 }}>
        Déjà un compte ? <Link to="/login">Connexion</Link>
      </p>
    </div>
  );
}
