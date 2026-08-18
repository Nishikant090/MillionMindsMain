// Base URL of the FastAPI backend. Set NEXT_PUBLIC_API_URL at build time when
// deploying (it's baked into the static export); defaults to the local dev API.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function extractErrorMessage(res: Response): Promise<string> {
  const body = await res.json().catch(() => null);
  const detail = body?.detail;
  if (Array.isArray(detail)) return detail[0]?.msg || "Request failed";
  if (typeof detail === "string") return detail;
  return "Request failed";
}

export async function subscribeToNewsletter(email: string): Promise<{ status: string; email: string }> {
  const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error(await extractErrorMessage(res));
  return res.json();
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error(await extractErrorMessage(res));
  return res.json();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error(await extractErrorMessage(res));
  return res.json();
}

export async function getMe(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await extractErrorMessage(res));
  return res.json();
}
