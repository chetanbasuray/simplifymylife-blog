import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <div className="relative pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-8rem] z-0 mx-auto h-[26rem] max-w-4xl rounded-full bg-gradient-to-br from-indigo-200/80 via-sky-200/80 to-emerald-200/80 blur-3xl"
        aria-hidden
      />

      <article className="relative z-10 mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-0">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
          <Link href="/" className="flex items-center gap-1 text-slate-500 transition hover:text-blue-600">
            <span aria-hidden>←</span> Back
          </Link>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Article</span>
        </div>

        <header className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-200/60">
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {data.category || "Field notes"}
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{data.title}</h1>
            </div>
            <p className="text-sm text-slate-500">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              • {data.readingTime || "2 min read"}
            </p>
            {data.tags && (
              <div className="flex flex-wrap justify-center gap-2">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {data.image && (
          <div className="relative mt-10 h-80 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/60">
            <Image src={data.image} alt={data.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-lg shadow-slate-200/60">
          <div
            className="prose prose-lg max-w-none text-slate-700 prose-headings:font-semibold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-strong:text-slate-900 prose-blockquote:border-l-blue-200"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {data.affiliate && (
            <p className="mt-10 rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/80 p-5 text-sm italic text-slate-500">
              Disclaimer: I may earn a small commission via the referral link above at no extra cost to you. Always read fine print
              and check which countries/features apply.
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
