import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="relative min-h-[93vh] overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-green-300/25 blur-3xl" />
      <section className="relative z-10 grid min-h-[93vh] grid-cols-1 lg:grid-cols-2">
        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16" aria-labelledby="about-cutlink-heading">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">About CutLink</p>
            <h1 id="about-cutlink-heading" className="mt-3 text-4xl font-black tracking-tight text-green-950 sm:text-5xl">
              Short links, made simple.
            </h1>
            <p className="mt-5 text-base leading-7 text-green-950/70 sm:text-lg">
              CutLink turns long URLs into clean, memorable links that are easier to share anywhere.
            </p>
            <p className="mt-3 text-base leading-7 text-green-950/70 sm:text-lg">
              Add your destination, choose a short name, and keep all of your created links together in one simple place.
            </p>
            <p className="mt-3 text-base leading-7 text-green-950/70 sm:text-lg">
              Whether you are sharing a portfolio, document, product, or post, CutLink gives every destination a cleaner path.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-green-800">
              <span className="rounded-full border border-green-200 bg-white/60 px-3 py-1.5">Custom short names</span>
              <span className="rounded-full border border-green-200 bg-white/60 px-3 py-1.5">Easy sharing</span>
            </div>
            <Link
              href="/shorten"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-3 font-bold text-white shadow-lg shadow-green-700/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-700/30"
            >
              Shorten a link
            </Link>
          </div>
        </section>
        <div className="relative hidden min-h-[400px] lg:flex lg:justify-start">
          <Image priority src="/vector.png" fill sizes="(min-width: 1024px) 50vw, 0px" alt="CutLink illustration" className="object-contain" />
        </div>

      </section>

    </main>
  );
}
