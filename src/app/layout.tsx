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
      <body className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-800">
        {/* ===== Header ===== */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
          <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/logo-wordmark.svg"
                alt="Simplify My Life"
                width={220}
                height={55}
                className="h-8 w-auto"
              />
            </Link>

            {/* Navigation */}
            <div className="flex gap-6 text-sm font-medium text-gray-700">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group hover:text-orange-600 transition"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* ===== Main Content ===== */}
        <main className="flex-1">{children}</main>

        {/* ===== Footer ===== */}
        <footer className="bg-gradient-to-r from-orange-50 to-yellow-50 border-t border-orange-100 mt-10">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center text-center text-sm text-gray-700 space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
              <Link href="/privacy" className="hover:text-orange-600">Privacy</Link>
              <Link href="/about" className="hover:text-orange-600">About</Link>
              <Link href="/contact" className="hover:text-orange-600">Contact</Link>
            </div>

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Simplify My Life — Made with ❤️ using{" "}
              <Link href="https://nextjs.org" className="underline hover:text-orange-600">Next.js</Link> &{" "}
              <Link href="https://vercel.com" className="underline hover:text-orange-600">Vercel</Link>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
