import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await api<{ token: string; user: any }>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      saveAuth(res.token, res.user);
      navigate(res.user.role === "teacher" ? "/teacher" : "/student");
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "30px auto", padding: 16 }}>
      <h2>Connexion</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={submit}>
        <Input
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <Button>Se connecter</Button>
      </form>

      <p style={{ marginTop: 10 }}>
        Pas encore de compte ? <Link className="text-blue-500 dark:text-blue-300" to="/register">Inscription</Link>
      </p>
    </div>
  );
}
