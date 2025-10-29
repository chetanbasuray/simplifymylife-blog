import { getPostData, getSortedPostsData } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);
  return {
    title: `${post.title} | Simplify My Life`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  console.log("Rendering post for slug:", resolvedParams.slug);

  const post = await getPostData(resolvedParams.slug);

  return (
    <main className="max-w-2xl mx-auto p-6 prose">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{post.date}</p>
      <article dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}
