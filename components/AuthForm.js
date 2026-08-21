"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignup = mode === "signup";

  async function submit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/shorten");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/70 bg-white/70 p-7 shadow-xl shadow-green-950/10 backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">CutLink account</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-green-950">{isSignup ? "Create your account" : "Welcome back"}</h1>
      <p className="mt-2 text-sm leading-6 text-green-950/65">Sign in to save and revisit your shortened links.</p>
      <div className="mt-6 space-y-4">
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full rounded-xl border border-green-100 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/15" />
        <div className="relative">
          <input required minLength={8} type={isPasswordVisible ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-xl border border-green-100 bg-white px-4 py-3 pr-20 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/15" />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2 text-sm font-semibold text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500/40"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
      <button disabled={isSubmitting} className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3 font-bold text-white shadow-lg shadow-green-700/25 disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
      </button>
      <p className="mt-5 text-center text-sm text-green-950/70">
        {isSignup ? "Already have an account?" : "New to CutLink?"} {" "}
        <Link className="font-bold text-green-700 hover:underline" href={isSignup ? "/login" : "/signup"}>{isSignup ? "Log in" : "Sign up"}</Link>
      </p>
    </form>
  );
}
