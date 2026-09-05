/**
 * Journal-level data shared by the current issue (/issues) and every archived
 * issue (/archive/[slug]). Kept free of imports from either so both can use it
 * without a cycle.
 */

export type IssueArticle = {
  image: string;
  alt: string;
  tag: string;
  title: string;
  authors: string;
  date: string;
  format: "PDF" | "DOCX" | "HTML";
  href: string;
};

export const journal = {
  name: "JONSON: Journal of North Sumatera Ophthalmology Nexus",
  issnOnline: "Online ISSN : 2460-545X",
  issnPrint: "Print ISSN : 0126-1193",
  downloadLabel: "Download This Journal",
  cover: "journal-cover.webp",
  issueDescription:
    "Explore the latest research on retinal diseases, glaucoma, corneal disorders and more.",
  openAccessFact: {
    title: "Open Access",
    text: "Freely available to readers worldwide",
  },
  articlesFactText: "Original research, reviews, and clinical reports",
};

/** Placeholder table of contents; each issue shows the first `articleCount` of these. */
export const issueArticles: IssueArticle[] = [
  {
    image: "article-1.webp",
    alt: "AI efficacy in diabetic retinopathy screening research",
    tag: "Case Study",
    title: "Efficacy of Artificial Intelligence in Diabetic Retinopathy Screening",
    authors: "Sarah Johnson, MD, Michael Lee, PhD, Priya Shah, MD",
    date: "May 26, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-2.webp",
    alt: "Machine learning advances for early ocular cancer detection",
    tag: "Literature Review",
    title: "Advancements in Machine Learning for Early Cancer Detection",
    authors: "David Kim, PhD, Amina Yusuf, MD",
    date: "April 15, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-3.webp",
    alt: "VR therapy impact on vision-related trauma recovery",
    tag: "Original Research",
    title: "Impact of Virtual Reality Therapy on PTSD Recovery Rates",
    authors: "Liam O’Connor, MD, Sofia Martinez, PhD",
    date: "June 10, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-4.webp",
    alt: "Telemedicine and teleophthalmology adoption in rural clinics",
    tag: "Case Study",
    title: "Telemedicine Adoption in Rural Healthcare Facilities during COVID-19",
    authors: "Chen Wei, MD, Fatima Al-Mansouri, MPH",
    date: "April 15, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-2.webp",
    alt: "Early cancer diagnostics supported by artificial intelligence",
    tag: "Case Study",
    title: "Implementing AI for Early Cancer Diagnostics in Urban Clinics",
    authors: "Arief Nugroho, PhD, Sari Dewi, MD",
    date: "March 22, 2024",
    format: "DOCX",
    href: "#",
  },
  {
    image: "article-3.webp",
    alt: "Wearable devices supporting diabetes management in older patients",
    tag: "Case Study",
    title: "Effect of Wearable Devices on Diabetes Management in Elderly Patients",
    authors: "Lina Hartati, MPH, Budi Santoso, MD",
    date: "May 10, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-1.webp",
    alt: "Mobile application for adolescent mental health counselling",
    tag: "Case Study",
    title: "Evaluating Mobile Applications for Adolescent Mental Health Counselling",
    authors: "Indah Pratiwi, MSc, Ahmad Fauzi, PsyD",
    date: "June 5, 2024",
    format: "HTML",
    href: "#",
  },
  {
    image: "article-4.webp",
    alt: "Chatbot assistance in primary healthcare services",
    tag: "Case Study",
    title: "Optimising Chatbot Use in Primary Healthcare Services",
    authors: "Rizky Ananda, MPH, Maya Putri, MD",
    date: "April 30, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-3.webp",
    alt: "Telemonitoring and treatment adherence in cataract patients",
    tag: "Literature Review",
    title: "Influence of Telemonitoring on Treatment Adherence in Cataract Patients",
    authors: "Dewi Kurniawati, MD, Faisal Rahman, MPH",
    date: "May 18, 2024",
    format: "DOCX",
    href: "#",
  },
  {
    image: "article-2.webp",
    alt: "Blockchain applied to hospital patient data security",
    tag: "Literature Review",
    title: "Implementing Blockchain for Patient Data Security in Hospitals",
    authors: "Hendra Setiawan, PhD, Lestari Putri, MD",
    date: "April 12, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-1.webp",
    alt: "Virtual reality supported post-stroke rehabilitation",
    tag: "Original Research",
    title: "Use of Virtual Reality in Post-Stroke Rehabilitation",
    authors: "Nadia Safitri, MSc, Rudi Hartono, MD",
    date: "May 28, 2024",
    format: "PDF",
    href: "#",
  },
  {
    image: "article-4.webp",
    alt: "Big data analysis for infectious disease outbreak prediction",
    tag: "Case Study",
    title: "Analysing Big Data for Infectious Disease Outbreak Prediction",
    authors: "Yusuf Ramadhan, PhD, Sinta Melati, MPH",
    date: "June 1, 2024",
    format: "PDF",
    href: "#",
  },
];

/** The first `count` articles, clamped to what the placeholder list holds. */
export function articlesForIssue(count: number): IssueArticle[] {
  return issueArticles.slice(0, Math.min(count, issueArticles.length));
}
