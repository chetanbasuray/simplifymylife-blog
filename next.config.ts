/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // optional: used by Unsplash API
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/recommends/trade-republic",
        destination: "https://traderepublic.com",
        permanent: false,
      },
      {
        source: "/recommends/c24",
        destination: "https://s.c24.de/ShDYa9mLCF/",
        permanent: false,
      },
      {
        source: "/recommends/travel-planner",
        destination: "https://simplifymylife.app/templates/travel-planner",
        permanent: false,
      },
      {
        source: "/recommends/fintech-stack",
        destination: "https://simplifymylife.app/templates/fintech-stack",
        permanent: false,
      },
      {
        source: "/recommends/subscription-audit",
        destination: "https://simplifymylife.app/templates/subscription-audit",
        permanent: false,
      },
      {
        source: "/recommends/emma-app",
        destination: "https://emma-app.com/",
        permanent: false,
      },
      {
        source: "/recommends/papernest",
        destination: "https://www.papernest.com",
        permanent: false,
      },
      {
        source: "/recommends/moneyhub",
        destination: "https://www.moneyhub.com/",
        permanent: false,
      },
      {
        source: "/recommends/digital-hq",
        destination: "https://simplifymylife.app/templates/digital-hq",
        permanent: false,
      },
      {
        source: "/recommends/1password",
        destination: "https://1password.com/",
        permanent: false,
      },
      {
        source: "/recommends/plan-to-eat",
        destination: "https://www.plantoeat.com",
        permanent: false,
      },
      {
        source: "/recommends/income-plan",
        destination: "https://simplifymylife.app/templates/income-plan",
        permanent: false,
      },
      {
        source: "/recommends/digital-declutter",
        destination: "https://simplifymylife.app/templates/digital-declutter",
        permanent: false,
      },
      {
        source: "/recommends/clean-email",
        destination: "https://clean.email/",
        permanent: false,
      },
      {
        source: "/recommends/extension-audit",
        destination: "https://simplifymylife.app/templates/extension-audit",
        permanent: false,
      },
      {
        source: "/recommends/workona",
        destination: "https://workona.com/",
        permanent: false,
      },
      {
        source: "/recommends/notion-ai",
        destination: "https://www.notion.so/product/ai",
        permanent: false,
      },
      {
        source: "/recommends/notion-ai-policy",
        destination: "https://www.notion.so/templates/ai-policy-playbook",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
