import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Mi panel — CanteraPro",
};

export default async function PanelPage() {
  const session = await auth();
  if (!session?.user) redirect("/iniciar-sesion");

  const { id, role, name } = session.user;

  if (role === "PLAYER") {
    const profile = await prisma.playerProfile.findUnique({
      where: { userId: id },
      include: { _count: { select: { videos: true, careerStats: true } } },
    });

    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Hola, {name} 👋</h1>
        <p className="mt-2 text-night-300">
          Este es tu panel de jugador. Completa tu CV digital para que los
          agentes puedan encontrarte.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className="text-xs uppercase text-night-400">Estado del perfil</p>
            <Badge tone={profile?.moderationStatus === "APPROVED" ? "pitch" : "neutral"} className="mt-2">
              {profile?.moderationStatus ?? "PENDIENTE"}
            </Badge>
          </Card>
          <Card>
            <p className="text-xs uppercase text-night-400">Videos</p>
            <p className="mt-2 text-2xl font-bold">{profile?._count.videos ?? 0}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-night-400">Temporadas registradas</p>
            <p className="mt-2 text-2xl font-bold">{profile?._count.careerStats ?? 0}</p>
          </Card>
        </div>
      </div>
    );
  }

  if (role === "AGENT") {
    const [shortlistCount, savedSearchCount, noteCount] = await Promise.all([
      prisma.shortlist.count({ where: { agentId: id } }),
      prisma.savedSearch.count({ where: { userId: id } }),
      prisma.note.count({ where: { authorId: id } }),
    ]);

    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-extrabold">Hola, {name} 👋</h1>
        <p className="mt-2 text-night-300">
          Este es tu panel de agente. Busca jugadores, arma tus listas de
          seguimiento y guarda tus búsquedas favoritas.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className="text-xs uppercase text-night-400">Listas de seguimiento</p>
            <p className="mt-2 text-2xl font-bold">{shortlistCount}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-night-400">Búsquedas guardadas</p>
            <p className="mt-2 text-2xl font-bold">{savedSearchCount}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-night-400">Notas privadas</p>
            <p className="mt-2 text-2xl font-bold">{noteCount}</p>
          </Card>
        </div>
      </div>
    );
  }

  const [userCount, pendingProfiles, flaggedVideos] = await Promise.all([
    prisma.user.count(),
    prisma.playerProfile.count({ where: { moderationStatus: "PENDING" } }),
    prisma.video.count({ where: { moderationStatus: "FLAGGED" } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-extrabold">Panel de administración</h1>
      <p className="mt-2 text-night-300">
        Modera perfiles y contenido, y supervisa la actividad de la plataforma.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase text-night-400">Usuarios totales</p>
          <p className="mt-2 text-2xl font-bold">{userCount}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-night-400">Perfiles pendientes</p>
          <p className="mt-2 text-2xl font-bold">{pendingProfiles}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-night-400">Videos marcados</p>
          <p className="mt-2 text-2xl font-bold">{flaggedVideos}</p>
        </Card>
      </div>
    </div>
  );
}
