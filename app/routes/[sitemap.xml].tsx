export const loader = () => {
  // handle "GET" request
  // separating xml content from Response to keep clean code.
  const content = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.reiner-uk.tech/</loc>
            <lastmod>2023-11-08T00:10:32+01:00</lastmod>
            <changefreq>yearly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://www.reiner-uk.tech/login</loc>
            <lastmod>2023-11-08T00:10:32+01:00</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>https://www.reiner-uk.tech/signup</loc>
            <lastmod>2023-11-08T00:10:32+01:00</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.5</priority>
        </url>
    </urlset>
    `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
