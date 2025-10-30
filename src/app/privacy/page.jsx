import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Simplify My Life",
  description:
    "How Simplify My Life collects and uses information, including contact form submissions and anonymous Google Analytics insights.",
};

export default function PrivacyPage() {
  return (
    <div className="relative pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-8rem] z-0 mx-auto h-[24rem] max-w-4xl rounded-full bg-gradient-to-br from-indigo-200/80 via-sky-200/80 to-emerald-200/80 blur-3xl"
        aria-hidden
      />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-0">
        <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-xl shadow-slate-200/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Privacy Policy
          </span>

          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Your data is treated with care, transparency, and restraint.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Simplify My Life exists to share ideas, not to collect personal data. This page outlines what information is gathered, how it is used, and the choices you have.
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-600">
            <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-sm shadow-slate-200/40">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Website analytics</h2>
              <p className="mt-3">
                This site uses Google Analytics to understand which articles resonate and where to improve the experience. The implementation is configured to collect anonymised, aggregated metrics — things like page views, referrers, and device types. No personally identifiable information is stored.
              </p>
              <p className="mt-3">
                You can opt out of Google Analytics across the web using the <a className="font-semibold text-blue-600 underline-offset-4 hover:underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">Google Analytics Opt-out Browser Add-on</a> or by adjusting your browser privacy settings.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-sm shadow-slate-200/40">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Contact form</h2>
              <p className="mt-3">
                Messages submitted through the contact form are routed securely via Formspree and delivered straight to my inbox. The information you provide — your name, email address, and message — is used only to respond to your enquiry. It is not shared or sold.
              </p>
              <p className="mt-3">
                If you would like any previous correspondence deleted, simply reply to the email thread or submit a fresh request through the form noting your preference, and it will be removed.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-sm shadow-slate-200/40">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Newsletter and subscriptions</h2>
              <p className="mt-3">
                A newsletter may be introduced in the future. If that happens, you will need to explicitly opt-in. Each email will include a clear unsubscribe link, and subscription data will be handled by a trusted email provider with strong privacy protections.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-sm shadow-slate-200/40">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Data requests & questions</h2>
              <p className="mt-3">
                You have the right to access, correct, or erase the personal data you’ve shared. Submit a request through the <Link className="font-semibold text-blue-600 underline-offset-4 hover:underline" href="/contact">contact form</Link> with the subject “Privacy request,” and I’ll take care of it promptly.
              </p>
            </section>
          </div>

          <p className="mt-10 text-sm text-slate-400">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </section>
      </main>
    </div>
  );
}
