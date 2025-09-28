import { BadgeCheck, Database, UsersRound } from 'lucide-react'

const statusItems = [
  {
    icon: BadgeCheck,
    label: 'Clerk siap untuk onboarding guru',
  },
  {
    icon: UsersRound,
    label: 'Struktur data master siap diimplementasikan',
  },
  {
    icon: Database,
    label: 'Supabase client tersambung dan menunggu migrasi',
  },
]

export default function Home() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <section className="max-w-3xl space-y-8 text-center">
        <p className="text-primary text-xs tracking-[0.4em] uppercase">
          Sprint 01 / Infrastructure
        </p>
        <h1 className="text-3xl font-semibold text-balance sm:text-4xl">
          Jurnal Agenda Mengajar Guru
        </h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
          Lingkungan Next.js berhasil dikonfigurasi dengan Turbopack, TypeScript, Tailwind CSS 4,
          dan standar kualitas dasar. Lanjutkan ke onboarding Clerk dan Supabase untuk membuka fitur
          jurnal harian.
        </p>
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Next.js 15 + React 19
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Clerk Auth
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Supabase
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Tailwind 4
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {statusItems.map((item) => (
            <article
              key={item.label}
              className="border-border bg-card text-card-foreground flex flex-col items-center gap-2 rounded-xl border p-4 shadow-sm"
            >
              <item.icon className="text-primary h-6 w-6" />
              <p className="text-muted-foreground text-sm">{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
