import { MetadataRoute } from "next";
import services from "@/utils/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cloud.heritage.africa";
  const languages = ["en", "fr"];

  // Pages principales pour chaque langue
  const mainPages = ["", "/about", "/contact", "/services"];

  // Génération des URLs pour les pages principales
  const mainUrls: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    mainPages.forEach((page) => {
      mainUrls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: { en: `${baseUrl}/en${page}`, fr: `${baseUrl}/fr${page}` }
        }
      });
    });
  });

  // Génération des URLs pour les services
  const serviceUrls: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    services.forEach((service) => {
      serviceUrls.push({
        url: `${baseUrl}/${lang}/services/${service.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services/${service.id}`,
            fr: `${baseUrl}/fr/services/${service.id}`
          }
        }
      });
    });
  });

  return [
    // Racine (redirect vers /en)
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...mainUrls,
    ...serviceUrls
  ];
}
