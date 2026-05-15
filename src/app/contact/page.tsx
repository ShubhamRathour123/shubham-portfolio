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
    <section className="min-h-screen px-6 py-32">

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
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            required
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-400">
              Message sent successfully.
            </p>
          )}

        </form>
      </div>
    </section>
  );
}