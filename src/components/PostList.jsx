"use client";

import { useState } from "react";
import Link from "next/link";

export default function PostList({ allPosts }) {
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags || [])));
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const filtered = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesTag = activeTag
      ? post.tags?.includes(activeTag)
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900">
          Simplify My Life Blog
        </h1>
        <p className="text-gray-600 text-lg">
          Practical ideas and tools to make everyday life simpler ✨
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search posts or tags..."
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none transition placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {activeTag && (
          <button
            onClick={() => setActiveTag(null)}
            className="text-sm text-orange-600 hover:underline font-medium"
          >
            ✕ Clear filter ({activeTag})
          </button>
        )}
      </div>

      {/* Tag Filter Bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs px-3 py-1 rounded-full border transition-transform ${
                activeTag === tag
                  ? "bg-orange-500 text-white border-orange-500 scale-105"
                  : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:scale-105"
              } transition-all`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Post Grid */}
      <div className="grid sm:grid-cols-2 gap-8">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <article
              key={post.slug}
              className="relative group overflow-hidden bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-gray-500 mb-3">
                  {post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No date"}{" "}
                  • {post.readingTime}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/${post.slug}`}
                  className="inline-block text-orange-600 text-sm font-medium hover:underline hover:text-orange-700"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">
            No posts found.
          </p>
        )}
      </div>
    </main>
  );
}
