"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const ShortenedLinksList = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLinks = useCallback(async () => {
    try {
      const response = await fetch("/api/links");
      if (!response.ok) throw new Error("Unable to load links");
      setLinks(await response.json());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLinks();
    window.addEventListener("short-link-generated", loadLinks);
    return () => window.removeEventListener("short-link-generated", loadLinks);
  }, [loadLinks]);

  return (
    <section className="w-full max-w-xl rounded-2xl border border-white/70 bg-white/65 p-6 shadow-xl shadow-green-950/10 backdrop-blur-xl" aria-labelledby="shortened-links-heading">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-lg text-green-700">↗</span>
        <h2 id="shortened-links-heading" className="text-xl font-bold tracking-tight text-green-950">Your shortened links</h2>
      </div>

      {isLoading ? (
        <p className="mt-4 text-gray-600">Loading links...</p>
      ) : links.length === 0 ? (
        <p className="mt-4 text-gray-600">No shortened links yet.</p>
      ) : (
        <ul className="links-scrollbar mt-4 max-h-80 space-y-3 overflow-y-scroll overscroll-contain pr-2">
          {links.map((link) => {
            const shortenedUrl = `${process.env.NEXT_PUBLIC_HOST}/${link.shorturl}`;
            return (
              <li key={link.shorturl} className="rounded-xl border border-green-100 bg-green-50/80 p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-200 hover:bg-white hover:shadow-md">
                <p className="break-all text-sm text-gray-600"><span className="font-semibold text-green-900">Original:</span> {link.url}</p>
                <Link target="_blank" href={shortenedUrl} className="mt-2 block break-all font-medium text-green-700 hover:underline">
                  Short: {shortenedUrl}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ShortenedLinksList;
