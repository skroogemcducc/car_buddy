"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [initials, setInitials] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initials, pin }),
    });

    setSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Registration failed.");
      return;
    }

    router.push("/car");
    router.refresh();
  }

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Initials
          <input
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label>
          Choose a PIN (4 to 8 digits)
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoComplete="new-password"
            required
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>
          Register
        </button>
      </form>
      <p>
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
