import ShortenForm from "@/components/ShortenForm";
import ShortenedLinksList from "@/components/ShortenedLinksList";

export default function ShortenPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 px-5 py-8 sm:px-8">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-green-300/25 blur-3xl" />
      <section className="relative z-10 mx-auto flex max-w-xl flex-col gap-6">
        <ShortenForm />
        <ShortenedLinksList />
      </section>
    </main>
  );
}
