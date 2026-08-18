"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Role = "PLAYER" | "AGENT";

export function RegisterForm({ defaultRole }: { defaultRole: Role }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(defaultRole);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role,
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "No se pudo crear la cuenta");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.error) {
      router.push("/iniciar-sesion");
      return;
    }

    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setRole("PLAYER")}
          className={`rounded-xl border px-4 py-3 text-left transition-colors ${
            role === "PLAYER"
              ? "border-pitch-400 bg-pitch-500/10 text-pitch-200"
              : "border-night-600 text-night-300 hover:border-night-400"
          }`}
        >
          <span className="block text-sm font-semibold">Jugador</span>
          <span className="block text-xs text-night-400">
            Quiero crear mi CV digital
          </span>
        </button>
        <button
          type="button"
          onClick={() => setRole("AGENT")}
          className={`rounded-xl border px-4 py-3 text-left transition-colors ${
            role === "AGENT"
              ? "border-sky-400 bg-sky-500/10 text-sky-200"
              : "border-night-600 text-night-300 hover:border-night-400"
          }`}
        >
          <span className="block text-sm font-semibold">Agente / Equipo</span>
          <span className="block text-xs text-night-400">
            Quiero buscar jugadores
          </span>
        </button>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-night-200">Nombre completo</span>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          className="rounded-lg border border-night-600 bg-night-900 px-3 py-2.5 text-night-50 outline-none focus:border-pitch-400"
          placeholder="Juan Pérez"
        />
      </label>

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
          minLength={8}
          className="rounded-lg border border-night-600 bg-night-900 px-3 py-2.5 text-night-50 outline-none focus:border-pitch-400"
          placeholder="Mínimo 8 caracteres"
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
        {loading ? "Creando cuenta…" : "Crear cuenta"}
      </button>
    </form>
  );
}
