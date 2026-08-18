"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    router.push(searchParams.get("callbackUrl") ?? "/panel");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-night-200">Correo electrónico</span>
        <input
          name="email"
          type="email"
          required
          className="rounded-lg border border-night-600 bg-night-900 px-3 py-2.5 text-night-50 outline-none focus:border-pitch-400"
          placeholder="tucorreo@ejemplo.com"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-night-200">Contraseña</span>
        <input
          name="password"
          type="password"
          required
          className="rounded-lg border border-night-600 bg-night-900 px-3 py-2.5 text-night-50 outline-none focus:border-pitch-400"
          placeholder="••••••••"
        />
      </label>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-full bg-pitch-500 px-5 py-3 text-sm font-semibold text-night-950 transition-all hover:-translate-y-0.5 hover:bg-pitch-400 disabled:opacity-50"
      >
        {loading ? "Ingresando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}
