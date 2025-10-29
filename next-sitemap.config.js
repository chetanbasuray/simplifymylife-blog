/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://blog.simplifymylife.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  trailingSlash: false,
  exclude: ["/server-sitemap.xml"],
  transform: async (config, path) => {
    const cleanPath = path.replace(/^\/blog\//, "/");
    return {
      loc: cleanPath,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
