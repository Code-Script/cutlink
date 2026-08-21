"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch("/api/auth/me");
      if (response.ok) setUser((await response.json()).user);
    };
    loadUser();
    window.addEventListener("auth-changed", loadUser);
    return () => window.removeEventListener("auth-changed", loadUser);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.dispatchEvent(new Event("auth-changed"));
  };

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
        {user ? (
          <li className="flex items-center gap-3">
            <span className="hidden text-green-100 md:inline">{user.email}</span>
            <button onClick={logout} className="rounded-lg border border-green-300/40 px-3 py-1.5 transition hover:bg-green-700">Log out</button>
          </li>
        ) : (
          <li className="flex items-center gap-3">
            <Link className="transition-colors hover:text-green-200" href="/login">Log in</Link>
            <Link className="rounded-lg bg-green-500 px-3 py-1.5 shadow-lg shadow-green-950/20 transition hover:bg-green-400" href="/signup">Sign up</Link>
          </li>
        )}
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
