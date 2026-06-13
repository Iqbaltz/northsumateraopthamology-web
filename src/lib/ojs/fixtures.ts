/**
 * Sample data so the branded UI can be developed and previewed before the live
 * OJS journal (`jnso`) has published content / an API token. Shapes mirror the
 * real REST API responses. Swap to live data by setting OJS_API_TOKEN.
 */
import type { Context, Issue } from "./types";

export const fixtureContext: Context = {
  id: 1,
  name: { en: "North Sumatra Ophthalmology" },
  description: {
    en: "A peer-reviewed, open-access journal publishing original research, reviews, and case reports across the breadth of ophthalmology and vision science in North Sumatra and beyond.",
  },
  acronym: { en: "JNSO" },
  abbreviation: { en: "J. North Sumatra Ophthalmol." },
  onlineIssn: "0000-0000",
  printIssn: "1111-1111",
  publisherInstitution: "North Sumatra Ophthalmology Society",
  contactName: "Editorial Office",
  contactEmail: "editor@northsumatraophthalmology.com",
  urlPath: "jnso",
  currentIssueId: 2,
};

const galley = (id: number, label: string) => ({
  id,
  label,
  locale: "en",
  seq: 0,
  isApproved: true,
});

export const fixtureIssues: Issue[] = [
  {
    id: 2,
    title: { en: "Advances in Retinal Imaging" },
    description: {
      en: "This issue gathers recent work on optical coherence tomography, diabetic retinopathy screening, and surgical outcomes.",
    },
    identification: "Vol. 2 No. 1 (2026)",
    volume: 2,
    number: "1",
    year: 2026,
    published: true,
    datePublished: "2026-03-01",
    coverImageAltText: { en: "Retinal scan cover" },
    sections: [
      { id: 1, title: { en: "Original Research" }, seq: 1 },
      { id: 2, title: { en: "Case Reports" }, seq: 2 },
    ],
    articles: [
      {
        id: 101,
        currentPublicationId: 201,
        sectionId: 1,
        publications: [
          {
            id: 201,
            sectionId: 1,
            pages: "1–12",
            datePublished: "2026-03-01",
            fullTitle: {
              en: "OCT Biomarkers for Early Diabetic Macular Edema: A Prospective Cohort",
            },
            abstract: {
              en: "We evaluate optical coherence tomography biomarkers as predictors of progression in patients with non-proliferative diabetic retinopathy across a 24-month follow-up.",
            },
            authorsString: "Hasibuan R., Lubis M., Tanjung A.",
            doiObject: { doi: "10.0000/jnso.2026.201" },
            galleys: [galley(301, "PDF"), galley(302, "HTML")],
            authors: [
              { id: 1, fullName: "Rina Hasibuan", affiliation: "Universitas Sumatera Utara", orcid: "https://orcid.org/0000-0000-0000-0001" },
              { id: 2, fullName: "Maya Lubis", affiliation: "Universitas Sumatera Utara" },
              { id: 3, fullName: "Andi Tanjung", affiliation: "Medan Eye Center" },
            ],
          },
        ],
      },
      {
        id: 102,
        currentPublicationId: 202,
        sectionId: 1,
        publications: [
          {
            id: 202,
            sectionId: 1,
            pages: "13–25",
            datePublished: "2026-03-01",
            fullTitle: {
              en: "Smartphone-Based Fundus Photography for Community Glaucoma Screening",
            },
            abstract: {
              en: "A low-cost smartphone fundus adapter is compared against tabletop cameras for optic-disc assessment in a rural screening program.",
            },
            authorsString: "Siregar D., Nasution F.",
            doiObject: { doi: "10.0000/jnso.2026.202" },
            galleys: [galley(303, "PDF")],
            authors: [
              { id: 4, fullName: "Dewi Siregar", affiliation: "Medan Eye Center" },
              { id: 5, fullName: "Fauzan Nasution", affiliation: "Universitas Sumatera Utara" },
            ],
          },
        ],
      },
      {
        id: 103,
        currentPublicationId: 203,
        sectionId: 2,
        publications: [
          {
            id: 203,
            sectionId: 2,
            pages: "26–30",
            datePublished: "2026-03-01",
            fullTitle: {
              en: "Bilateral Acute Angle-Closure Following Topiramate: A Case Report",
            },
            abstract: {
              en: "We report a case of bilateral acute angle-closure glaucoma precipitated by topiramate, with resolution after drug cessation and medical management.",
            },
            authorsString: "Putri S.",
            doiObject: { doi: "10.0000/jnso.2026.203" },
            galleys: [galley(304, "PDF")],
            authors: [{ id: 6, fullName: "Sari Putri", affiliation: "Adam Malik General Hospital" }],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    title: { en: "Inaugural Issue" },
    description: {
      en: "The first issue of the journal, introducing its scope and founding editorial team.",
    },
    identification: "Vol. 1 No. 1 (2025)",
    volume: 1,
    number: "1",
    year: 2025,
    published: true,
    datePublished: "2025-09-01",
    sections: [{ id: 1, title: { en: "Original Research" }, seq: 1 }],
    articles: [
      {
        id: 50,
        currentPublicationId: 150,
        sectionId: 1,
        publications: [
          {
            id: 150,
            sectionId: 1,
            pages: "1–9",
            datePublished: "2025-09-01",
            fullTitle: {
              en: "Epidemiology of Pediatric Cataract in North Sumatra (2018–2024)",
            },
            abstract: {
              en: "A retrospective review of pediatric cataract presentations across three referral centers, examining etiology, age at surgery, and visual outcomes.",
            },
            authorsString: "Harahap B., Ginting K.",
            doiObject: { doi: "10.0000/jnso.2025.150" },
            galleys: [galley(250, "PDF")],
            authors: [
              { id: 7, fullName: "Budi Harahap", affiliation: "Universitas Sumatera Utara" },
              { id: 8, fullName: "Karina Ginting", affiliation: "Medan Eye Center" },
            ],
          },
        ],
      },
    ],
  },
];

export function fixtureIssue(id: number): Issue | undefined {
  return fixtureIssues.find((issue) => issue.id === id);
}
