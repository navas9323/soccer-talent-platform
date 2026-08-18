import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Buscar jugadores — CanteraPro",
};

const positionLabel: Record<string, string> = {
  GOALKEEPER: "Portero",
  CENTER_BACK: "Defensa central",
  FULL_BACK: "Lateral",
  DEFENSIVE_MIDFIELDER: "Mediocampista defensivo",
  CENTRAL_MIDFIELDER: "Mediocampista",
  ATTACKING_MIDFIELDER: "Mediocampista ofensivo",
  WINGER: "Extremo",
  STRIKER: "Delantero",
  FORWARD: "Delantero centro",
};

const levelLabel: Record<string, string> = {
  AMATEUR: "Amateur",
  SEMI_PRO: "Semiprofesional",
  PROFESSIONAL: "Profesional",
};

export default async function JugadoresPage() {
  const players = await prisma.playerProfile.findMany({
    where: { moderationStatus: "APPROVED" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-extrabold">Buscar jugadores</h1>
      <p className="mt-2 text-night-300">
        Perfiles aprobados disponibles en la plataforma. Los filtros
        avanzados (posición, edad, país, nivel, estadísticas) llegan en la
        siguiente fase.
      </p>

      {players.length === 0 ? (
        <p className="mt-10 text-night-400">
          Todavía no hay perfiles aprobados. Ejecuta el seed de datos de
          demostración para ver ejemplos aquí.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <Card key={player.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{player.user.name}</h2>
                <Badge tone={player.openToTrials ? "pitch" : "neutral"}>
                  {player.openToTrials ? "Disponible" : "No disponible"}
                </Badge>
              </div>
              <p className="text-sm text-night-300">
                {player.nationality ?? "—"} · {player.location ?? "—"}
              </p>
              <div className="flex flex-wrap gap-2">
                {player.positions.map((position) => (
                  <Badge key={position} tone="sky">
                    {positionLabel[position] ?? position}
                  </Badge>
                ))}
              </div>
              <p className="text-xs uppercase tracking-wide text-night-400">
                {levelLabel[player.experienceLevel]}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
