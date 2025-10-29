# Simplify My Life Blog

A modern, minimalist blog built with **Next.js 15**, **Tailwind CSS**, and **Markdown** — sharing tools, insights, and ideas to make everyday life simpler.

🌍 **Live Site:** [https://blog.simplifymylife.app](https://blog.simplifymylife.app)

---

## 🧭 Overview

Simplify My Life Blog is part of the larger **SimplifyMyLife.app** ecosystem — a collection of lightweight apps, blogs, and tools focused on simplifying finance, lifestyle, and everyday decisions.

The blog features:

- 📰 Markdown-based posts (easy to write, fast to load)  
- 🎨 Minimal design powered by Tailwind CSS  
- ⚙️ Server-side rendering via Next.js 15 App Router  
- 📊 Google Analytics 4 for insights  
- ☁️ Deployed on Vercel with automatic HTTPS and CI/CD  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | [Next.js 15](https://nextjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Markdown Parsing** | `remark` + `gray-matter` |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Analytics** | Google Analytics 4 |
| **Domain** | [Namecheap](https://www.namecheap.com/) |
| **SSL** | Auto-provisioned by Vercel (Let's Encrypt) |

---

## 🚀 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/chetanbasuray/simplifymylife-blog.git
cd simplifymylife-blog

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Open in browser
http://localhost:3000
```

---

## 🧠 Writing New Posts

Add a new `.md` file in `/content/posts/`:

```bash
---
title: "How I Simplified My Finances with Revolut"
date: "2025-10-30"
excerpt: "Managing money got easier with Revolut. Here’s how I use it day-to-day."
---

Your Markdown content here...
```

Each file automatically appears on the blog homepage.

---

## 🌐 Deployment

The blog is deployed on **Vercel**.  
Every push to the `main` branch triggers an automatic redeploy.

To deploy manually:

```bash
vercel --prod
```

---

## 🧾 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💬 Connect

📚 Read more articles on [blog.simplifymylife.app](https://blog.simplifymylife.app)  
🌎 Explore more tools, coming soon at [simplifymylife.app](https://simplifymylife.app)
