import "./globals.css";
import "./tailwind.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Simplify My Life",
  description:
    "Smart ideas, thoughtful habits, and practical tools for a calmer, simpler life.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--surface-muted)] text-slate-900 antialiased">
        <div className="relative flex min-h-screen flex-col">
          <div
            className="pointer-events-none absolute inset-x-0 top-[-8rem] z-0 mx-auto h-[28rem] max-w-4xl rounded-full bg-gradient-to-br from-blue-100 via-sky-100 to-teal-100 opacity-60 blur-3xl"
            aria-hidden
          />

          <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
              <Link
                href="/"
                className="relative flex items-center gap-2 rounded-full px-3 py-1 transition hover:opacity-90"
              >
                <Image
                  src="/logo-wordmark.svg"
                  alt="Simplify My Life"
                  width={220}
                  height={55}
                  className="h-7 w-auto"
                  priority
                />
              </Link>

              <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(
                  (link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </nav>
          </header>

          <main className="relative z-10 flex-1">{children}</main>

          <footer className="mt-16 border-t border-slate-200/70 bg-white/70">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center text-sm text-slate-500 lg:px-6">
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/privacy" className="rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-slate-900">
                  Privacy
                </Link>
                <Link href="/about" className="rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-slate-900">
                  About
                </Link>
                <Link href="/contact" className="rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-slate-900">
                  Contact
                </Link>
              </div>

              <p className="text-xs text-slate-400">
                © {new Date().getFullYear()} Simplify My Life — Made with ❤️ using{" "}
                <Link href="https://nextjs.org" className="font-medium text-slate-500 underline hover:text-slate-700">
                  Next.js
                </Link>{" "}
                &{" "}
                <Link href="https://vercel.com" className="font-medium text-slate-500 underline hover:text-slate-700">
                  Vercel
                </Link>
                .
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
