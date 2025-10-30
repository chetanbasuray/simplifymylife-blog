"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("https://formspree.io/f/xldobqpa", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(e.target),
    });

    if (res.ok) {
      setStatus("Message sent! ✅");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong. Please try again.");
    }

    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="relative pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-8rem] z-0 mx-auto h-[24rem] max-w-4xl rounded-full bg-gradient-to-br from-indigo-200/80 via-sky-200/80 to-emerald-200/80 blur-3xl"
        aria-hidden
      />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-0">
        <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Contact
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Let’s start a conversation</p>
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Have feedback, a story to share, or a collaboration idea?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            I’d love to hear from you. Drop a note below — your email stays private, and I reply to every message personally.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/60"
            >
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What’s on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Send message
              </button>

              {status && (
                <div
                  className={`animate-fadeIn rounded-xl border px-4 py-3 text-sm font-medium transition duration-200 ${
                    status.includes("✅")
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : status === "Sending..."
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {status}
                </div>
              )}
            </form>

            <aside className="rounded-3xl border border-slate-200/70 bg-slate-50/80 p-6 shadow-lg shadow-slate-200/60">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Need a prompt?</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {[
                  "Share a challenge you’re simplifying right now",
                  "Suggest a topic or tool for the next deep dive",
                  "Recommend someone doing meaningful work",
                ].map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-dashed border-slate-300/80 bg-white px-4 py-4">
                  Messages land directly in my inbox, and I typically respond within two business days.
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  Tip: include relevant links or timelines so we can move quickly once I reply.
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
