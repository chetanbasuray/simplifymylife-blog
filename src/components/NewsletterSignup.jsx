"use client";

import { useState } from "react";

const INITIAL_STATE = {
  status: "idle",
  message: "",
};

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState(INITIAL_STATE);

  const isSubmitting = state.status === "loading";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      setState({ status: "error", message: "Please enter a valid email address." });
      return;
    }

    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error || "We couldn’t add that email just yet. Please try again.");
      }

      setEmail("");
      setState({
        status: "success",
        message: payload?.message || "You’re in! The Sunday note will arrive in your inbox soon.",
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "We ran into an unexpected issue. Please try again later.",
      });
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    if (state.status !== "idle") {
      setState(INITIAL_STATE);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-blue-50/60 p-6 shadow-md shadow-slate-200/50">
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Stay in the loop</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        The Sunday Note is free to join and always thoughtful. If it ever graduates to a paid tier, you’ll be the first to know and can decide what works best for you.
      </p>
      <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Joining…" : "Join the Sunday note"}
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-400">
        We use Buttondown to deliver the newsletter. Your details stay on their secure, GDPR-compliant platform and never leave your browser without consent. Clearing your cookies won’t remove your subscription—unsubscribe anytime from any email.
      </p>
      {state.message && (
        <p className={`mt-3 text-sm ${state.status === "success" ? "text-emerald-600" : "text-rose-600"}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}
