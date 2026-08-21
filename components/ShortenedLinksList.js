"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const ShortenedLinksList = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const loadLinks = useCallback(async () => {
    try {
      const response = await fetch("/api/links");
      if (!response.ok) throw new Error("Unable to load links");
      const data = await response.json();
      setUser(data.user);
      setLinks(data.links);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(loadLinks, 0);
    window.addEventListener("short-link-generated", loadLinks);
    window.addEventListener("auth-changed", loadLinks);
    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener("short-link-generated", loadLinks);
      window.removeEventListener("auth-changed", loadLinks);
    };
  }, [loadLinks]);

  const deleteLink = async (shorturl) => {
    setDeleting(shorturl);
    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shorturl }),
      });
      if (!response.ok) throw new Error("Unable to delete link");
      setLinks((currentLinks) => currentLinks.filter((link) => link.shorturl !== shorturl));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section className="w-full max-w-xl rounded-2xl border border-white/70 bg-white/65 p-6 shadow-xl shadow-green-950/10 backdrop-blur-xl" aria-labelledby="shortened-links-heading">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-lg text-green-700">↗</span>
        <h2 id="shortened-links-heading" className="text-xl font-bold tracking-tight text-green-950">Your shortened links</h2>
      </div>

      {isLoading ? (
        <p className="mt-4 text-gray-600">Loading links...</p>
      ) : !user ? (
        <p className="mt-4 rounded-xl border border-dashed border-green-200 bg-green-50/80 p-4 text-sm leading-6 text-green-900">
          <Link href="/signup" className="font-bold text-green-700 hover:underline">Sign up</Link> or <Link href="/login" className="font-bold text-green-700 hover:underline">log in</Link> to save shortlinks.
        </p>
      ) : links.length === 0 ? (
        <p className="mt-4 text-gray-600">No shortened links yet.</p>
      ) : (
        <ul className="links-scrollbar mt-4 max-h-80 space-y-3 overflow-y-scroll overscroll-contain pr-2">
          {links.map((link) => {
            const shortenedUrl = `${process.env.NEXT_PUBLIC_HOST}/${link.shorturl}`;
            return (
              <li key={link.shorturl} className="rounded-xl border border-green-100 bg-green-50/80 p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-200 hover:bg-white hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 break-all text-sm text-gray-600"><span className="font-semibold text-green-900">Original:</span> {link.url}</p>
                  <button
                    type="button"
                    aria-label={`Delete ${link.shorturl}`}
                    title="Delete short link"
                    onClick={() => deleteLink(link.shorturl)}
                    disabled={deleting === link.shorturl}
                    className="shrink-0 rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-wait disabled:opacity-50"
                  >
                    <span aria-hidden="true" className="text-base">🗑</span>
                  </button>
                </div>
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
