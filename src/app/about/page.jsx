import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-8rem] z-0 mx-auto h-[24rem] max-w-4xl rounded-full bg-gradient-to-br from-indigo-200/80 via-sky-200/80 to-emerald-200/80 blur-3xl"
        aria-hidden
      />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-0">
        <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-xl shadow-slate-200/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            About
          </span>

          <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Simplify My Life is a field guide for intentional living.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Hey there! 👋 I’m so glad you’re here. Simplify My Life is where I collect ideas, tools, and stories that make everyday life a little easier and a lot calmer.
          </p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
            <p>
              Whether it’s finding the right app to manage your finances, switching to a better electricity provider, or layering in habits that protect your focus — this space is dedicated to practical, human approaches that work in real life.
            </p>
            <p>
              The philosophy is simple: <strong>create systems that support you</strong>, so you can spend energy on the people and projects that matter most. No hustle culture, no productivity guilt — just intentional adjustments that add breathing room to your week.
            </p>
            <p>
              Expect experiments with mindful tech, templates for smarter planning, and honest notes on what it looks like to balance ambition with wellbeing. If something helps me, you’ll find it here.
            </p>
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Currently exploring</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {[
                  "Designing friction-free morning routines",
                  "Making financial admin almost automatic",
                  "Digital decluttering workflows that stick",
                  "Everyday rituals that feel like a pause",
                ].map((item) => (
                  <li key={item} className="flex gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
                    <span className="text-slate-400">•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">What you can expect</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                {[
                  "A curated library of tools worth trying",
                  "Actionable prompts to reset your week",
                  "Honest reflections on the wins and misses",
                  "Zero spam — just thoughtful notes",
                ].map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700">
                      ✦
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-base leading-relaxed text-slate-600">
            If any of this resonates, I’d love to hear from you. Share your favourite systems, ask a question, or simply say hello via the
            <Link href="/contact" className="ml-1 font-semibold text-blue-600 underline-offset-4 hover:underline">
              contact page
            </Link>
            . Let’s make life a little lighter, together.
          </p>
        </section>
      </main>
    </div>
  );
}
