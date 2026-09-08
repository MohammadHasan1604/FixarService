import { MetadataRoute } from "next";
import { servicesList } from "@/data/servicesData";
import { getAllBlogPosts } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.fixar.in";

  const staticRoutes = [
    "",
    "/services",
    "/locations",
    "/locations/uae/sharjah",
    "/locations/uae/dubai",
    "/locations/uae/ajman",
    "/locations/oman/muscat",
    "/locations/saudi-arabia/riyadh",
    "/brands",
    "/about",
    "/reviews",
    "/book-service",
    "/track-booking",
    "/blog",
    "/faq",
    "/contact",
    "/careers",
    "/terms",
    "/privacy-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.7,
  }));

  const serviceRoutes = servicesList.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPosts = getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
