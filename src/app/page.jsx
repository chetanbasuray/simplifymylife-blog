import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default async function HomePage() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || "Unknown",
      tags: data.tags || [],
      excerpt: data.excerpt || "",
    };
  });

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative w-full flex items-center justify-center py-28 bg-gradient-to-br from-orange-100 via-yellow-50 to-white">
        <div className="text-center px-6 max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-800">
            Simplify <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">Your Life</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Calm ideas, thoughtful habits, and simple tools for a more intentional way of living.
          </p>
          <Link
            href="#latest"
            className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all"
          >
            Explore Articles
          </Link>
        </div>
      </section>

      {/* ===== Main Content Grid ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Tags */}
        <aside className="lg:col-span-3 space-y-3">
          <h2 className="font-semibold text-gray-800 mb-3">Top Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 cursor-pointer transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </aside>

        {/* Middle Column: Latest Posts */}
        <section id="latest" className="lg:col-span-6 space-y-6">
          <h2 className="font-semibold text-gray-800 mb-3">Latest Articles</h2>
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.slug}
              className="p-5 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-600 mb-3">{post.excerpt}</p>
              <Link
                href={`/${post.slug}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          ))}
        </section>

        {/* Right Sidebar: Search + Popular */}
        <aside className="lg:col-span-3 space-y-6">
          <div>
            <h2 className="font-semibold text-gray-800 mb-3">Search</h2>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-3">Popular Reads</h2>
            <ul className="space-y-2 text-sm">
              {posts.slice(0, 6).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}`}
                    className="text-gray-600 hover:text-orange-600 transition"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
