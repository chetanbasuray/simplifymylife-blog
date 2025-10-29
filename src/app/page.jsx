import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export const metadata = {
  title: "Blog | Simplify My Life",
  description: "Thoughts and tools to make your everyday life simpler.",
};

export default async function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Simplify My Life Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-600 text-sm">{post.date}</p>
            <p className="text-gray-800">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
