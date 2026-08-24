export function StructuredData() {
  const schemas = [
    // 1. Periodical / Scholarly Journal Schema
    {
      "@context": "https://schema.org",
      "@type": "Periodical",
      name: "Journal of North Sumatera Ophthalmology Nexus",
      alternateName: ["JONSON", "North Sumatera Ophthalmology"],
      issn: ["2460-545X", "0126-1193"],
      url: "https://jonson.org",
      description:
        "A peer-reviewed, open-access journal in ophthalmology and vision science published by Rumah Sakit Khusus Mata Mencirim 77.",
      inLanguage: ["en"],
      publisher: {
        "@type": "MedicalOrganization",
        name: "Rumah Sakit Khusus Mata Mencirim 77 Medan",
        url: "https://jonson.org",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Sei Mencirim No.77, Babura, Kec. Medan Baru",
          addressLocality: "Kota Medan",
          addressRegion: "Sumatera Utara",
          postalCode: "20154",
          addressCountry: "ID",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62-823-2131-231",
          contactType: "editorial",
          email: "halo@jonson.org",
        },
      },
    },

    // 2. WebSite Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "JONSON · Journal of North Sumatera Ophthalmology Nexus",
      url: "https://jonson.org",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://jonson.org/issues?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },

    // 3. MedicalWebPage Schema
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "JONSON - Journal of North Sumatera Ophthalmology Nexus",
      url: "https://jonson.org",
      about: [
        {
          "@type": "MedicalSpecialty",
          name: "Ophthalmology",
        },
      ],
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Clinicians, Ophthalmologists, Researchers, Medical Students",
      },
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
