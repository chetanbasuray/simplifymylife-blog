import fs from "fs";
import path from "path";
import matter from "gray-matter";

function parseDate(value) {
  if (!value) {
    return null;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function readPostEntries(postsDir) {
  try {
    return fs
      .readdirSync(postsDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        let lastmod = null;

        try {
          const { data } = matter(fileContent);
          lastmod = parseDate(data?.date);
        } catch {
          // fall back to filesystem metadata
        }

        if (!lastmod) {
          try {
            lastmod = fs.statSync(filePath).mtime.toISOString();
          } catch {
            lastmod = new Date().toISOString();
          }
        }

        return {
          loc: `/${file.replace(/\.md$/, "")}`,
          lastmod,
          changefreq: "daily",
          priority: 0.7,
        };
      });
  } catch {
    return [];
  }
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://blog.simplifymylife.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  trailingSlash: false,
  exclude: ["/server-sitemap.xml"],
  transform: async (config, rawPath) => {
    const isObject = rawPath && typeof rawPath === "object";
    const field = isObject ? { ...rawPath } : { loc: rawPath };

    if (typeof field.loc === "string") {
      field.loc = field.loc.replace(/^\/blog\//, "/");
    }

    if (!field.changefreq) {
      field.changefreq = "daily";
    }

    if (typeof field.priority !== "number") {
      field.priority = 0.7;
    }

    if (!field.lastmod) {
      field.lastmod = new Date().toISOString();
    }

    return field;
  },
  additionalPaths: async () => {
    const postsDir = path.join(process.cwd(), "content/posts");
    return readPostEntries(postsDir);
  },
};

export default config;
