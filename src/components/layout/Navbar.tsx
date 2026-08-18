import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/Button";

const roleLabel: Record<string, string> = {
  PLAYER: "Jugador",
  AGENT: "Agente",
  ADMIN: "Administrador",
};

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-night-700 bg-night-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-night-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pitch-500 text-night-950">
            ⚽
          </span>
          Cantera<span className="text-pitch-400">Pro</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-night-200 md:flex">
          <Link href="/jugadores" className="transition-colors hover:text-pitch-300">
            Buscar jugadores
          </Link>
          <Link href="/#planes" className="transition-colors hover:text-pitch-300">
            Planes
          </Link>
          <Link href="/#como-funciona" className="transition-colors hover:text-pitch-300">
            Cómo funciona
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="hidden text-xs text-night-300 sm:inline">
                {roleLabel[session.user.role] ?? session.user.role}
              </span>
              <Button href="/panel" variant="ghost" className="!py-2">
                Mi panel
              </Button>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button variant="ghost" className="!py-2">
                  Salir
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button href="/iniciar-sesion" variant="ghost" className="!py-2">
                Iniciar sesión
              </Button>
              <Button href="/registrarse" variant="primary" className="!py-2">
                Crear cuenta
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
