import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/15 bg-green-800/90 px-4 text-white shadow-lg shadow-green-950/10 backdrop-blur-xl sm:px-7">
      <Link
        className="text-2xl font-black tracking-tight transition-opacity hover:opacity-85 sm:text-3xl"
        href="/"
      >
        CutLink
      </Link>
      <ul className="flex items-center justify-center gap-4 text-sm font-semibold sm:gap-6 sm:text-base">
        <Link className="transition-colors hover:text-green-200" href="/">
          <li>Home</li>
        </Link>
        <Link
          className="transition-colors hover:text-green-200"
          href="/shorten"
        >
          <li>Shorten</li>
        </Link>
        {/* <Link href="/contact"><li>Contact Us</li></Link> */}
        {/* <li className="flex gap-3">
          <Link
            href="/shorten"
            className="rounded-lg border border-green-300/30 bg-green-500 px-3 py-1.5 font-bold shadow-lg shadow-green-950/20 transition-all hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-green-950/30"
          >
            <button>Try now</button>
          </Link>
          <Link
            href="/github"
            className="rounded-lg border border-green-300/30 bg-green-500 px-3 py-1.5 font-bold shadow-lg shadow-green-950/20 transition-all hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-green-950/30"
          >
            <button>Github</button>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar
