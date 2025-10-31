import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function getCountryCodeFromAcceptLanguage(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const firstLocale = value.split(",")[0];
  if (!firstLocale) {
    return null;
  }

  const match = firstLocale.match(/-([a-z]{2})$/i);
  return match ? match[1].toUpperCase() : null;
}

function readHeaderValue(headerList, name) {
  if (!headerList || !name) {
    return null;
  }

  if (typeof headerList.get === "function") {
    try {
      const directValue = headerList.get(name);
      if (directValue) {
        return directValue;
      }
    } catch {
      // fall through to handle other shapes
    }
  }

  if (typeof headerList.entries === "function") {
    try {
      for (const [key, value] of headerList.entries()) {
        if (key?.toLowerCase() === name.toLowerCase()) {
          if (Array.isArray(value)) {
            return value[0] ?? null;
          }
          return value ?? null;
        }
      }
    } catch {
      // fall through to object inspection
    }
  }

  if (typeof headerList === "object") {
    for (const [key, value] of Object.entries(headerList)) {
      if (key?.toLowerCase() === name.toLowerCase()) {
        if (Array.isArray(value)) {
          return value[0] ?? null;
        }
        return value ?? null;
      }
    }
  }

  return null;
}

async function resolveVisitorCountryName() {
  let headerList = null;

  try {
    headerList = await headers();
  } catch {
    // headers() can throw in non-request contexts; ignore and continue with null
  }

  const possibleCountryCodes = [
    readHeaderValue(headerList, "x-vercel-ip-country"),
    readHeaderValue(headerList, "cf-ipcountry"),
    readHeaderValue(headerList, "x-country-code"),
  ];

  const acceptLanguage = readHeaderValue(headerList, "accept-language");
  const acceptLanguageCode = getCountryCodeFromAcceptLanguage(acceptLanguage);

  if (acceptLanguageCode) {
    possibleCountryCodes.push(acceptLanguageCode);
  }

  if (typeof Intl.DisplayNames === "undefined") {
    return null;
  }

  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

  for (const code of possibleCountryCodes) {
    if (!code) {
      continue;
    }

    try {
      const countryName = displayNames.of(code.toUpperCase());
      if (countryName) {
        return countryName;
      }
    } catch {
      // Ignore invalid codes and move on to the next option
    }
  }

  return null;
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const htmlContent = marked(content);
  const visitorCountryName = await resolveVisitorCountryName();
  const generalTags = Array.isArray(data.tags) ? data.tags : [];
  const countryTags = Array.isArray(data.countryTags) ? data.countryTags : [];
  const displayTags = [...generalTags];

  if (
    visitorCountryName &&
    countryTags.includes(visitorCountryName) &&
    !displayTags.includes(visitorCountryName)
  ) {
    displayTags.push(visitorCountryName);
  }

  return (
    <div className="relative pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-12rem] z-0 mx-auto h-[28rem] w-full max-w-6xl rounded-full bg-gradient-to-br from-sky-200/70 via-indigo-200/70 to-emerald-200/70 blur-3xl"
        aria-hidden
      />

      <article className="relative z-10 mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-slate-500 shadow-sm transition hover:text-blue-600"
          >
            <span aria-hidden>←</span> Back to posts
          </Link>
          <span className="inline-flex items-center gap-2 text-slate-400">
            <span>{new Date(data.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}</span>
            <span aria-hidden>•</span>
            <span>{data.readingTime || "Quick read"}</span>
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-12">
            <header className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/60">
              {data.image && (
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow-lg">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-sky-200/90">
                      {data.category || "Field notes"}
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{data.title}</h1>
                  </div>
                </div>
              )}

              <div className="space-y-7 px-8 pb-10 pt-10 sm:px-12 sm:pb-12">
                {!data.image && (
                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      {data.category || "Field notes"}
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{data.title}</h1>
                  </div>
                )}

                {data.summary && Array.isArray(data.summary) && data.summary.length > 0 && (
                  <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-600">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Key things to know</p>
                    <ul className="grid gap-2">
                      {data.summary.map((point) => (
                        <li key={point} className="flex gap-3 text-slate-600">
                          <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {displayTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-lg shadow-slate-200/60 sm:p-12">
              <div
                className="article-content article-flow prose prose-lg max-w-none text-slate-700 prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:tracking-tight prose-h4:text-lg prose-p:leading-8 prose-li:leading-7 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-strong:text-slate-900 prose-blockquote:border-l-0 prose-blockquote:pl-0 prose-figure:my-10"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {data.affiliate && (
                <p className="mt-12 rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/80 p-5 text-sm italic text-slate-500">
                  Disclaimer: I may earn a small commission via the referral link above at no extra cost to you. Always read fine
                  print and confirm which countries or features apply.
                </p>
              )}
            </div>
          </div>

          {(data.summary || data.quickFacts) && (
            <aside className="space-y-7 lg:sticky lg:top-28">
              {data.summary && Array.isArray(data.summary) && data.summary.length > 0 && (
                <section className="rounded-3xl border border-blue-100/80 bg-blue-50/70 p-6 text-sm text-slate-600 shadow-inner shadow-blue-100">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Takeaways</h2>
                  <ul className="mt-4 grid gap-3">
                    {data.summary.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {data.quickFacts && Array.isArray(data.quickFacts) && data.quickFacts.length > 0 && (
                <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 text-sm text-slate-600 shadow-lg shadow-slate-200/50">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Wise at a glance</h2>
                  <dl className="mt-4 space-y-4">
                    {data.quickFacts.map((fact) => (
                      <div key={`${fact.label}-${fact.value}`} className="space-y-1">
                        <dt className="text-[0.7rem] uppercase tracking-[0.3em] text-slate-400">{fact.label}</dt>
                        <dd className="text-base text-slate-700">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <section className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-lg shadow-slate-200/40">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Share this guide</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Enjoying the review? Copy the link and send it to a friend who moves money internationally or is considering a
                  multi-currency account.
                </p>
              </section>
            </aside>
          )}
        </div>
      </article>
    </div>
  );
}
