import { PrismaClient, Position, ExperienceLevel } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEMO_PASSWORD = "Demo1234!";

async function hashed() {
  return bcrypt.hash(DEMO_PASSWORD, 12);
}

async function main() {
  const passwordHash = await hashed();

  // ── Admin ────────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@canterapro.demo" },
    update: {},
    create: {
      name: "Admin CanteraPro",
      email: "admin@canterapro.demo",
      passwordHash,
      role: "ADMIN",
    },
  });

  // ── Agents ───────────────────────────────────────────────────────────
  const agent = await prisma.user.upsert({
    where: { email: "agente@canterapro.demo" },
    update: {},
    create: {
      name: "Marcela Rossi",
      email: "agente@canterapro.demo",
      passwordHash,
      role: "AGENT",
      agentProfile: {
        create: {
          organizationName: "Rossi Sports Management",
          title: "Agente FIFA certificada",
          phone: "+54 11 5555-0100",
          verified: true,
        },
      },
    },
  });

  const scout = await prisma.user.upsert({
    where: { email: "scout@canterapro.demo" },
    update: {},
    create: {
      name: "Diego Fernández",
      email: "scout@canterapro.demo",
      passwordHash,
      role: "AGENT",
      agentProfile: {
        create: {
          organizationName: "Club Atlético Boca Talent Dept.",
          title: "Ojeador juvenil",
          phone: "+54 11 5555-0101",
          verified: false,
        },
      },
    },
  });

  // ── Players ──────────────────────────────────────────────────────────
  type PlayerSeed = {
    email: string;
    name: string;
    dateOfBirth: string;
    heightCm: number;
    weightKg: number;
    nationality: string;
    location: string;
    positions: Position[];
    playStyle: string;
    experienceLevel: ExperienceLevel;
    openToTrials: boolean;
    openToTransfer: boolean;
    bio: string;
    plan: "BASIC" | "PREMIUM";
    stats: {
      season: string;
      club: string;
      goals: number;
      assists: number;
      appearances: number;
      minutesPlayed: number;
      cleanSheets: number;
    }[];
    achievements: { title: string; description: string; year: number }[];
    videos: {
      title: string;
      url: string;
      platform: "YOUTUBE" | "VIMEO";
      category: "HIGHLIGHTS" | "SKILLS" | "TRAINING";
    }[];
    teamHistory: {
      clubName: string;
      level: ExperienceLevel;
      startDate: string;
      endDate: string | null;
      description: string;
    }[];
  };

  const players: PlayerSeed[] = [
    {
      email: "santiago.medina@canterapro.demo",
      name: "Santiago Medina",
      dateOfBirth: "2005-03-14",
      heightCm: 178,
      weightKg: 72,
      nationality: "Argentina",
      location: "Buenos Aires, Argentina",
      positions: [Position.ATTACKING_MIDFIELDER, Position.WINGER],
      playStyle: "Extremo veloz, especialista en tiros libres y regates 1v1",
      experienceLevel: ExperienceLevel.SEMI_PRO,
      openToTrials: true,
      openToTransfer: true,
      bio: "Goleador nato, MVP liga juvenil 2023. Busco dar el salto al fútbol profesional.",
      plan: "PREMIUM",
      stats: [
        { season: "2024/2025", club: "Club Deportivo Riverside", goals: 18, assists: 9, appearances: 24, minutesPlayed: 2050, cleanSheets: 0 },
        { season: "2023/2024", club: "Academia Juvenil del Sur", goals: 12, assists: 6, appearances: 20, minutesPlayed: 1600, cleanSheets: 0 },
      ],
      achievements: [
        { title: "MVP Liga Juvenil", description: "Mejor jugador de la liga juvenil regional", year: 2023 },
        { title: "Campeón Torneo Apertura", description: "Campeón con Academia Juvenil del Sur", year: 2023 },
      ],
      videos: [
        { title: "Mejores goles 2024", url: "https://www.youtube.com/watch?v=demo-santiago-1", platform: "YOUTUBE", category: "HIGHLIGHTS" },
        { title: "Entrenamiento de definición", url: "https://vimeo.com/demo-santiago-2", platform: "VIMEO", category: "TRAINING" },
      ],
      teamHistory: [
        { clubName: "Academia Juvenil del Sur", level: ExperienceLevel.AMATEUR, startDate: "2019-02-01", endDate: "2022-12-01", description: "Formación juvenil" },
        { clubName: "Club Deportivo Riverside", level: ExperienceLevel.SEMI_PRO, startDate: "2023-01-01", endDate: null, description: "Primer equipo semiprofesional" },
      ],
    },
    {
      email: "valentina.rojas@canterapro.demo",
      name: "Valentina Rojas",
      dateOfBirth: "2004-07-22",
      heightCm: 165,
      weightKg: 58,
      nationality: "Colombia",
      location: "Medellín, Colombia",
      positions: [Position.DEFENSIVE_MIDFIELDER],
      playStyle: "Mediocampista de contención, gran visión de juego y recuperación",
      experienceLevel: ExperienceLevel.PROFESSIONAL,
      openToTrials: false,
      openToTransfer: true,
      bio: "Capitana del equipo, más de 80 partidos como profesional.",
      plan: "PREMIUM",
      stats: [
        { season: "2024/2025", club: "Deportivo Andino Femenino", goals: 4, assists: 15, appearances: 28, minutesPlayed: 2480, cleanSheets: 0 },
      ],
      achievements: [
        { title: "Campeona Liga Profesional Femenina", description: "Título nacional con Deportivo Andino", year: 2024 },
      ],
      videos: [
        { title: "Highlights temporada 2024", url: "https://www.youtube.com/watch?v=demo-valentina-1", platform: "YOUTUBE", category: "HIGHLIGHTS" },
      ],
      teamHistory: [
        { clubName: "Deportivo Andino Femenino", level: ExperienceLevel.PROFESSIONAL, startDate: "2021-01-01", endDate: null, description: "Mediocampista titular" },
      ],
    },
    {
      email: "mateo.pereira@canterapro.demo",
      name: "Mateo Pereira",
      dateOfBirth: "2007-11-05",
      heightCm: 185,
      weightKg: 78,
      nationality: "Uruguay",
      location: "Montevideo, Uruguay",
      positions: [Position.GOALKEEPER],
      playStyle: "Portero con buen juego de pies, líder de la defensa",
      experienceLevel: ExperienceLevel.AMATEUR,
      openToTrials: true,
      openToTransfer: false,
      bio: "Portero de la selección juvenil sub-18. Busco oportunidades de prueba.",
      plan: "BASIC",
      stats: [
        { season: "2024/2025", club: "Club Atlético Charrúa", goals: 0, assists: 1, appearances: 22, minutesPlayed: 1980, cleanSheets: 11 },
      ],
      achievements: [
        { title: "Portero menos goleado", description: "Liga juvenil sub-18", year: 2024 },
      ],
      videos: [
        { title: "Atajadas destacadas", url: "https://www.youtube.com/watch?v=demo-mateo-1", platform: "YOUTUBE", category: "SKILLS" },
      ],
      teamHistory: [
        { clubName: "Club Atlético Charrúa", level: ExperienceLevel.AMATEUR, startDate: "2022-03-01", endDate: null, description: "Portero titular sub-18" },
      ],
    },
    {
      email: "isabella.torres@canterapro.demo",
      name: "Isabella Torres",
      dateOfBirth: "2006-01-30",
      heightCm: 170,
      weightKg: 63,
      nationality: "México",
      location: "Guadalajara, México",
      positions: [Position.CENTER_BACK, Position.FULL_BACK],
      playStyle: "Defensora fuerte en el juego aéreo, salida limpia de balón",
      experienceLevel: ExperienceLevel.SEMI_PRO,
      openToTrials: true,
      openToTransfer: true,
      bio: "Defensora versátil, disponible para pruebas y transferencias inmediatas.",
      plan: "BASIC",
      stats: [
        { season: "2024/2025", club: "Tapatío FC Femenil", goals: 2, assists: 3, appearances: 19, minutesPlayed: 1710, cleanSheets: 8 },
      ],
      achievements: [],
      videos: [
        { title: "Resumen defensivo 2024", url: "https://www.youtube.com/watch?v=demo-isabella-1", platform: "YOUTUBE", category: "HIGHLIGHTS" },
      ],
      teamHistory: [
        { clubName: "Tapatío FC Femenil", level: ExperienceLevel.SEMI_PRO, startDate: "2022-08-01", endDate: null, description: "Defensora central titular" },
      ],
    },
  ];

  const createdPlayers = [];
  for (const p of players) {
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        name: p.name,
        email: p.email,
        passwordHash,
        role: "PLAYER",
        subscription: { create: { plan: p.plan, status: "ACTIVE" } },
        playerProfile: {
          create: {
            dateOfBirth: new Date(p.dateOfBirth),
            heightCm: p.heightCm,
            weightKg: p.weightKg,
            nationality: p.nationality,
            location: p.location,
            positions: p.positions,
            playStyle: p.playStyle,
            experienceLevel: p.experienceLevel,
            openToTrials: p.openToTrials,
            openToTransfer: p.openToTransfer,
            bio: p.bio,
            moderationStatus: "APPROVED",
            careerStats: { create: p.stats },
            achievements: { create: p.achievements },
            videos: { create: p.videos },
            teamHistory: {
              create: p.teamHistory.map((t) => ({
                clubName: t.clubName,
                level: t.level,
                startDate: new Date(t.startDate),
                endDate: t.endDate ? new Date(t.endDate) : null,
                description: t.description,
              })),
            },
          },
        },
      },
      include: { playerProfile: true },
    });
    createdPlayers.push(user);
  }

  const [santiago, valentina, mateo] = createdPlayers;

  // ── Agent tools: shortlist, notes, saved search ─────────────────────
  const shortlist = await prisma.shortlist.create({
    data: {
      agentId: agent.id,
      name: "Prospectos delanteros 2025",
      players: {
        create: [
          { playerProfileId: santiago.playerProfile!.id },
          { playerProfileId: mateo.playerProfile!.id },
        ],
      },
    },
  });

  await prisma.note.create({
    data: {
      authorId: agent.id,
      playerProfileId: santiago.playerProfile!.id,
      content:
        "Excelente definición y agilidad. Contactar a la familia antes de fin de mes.",
    },
  });

  await prisma.note.create({
    data: {
      authorId: scout.id,
      playerProfileId: valentina.playerProfile!.id,
      content: "Líder natural, seguir de cerca para el próximo torneo.",
    },
  });

  await prisma.savedSearch.create({
    data: {
      userId: agent.id,
      name: "Extremos sub-21 en Argentina",
      filters: {
        positions: ["WINGER", "ATTACKING_MIDFIELDER"],
        ageMax: 21,
        country: "Argentina",
        openToTransfer: true,
      },
    },
  });

  // ── Messaging ─────────────────────────────────────────────────────────
  const conversation = await prisma.conversation.create({
    data: {
      participants: {
        create: [{ userId: agent.id }, { userId: santiago.id }],
      },
    },
  });

  const firstMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: agent.id,
      content:
        "Hola Santiago, vi tus highlights y me gustaría hablar sobre una prueba con nuestro club. ¿Tienes disponibilidad esta semana?",
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: santiago.id,
      content: "¡Hola! Sí, tengo disponibilidad. Te comparto mi CV en PDF.",
      attachments: {
        create: [
          {
            url: "https://files.canterapro.demo/cv-santiago-medina.pdf",
            filename: "cv-santiago-medina.pdf",
            type: "PDF",
          },
        ],
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId: santiago.id,
      type: "NEW_MESSAGE",
      content: `Nuevo mensaje de ${agent.name}`,
      link: `/panel/mensajes/${conversation.id}`,
      read: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: agent.id,
      type: "NEW_MESSAGE",
      content: `Nuevo mensaje de ${santiago.name}`,
      link: `/panel/mensajes/${conversation.id}`,
      read: true,
    },
  });

  console.log("Seed completado:");
  console.log(`  Admin:  ${admin.email} / ${DEMO_PASSWORD}`);
  console.log(`  Agente: agente@canterapro.demo / ${DEMO_PASSWORD}`);
  console.log(`  Scout:  scout@canterapro.demo / ${DEMO_PASSWORD}`);
  console.log(
    `  Jugadores: ${players.map((p) => p.email).join(", ")} / ${DEMO_PASSWORD}`,
  );
  console.log(`  Shortlist creada: ${shortlist.name}`);
  console.log(`  Conversación creada con mensaje: "${firstMessage.content.slice(0, 30)}..."`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
