export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        About Simplify My Life
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Hey there! 👋 Welcome to <strong>Simplify My Life</strong> — a place
        where I collect ideas, tools, and stories that make everyday life a
        little easier and a lot smarter.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        Whether it’s finding the right app to manage your finances, switching to
        a better electricity provider, or just learning small habits that save
        time — my goal is simple: to make things less complicated, one post at a
        time.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        I believe life doesn’t have to be overwhelming. With the right mix of
        technology, mindset, and simple systems, we can all create space for the
        things that actually matter.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        If you enjoy the blog, feel free to explore the different posts, share
        your thoughts, or reach out if you’ve discovered something that makes
        your own life simpler. You can always connect via the{" "}
        <a
          href="/contact"
          className="text-blue-600 hover:underline font-medium"
        >
          contact page
        </a>
        .
      </p>

      <p className="text-gray-700 leading-relaxed">
        Thanks for being here and taking the time to read — I hope you find
        something helpful today. 💡
      </p>
    </main>
  );
}
