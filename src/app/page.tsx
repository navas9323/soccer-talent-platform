import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const forPlayers = [
  {
    title: "CV digital completo",
    description:
      "Estadísticas, logros, historial de clubes y videos de YouTube o Vimeo en un solo perfil.",
  },
  {
    title: "Visibilidad ante agentes",
    description:
      "Aparece en búsquedas por posición, edad, nivel y disponibilidad para pruebas o transferencias.",
  },
  {
    title: "Mensajería directa",
    description:
      "Recibe mensajes de agentes y equipos interesados, con notificaciones en tiempo real.",
  },
];

const forAgents = [
  {
    title: "Búsqueda avanzada",
    description:
      "Filtra por posición, rango de edad, nacionalidad, ubicación, nivel y estadísticas de carrera.",
  },
  {
    title: "Listas de seguimiento",
    description:
      "Agrega jugadores a shortlists y guarda notas privadas visibles solo para ti.",
  },
  {
    title: "Búsquedas guardadas",
    description:
      "Guarda combinaciones de filtros para reutilizarlas cuando quieras.",
  },
];

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    tone: "neutral" as const,
    features: ["Perfil estándar", "Hasta 2 videos", "Búsqueda estándar"],
  },
  {
    name: "Premium",
    price: "De pago",
    tone: "pitch" as const,
    features: [
      "Hasta 5 videos",
      "Visibilidad prioritaria",
      "Herramientas completas para agentes",
    ],
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,rgba(22,163,74,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_40%)]" />
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <Badge tone="pitch">Fútbol · LatAm · Talento</Badge>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Conecta el talento del fútbol con quienes buscan{" "}
            <span className="text-pitch-400">al próximo fichaje.</span>
          </h1>
          <p className="max-w-2xl text-lg text-night-200">
            CanteraPro es la plataforma donde jugadores crean su CV digital y
            agentes o equipos en toda Latinoamérica descubren, comparan y
            contactan nuevo talento.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/registrarse?rol=PLAYER" variant="primary">
              Soy jugador — crear perfil
            </Button>
            <Button href="/registrarse?rol=AGENT" variant="secondary">
              Soy agente o equipo
            </Button>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-sky-400">
          Para jugadores
        </h2>
        <p className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">
          Muestra tu nivel con un perfil hecho para que te descubran.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {forPlayers.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold text-night-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-night-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-pitch-400">
          Para agentes y equipos
        </h2>
        <p className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">
          Encuentra y organiza el talento que estás buscando.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {forAgents.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold text-night-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-night-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-sky-400">
          Planes de membresía
        </h2>
        <p className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">
          Empieza gratis, mejora cuando lo necesites.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <Badge tone={plan.tone}>{plan.price}</Badge>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-night-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-pitch-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Card className="flex flex-col items-start gap-4 bg-gradient-to-br from-night-800 to-night-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="mt-1 text-night-300">
              Crea tu cuenta gratis en menos de un minuto.
            </p>
          </div>
          <Button href="/registrarse" variant="primary">
            Crear cuenta gratis
          </Button>
        </Card>
      </section>
    </div>
  );
}
