const API = "http://localhost:7000";

export function getToken() {
  return localStorage.getItem("token");
}

function extractErrorMessage(data: any): string | null {
  if (typeof data?.message === "string" && !data?.errors) return data.message;

  const raw = data?.errors?.message; // zod error
  if (typeof raw !== "string") return null;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed
      .map(e => e?.message)
      .filter(Boolean)
      .join("\n") || null;
  } catch {
    return null;
  }
}


export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as any),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });

  if (!res.ok) {
    let msg: string | null = null;
    try {
      const data = await res.json();
      msg = extractErrorMessage(data)
    } catch {
      msg = null;
    }

    throw new Error(msg ?? `Erreur ${res.status}`);
  }

  return res.json();
}
