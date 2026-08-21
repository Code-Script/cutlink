"use client";

import { useState } from "react";
import Link from "next/link";

const ShortenForm = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ url, shorturl });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);
        seturl("");
        setshorturl("");
        window.dispatchEvent(new Event("short-link-generated"));
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/70 bg-white/65 p-6 shadow-xl shadow-green-950/10 backdrop-blur-xl sm:p-7 flex flex-col gap-4">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-green-700">CutLink</p>
        <h1 className="text-2xl font-bold tracking-tight text-green-950">Generate your short URL</h1>
      </div>
      <div className="flex flex-col gap-3">
        <input
          className="rounded-xl border border-green-100 bg-white/90 px-4 py-3 text-green-950 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/15"
          value={url}
          type="text"
          placeholder="Enter your URL"
          onChange={(e) => seturl(e.target.value)}
          id="url"
        />
        <input
          className="rounded-xl border border-green-100 bg-white/90 px-4 py-3 text-green-950 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/15"
          value={shorturl}
          type="text"
          placeholder="Enter your preferred short URL text"
          onChange={(e) => setshorturl(e.target.value)}
          id="shorturl"
        />
        <button
          onClick={generate}
          className="my-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-3 font-bold text-white shadow-lg shadow-green-700/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-700/30 active:translate-y-0"
        >
          Generate
        </button>
      </div>

      {generated && (
        <>
          <span className="font-bold text-lg text-green-950">Your Link</span>
          <code>
            <Link target="_blank" href={generated} className="break-all text-green-700 hover:underline">
              {generated}
            </Link>
          </code>
        </>
      )}
    </div>
  );
};

export default ShortenForm;
