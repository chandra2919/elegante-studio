/**
 * JSON-LD Structured Data
 * Improves Google rich results: LocalBusiness, WebSite, BreadcrumbList
 */

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    "@id": "https://www.elegante-studio.com/#business",
    name: "Eleganté Interiors & Events",
    alternateName: "Eleganté Design Studio",
    description:
      "Michigan's premier luxury interior design studio. Bespoke residential design, event styling, furniture curation, and floral installations. Est. 2004.",
    url: "https://www.elegante-studio.com",
    logo: "https://www.elegante-studio.com/images/Logo2.webp",
    image: "https://www.elegante-studio.com/images/BW8A3410.webp",
    telephone: "+1-248-555-0198",
    email: "hello@elegante-studio.com",
    priceRange: "$$$",
    slogan: "Dare To Have Flair",
    foundingDate: "2004",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1046 S Telegraph Rd",
      addressLocality: "Pontiac",
      addressRegion: "MI",
      postalCode: "48341",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.6389,
      longitude: -83.2910,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/elegante_studio",
      "https://www.facebook.com/elegantestudio",
      "https://www.houzz.com/elegantestudio",
    ],
    hasMap: "https://maps.google.com/?q=1046+S+Telegraph+Rd+Pontiac+MI+48341",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 42.6389,
        longitude: -83.2910,
      },
      geoRadius: "80000",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.elegante-studio.com/#website",
    name: "Eleganté Design Studio",
    url: "https://www.elegante-studio.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.elegante-studio.com/portfolio?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}
