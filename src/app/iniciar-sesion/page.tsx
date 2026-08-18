import { Suspense } from "react";
import Link from "next/link";

import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Iniciar sesión — CanteraPro",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-20">
      <div>
        <h1 className="text-3xl font-extrabold">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-night-300">
          ¿No tienes cuenta?{" "}
          <Link href="/registrarse" className="text-pitch-400 hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>

      <Card>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </Card>
    </div>
  );
}
