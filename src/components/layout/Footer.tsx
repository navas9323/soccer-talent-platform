export function Footer() {
  return (
    <footer className="border-t border-night-700 bg-night-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-night-300 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} CanteraPro. Conectando talento con
          oportunidades en toda Latinoamérica.
        </p>
        <div className="flex gap-6">
          <span className="cursor-default text-night-400">Términos</span>
          <span className="cursor-default text-night-400">Privacidad</span>
          <span className="cursor-default text-night-400">Contacto</span>
        </div>
      </div>
    </footer>
  );
}
