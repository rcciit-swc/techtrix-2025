import type { MetadataRoute } from 'next';

// To help search engine crawlers crawl your site more efficiently.

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'http://techtrix.rcciit.org.in',
      lastModified: new Date(),
    },
    {
      url: 'http://techtrix.rcciit.org.in/events',
      lastModified: new Date(),
    },
    {
      url: 'http://techtrix.rcciit.org.in/gallery',
      lastModified: new Date(),
    },
    {
      url: 'http://techtrix.rcciit.org.in/contacts',
      lastModified: new Date(),
    },
    {
      url: 'http://techtrix.rcciit.org.in/team',
      lastModified: new Date(),
    },
  ];
}
