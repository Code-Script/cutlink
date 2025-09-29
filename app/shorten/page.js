"use client";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shorturl,
    });

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
        console.log(result);
        // alert(result.message);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="mx-auto max-w-xl bg-green-100 my-13 p-7 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Generate your short URL</h1>
      <div className="flex flex-col gap-3 ">
        <input
          className="px-3 py-2 focus:outline-green-500 bg-white rounded-md"
          value={url}
          type="text"
          placeholder="Enter your URL"
          onChange={(e) => {
            seturl(e.target.value);
          }}
          id="url"
        />
        <input
          className="px-3 py-2 focus:outline-green-500 bg-white rounded-md"
          value={shorturl}
          type="text"
          placeholder="Enter your preferred short URL text"
          onChange={(e) => {
            setshorturl(e.target.value);
          }}
          id="shorturl"
        />
        <button
          onClick={generate}
          className="bg-green-500 shadow-lg rounded-lg p-3 py-1 font-bold text-white my-3"
        >
          Generate
        </button>
      </div>

      {generated && (
        <>
          <span className="font-bold text-lg">Your Link</span>{" "}
          <code>
            <Link target="_blank" href={generated}>
              {generated}
            </Link>
          </code>{" "}
        </>
      )}
    </div>
  );
};

export default Page;
