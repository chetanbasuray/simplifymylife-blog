import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import DailyResetChecklist from "@/components/DailyResetChecklist";
import NewsletterSignup from "@/components/NewsletterSignup";

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
        guestSubmission: Boolean(data.guestSubmission),
      };
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

  const resolvedSearchParams = await searchParams;
  const tagParam = resolvedSearchParams?.tag;
  const activeTag = Array.isArray(tagParam) ? tagParam[0] : tagParam;
  const normalizedTag = activeTag ? decodeURIComponent(activeTag) : "";

  const filteredPosts = normalizedTag
    ? posts.filter((post) => post.tags?.some((tag) => tag.toLowerCase() === normalizedTag.toLowerCase()))
    : posts;

  const featuredPost = filteredPosts[0] ?? posts[0] ?? null;
  const quickReads = posts.slice(0, 4);
  const toolkitPosts = posts
    .filter((post) => post.tags?.some((tag) => tag.toLowerCase() === "toolkit"))
    .sort((a, b) => {
      if (a.guestSubmission === b.guestSubmission) {
        return parseDate(b.date) - parseDate(a.date);
      }

      return a.guestSubmission ? -1 : 1;
    });

  return (
    <div className="relative pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-6rem] z-0 mx-auto h-[28rem] max-w-5xl rounded-full bg-gradient-to-br from-indigo-200/80 via-sky-200/80 to-emerald-200/80 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 px-8 py-12 shadow-xl shadow-slate-200/60 sm:px-12">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-white to-indigo-100/70" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25)_0%,_rgba(59,130,246,0.05)_45%,_transparent_70%)]" />
              <div className="absolute inset-0 opacity-40 mix-blend-multiply">
                <div className="absolute inset-x-8 top-6 h-48 rounded-full bg-gradient-to-r from-sky-200/80 via-transparent to-indigo-200/70 blur-3xl" />
              </div>
            </div>
            <div className="relative flex h-full flex-col items-start gap-8 text-left">
              <div className="space-y-4 sm:space-y-5">
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 shadow-sm ring-1 ring-white/60">
                  simplify my life
                </span>
                <h1 className="max-w-2xl text-4xl font-semibold text-slate-900 sm:text-[3.2rem] sm:leading-[1.05]">
                  Design a calmer, smarter rhythm for everyday life.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed">
                  Curated guidance on habits, digital tools, and thoughtful routines so you can focus on what matters most.
                </p>
              </div>

              {featuredPost && (
                <div className="w-full max-w-xl rounded-2xl bg-slate-900/95 p-6 text-left text-slate-100 shadow-lg ring-1 ring-white/5">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
                      Featured article
                    </p>
                    <p className="text-xl font-semibold leading-snug text-white">
                      {featuredPost.title}
                    </p>
                    <p className="text-xs text-slate-300">
                      {featuredPost.date !== "Unknown" ? formatDate(featuredPost.date) : "New"}
                    </p>
                  </div>
                  <Link
                    href={`/${featuredPost.slug}`}
                    className="mt-5 inline-flex w-auto items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                  >
                    Read now
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5">
            <DailyResetChecklist />

            {toolkitPosts.length > 0 && (
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-blue-50/60 p-6 shadow-md shadow-slate-200/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.45)_0%,_transparent_65%)]" aria-hidden />
                <div className="relative">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Toolkit spotlight</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Articles focused on systems and tools to organise the everyday. Guest submissions from partner teams are highlighted.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {toolkitPosts.map((post) => (
                      <li key={post.slug} className="relative">
                        <div
                          className={`rounded-3xl ${
                            post.guestSubmission ? "bg-gradient-to-r from-amber-300 via-pink-300 to-rose-400 p-[2px] shadow-sm" : ""
                          }`}
                        >
                          <div
                            className={`relative flex items-start justify-between gap-4 rounded-2xl border p-4 transition hover:-translate-y-[1px] hover:bg-white hover:shadow-sm ${
                              post.guestSubmission
                                ? "border-transparent bg-white/95"
                                : "border-slate-200/70 bg-white/80"
                            }`}
                          >
                            <div className="space-y-2">
                              <Link
                                href={`/${post.slug}`}
                                className="block text-base font-semibold leading-snug text-slate-900 transition hover:text-blue-600"
                              >
                                {post.title}
                              </Link>
                              {post.excerpt && (
                                <p className="text-sm leading-relaxed text-slate-600">
                                  {post.excerpt}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
                                <span>{post.date !== "Unknown" ? formatDate(post.date) : "New"}</span>
                                {post.readingTime && post.readingTime.length > 0 && <span>{post.readingTime}</span>}
                                {post.guestSubmission && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-400" />
                                    Guest spotlight
                                  </span>
                                )}
                              </div>
                            </div>
                            <Link
                              href={`/${post.slug}`}
                              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-slate-200/70 text-slate-400 transition hover:border-blue-200 hover:text-blue-600"
                              aria-label={`Read ${post.title}`}
                            >
                              →
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-slate-400">
                    Entries live entirely on this site. To feature your toolkit, reach out for contributor guidelines.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="space-y-6 text-left">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:gap-6">
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

            <NewsletterSignup />
          </aside>
        </section>

      </div>
    </div>
  );
}
