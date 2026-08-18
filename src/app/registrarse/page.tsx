import Link from "next/link";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Crear cuenta — CanteraPro",
};

export default async function RegisterPage({
  searchParams,
}: PageProps<"/registrarse">) {
  const params = await searchParams;
  const rol = Array.isArray(params.rol) ? params.rol[0] : params.rol;
  const defaultRole = rol === "AGENT" ? "AGENT" : "PLAYER";

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-20">
      <div>
        <h1 className="text-3xl font-extrabold">Crear cuenta</h1>
        <p className="mt-2 text-sm text-night-300">
          ¿Ya tienes cuenta?{" "}
          <Link href="/iniciar-sesion" className="text-pitch-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>

      <Card>
        <RegisterForm defaultRole={defaultRole} />
      </Card>
    </div>
  );
}
