import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";

export default function CourseDetail() {
  const { id } = useParams();
  const user = getUser();

  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<any>(`/api/courses/${id}`)
      .then((res : any) => {
        setCourse(res.course);
        setLessons(res.lessons);
      })
      .catch((e : any) => setError(e.message));
  }, [id]);

  async function enroll() {
    setError("");
    setMessage("");

    try {
      const res = await api<any>(`/api/courses/${id}/enroll`, {
        method: "POST",
      });
      setMessage(res.message);
    } catch (e: any) {
      setError(e.message);
    }
  }

  if (!course) return <p>Chargement…</p>;

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: 16 }}>
      <Link to="/courses">← Retour</Link>

      <h2>{course.title}</h2>
      <p>{course.description}</p>

      {user?.role === "student" && (
        <button onClick={enroll}>S’inscrire au cours</button>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <h3>Leçons</h3>
      <ol>
        {lessons.map((l) => (
          <li key={l.id}>
            {user ? (
              <Link to={`/lessons/${l.id}`}>{l.title}</Link>
            ) : (
              l.title
            )}
          </li>
        ))}
      </ol>

      {!user && <p>Connectez-vous pour accéder aux leçons.</p>}
    </div>
  );
}
