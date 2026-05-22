"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      toast.error("Invalid admin password");
      return;
    }

    toast.success("Welcome back, Shubham");
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-8 shadow-[0_0_25px_rgba(34,211,238,0.15)] backdrop-blur-xl">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400 text-black">
            <Lock aria-hidden="true" />
          </div>

          <p className="mb-3 text-cyan-300">Protected Admin</p>
          <h1 className="mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Admin Login
          </h1>
          <p className="mb-8 text-gray-400">
            Sign in to manage projects, skills, analytics, and portfolio
            content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-gray-300">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Lock size={18} aria-hidden="true" />
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
