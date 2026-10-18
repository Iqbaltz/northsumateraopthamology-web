import { missingIssn } from "@/components/issues/journal";
import { getJournalIssn } from "@/lib/ojs/view";

export async function StructuredData() {
  // Only ISSNs actually set in OJS; none while they are still "-".
  const { online, print } = await getJournalIssn();
  const issn = [online, print].filter((value) => value !== missingIssn.online);

  const schemas = [
    // 1. Periodical / Scholarly Journal Schema
    {
      "@context": "https://schema.org",
      "@type": "Periodical",
      name: "Journal of North Sumatera Ophthalmology Nexus",
      alternateName: ["JONSON", "North Sumatera Ophthalmology"],
      ...(issn.length > 0 && { issn }),
      url: "https://jonson.org",
      description:
        "A peer-reviewed, open-access journal in ophthalmology and vision science.",
      inLanguage: ["en"],
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
