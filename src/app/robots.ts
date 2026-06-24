import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";

// Allow everyone (incl. AI crawlers) except the private CMS/login.
// Listing AI bots explicitly makes the intent clear so we can be cited by LLMs.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/cms", "/login"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${brand.siteUrl}/sitemap.xml`,
    host: brand.siteUrl,
  };
}
