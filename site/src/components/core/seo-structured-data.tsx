import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "DevPortfolio",
  url: "https://devportfolio.studio",
  jobTitle: "Développeur full stack & creative developer",
  image: "https://devportfolio.studio/opengraph-image.png",
  sameAs: [
    "https://dribbble.com/devportfolio",
    "https://github.com/devportfolio",
    "https://www.linkedin.com/in/devportfolio",
  ],
  worksFor: {
    "@type": "Organization",
    name: "DevPortfolio Studio",
  },
  knowsAbout: [
    "Next.js",
    "Spline",
    "WebGL",
    "Framer Motion",
    "TypeScript",
    "Creative Coding",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "services créatifs",
    email: "hello@devportfolio.studio",
    areaServed: "FR",
    availableLanguage: ["fr", "en"],
  },
};

export const SeoStructuredData = () => (
  <Script
    id="structured-data"
    type="application/ld+json"
    strategy="afterInteractive"
  >
    {JSON.stringify(structuredData)}
  </Script>
);