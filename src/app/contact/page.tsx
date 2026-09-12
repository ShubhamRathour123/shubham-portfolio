"use client";

import { useState } from "react";

export default function ContactPage() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    }

    setLoading(false);
  }

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-32 text-slate-900 dark:bg-[#050816] dark:text-slate-100">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-10 gradient">
          Contact Me
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            required
            className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-cyan-600 px-8 py-4 font-semibold text-white shadow-sm transition hover:scale-105 hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="font-medium text-emerald-700 dark:text-emerald-300">
              Message sent successfully.
            </p>
          )}

        </form>
      </div>
    </section>
  );
}
