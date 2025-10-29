import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
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
    <article className="prose prose-lg md:prose-xl mx-auto px-4 md:px-0 py-12 text-gray-800 prose-img:rounded-xl prose-img:shadow-sm">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          {data.title}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          {new Date(data.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          • {data.readingTime || "2 min read"}
        </p>

        {/* Tags */}
        {data.tags && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {data.image && (
        <div className="relative w-full h-80 mb-10">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-strong:text-gray-900 prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Affiliate Disclaimer */}
      {data.affiliate && (
        <p className="mt-10 text-sm italic text-gray-500 border-t border-gray-200 pt-4">
          Disclaimer: I may earn a small commission via the referral link above
          at no extra cost to you. Always read fine print and check which
          countries/features apply.
        </p>
      )}
    </article>
  );
}
