import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function parseDate(value) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function formatDate(dateString) {
  const timestamp = parseDate(dateString);
  if (!timestamp) {
    return dateString;
  }

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function HomePage({ searchParams }) {
  const postsDir = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames
    .map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || "Unknown",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        readingTime: data.readingTime || "",
      };
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

  const tagParam = searchParams?.tag;
  const activeTag = Array.isArray(tagParam) ? tagParam[0] : tagParam;
  const normalizedTag = activeTag ? decodeURIComponent(activeTag) : "";

  const filteredPosts = normalizedTag
    ? posts.filter((post) => post.tags?.some((tag) => tag.toLowerCase() === normalizedTag.toLowerCase()))
    : posts;

  const featuredPost = filteredPosts[0] ?? posts[0] ?? null;
  const quickReads = posts.slice(0, 4);

  return (
    <div className="relative pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-6rem] z-0 mx-auto h-[28rem] max-w-5xl rounded-full bg-gradient-to-br from-indigo-200/80 via-sky-200/80 to-emerald-200/80 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-xl shadow-slate-200/60">
            <div className="absolute inset-x-8 top-10 h-32 rounded-3xl bg-gradient-to-r from-blue-100 via-indigo-100 to-sky-100 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
                  simplify my life
                </span>
                <h1 className="text-4xl font-semibold text-slate-900 sm:text-[2.8rem]">
                  Design a calmer, smarter rhythm for everyday life.
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Curated guidance on habits, digital tools, and thoughtful routines so you can focus on what matters most.
                </p>
              </div>

              {featuredPost && (
                <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/95 p-6 text-slate-100 shadow-lg shadow-slate-900/20 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                      Featured article
                    </p>
                    <p className="text-lg font-semibold leading-snug text-white">
                      {featuredPost.title}
                    </p>
                    <p className="text-xs text-slate-300">
                      {featuredPost.date !== "Unknown" ? formatDate(featuredPost.date) : "New"}
                    </p>
                  </div>
                  <Link
                    href={`/${featuredPost.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                  >
                    Read now
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-md shadow-slate-200/50">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Daily reset</h2>
              <p className="mt-2 text-base text-slate-600">
                A lightweight checklist to recentre your focus in under five minutes.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {["Brain dump tasks", "Review calendar commitments", "Set one highlight", "Tidy your digital desktop"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50/90 px-4 py-2.5">
                      <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-slate-300 bg-white text-[10px] font-semibold text-slate-500">
                        ✓
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-md shadow-slate-200/50">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Toolkit spotlight</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p className="rounded-2xl bg-blue-50/70 px-4 py-2.5 leading-relaxed text-blue-900">
                  “Schedule a recurring <strong>weekly review</strong> in your calendar and treat it like a meeting with yourself. Five
                  consistent sessions are more powerful than one perfect overhaul.”
                </p>
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Apps on rotation</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {["Notion for project hubs", "Things for capture", "Readwise for notes", "Cron for time blocking"].map((tool) => (
                      <li key={tool} className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-slate-50/80">
                        <span>{tool}</span>
                        <span className="text-xs font-medium text-slate-400">personal stack</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Latest writing</h2>
                <p className="text-sm text-slate-500">
                  {normalizedTag ? `Showing entries tagged with “${normalizedTag}”.` : "Fresh reflections to support a slower, smarter routine."}
                </p>
              </div>
              {normalizedTag && (
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:bg-slate-100"
                >
                  Clear filter
                </Link>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-3">
                        <Link href={`/${post.slug}`} className="block text-2xl font-semibold leading-snug text-slate-900 group-hover:text-blue-600">
                          {post.title}
                        </Link>
                        <p className="text-sm text-slate-500">
                          {post.date !== "Unknown" ? formatDate(post.date) : "New"}
                          {post.readingTime && post.readingTime.length > 0 && (
                            <span className="ml-2">• {post.readingTime}</span>
                          )}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Link
                                key={tag}
                                href={`/?tag=${encodeURIComponent(tag)}`}
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                  tag.toLowerCase() === normalizedTag.toLowerCase()
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:text-blue-700"
                                }`}
                              >
                                #{tag}
                              </Link>
                            ))}
                          </div>
                        )}
                        {post.excerpt && <p className="text-sm leading-relaxed text-slate-600">{post.excerpt}</p>}
                      </div>
                      <Link
                        href={`/${post.slug}`}
                        className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:text-blue-600"
                        aria-label={`Read ${post.title}`}
                      >
                        →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300/70 bg-white/70 p-10 text-center text-slate-500">
                No entries yet for “{normalizedTag}”. Explore other topics below.
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-md shadow-slate-200/60">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Browse by topic</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {allTags.length > 0 ? (
                  allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/?tag=${encodeURIComponent(tag)}`}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        tag.toLowerCase() === normalizedTag.toLowerCase()
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:text-blue-700"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-500/70" />
                      {tag}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Tags coming soon.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-md shadow-slate-200/60">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Quick reads</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {quickReads.map((post) => (
                  <li key={post.slug} className="flex items-start justify-between gap-3 rounded-2xl px-3 py-3 transition hover:bg-slate-50/90">
                    <div>
                      <Link href={`/${post.slug}`} className="font-medium text-slate-700 hover:text-blue-600">
                        {post.title}
                      </Link>
                      <p className="text-xs text-slate-400">{post.date !== "Unknown" ? formatDate(post.date) : "New"}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">read</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-blue-50/60 p-6 shadow-md shadow-slate-200/50">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Stay in the loop</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Receive one thoughtful summary each Sunday — no noise, just one practical insight to try during the week.
              </p>
              <form
                className="mt-5 flex flex-col gap-3"
                action="https://formspree.io/f/xldobqpa"
                method="POST"
                target="_blank"
                rel="noreferrer"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Join the Sunday note
                </button>
              </form>
              <p className="mt-3 text-xs text-slate-400">No spam — unsubscribe anytime.</p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
