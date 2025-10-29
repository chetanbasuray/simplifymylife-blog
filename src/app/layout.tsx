import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";

export const metadata = {
  title: "Simplify My Life Blog",
  description: "Smart ideas, tools, and guides for an easier everyday life.",
  metadataBase: new URL("https://blog.simplifymylife.app"),
  openGraph: {
    title: "Simplify My Life Blog",
    description: "Smart ideas, tools, and guides for an easier everyday life.",
    url: "https://blog.simplifymylife.app",
    siteName: "Simplify My Life",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Simplify My Life Blog",
      },
    ],
        locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplify My Life Blog",
    description: "Smart ideas, tools, and guides for an easier everyday life.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Use the SVG as the favicon */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>

      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* HEADER */}
        <header className="border-b border-gray-200 bg-white">
          <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
            <Link href="/blog" className="flex items-center space-x-2">
                <Image
                  src="/logo-wordmark.svg"
                  alt="Simplify My Life logo"
                  width={160}
                  height={40}
                  priority
                  className="h-10 w-auto"
                />
            </Link>
            <Link
              href="https://simplifymylife.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 border border-blue-200 rounded-md px-3 py-1 hover:bg-blue-50 transition-colors"
            >
              ← Back to Main Site
            </Link>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-3xl w-full mx-auto p-6">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 bg-white text-sm text-center py-4 text-gray-500">
          © {new Date().getFullYear()} Simplify My Life. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
