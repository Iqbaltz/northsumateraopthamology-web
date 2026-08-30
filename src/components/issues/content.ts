import type { BreadcrumbItem } from "@/components/Breadcrumb";
import type { VolumeCatalogItem } from "@/components/VolumeCard";

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

export const issuesContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Archive", href: "/archive" },
    {
      label: "Vol. 12 No. 1 (Jun 2026): JONSON: Journal of North Sumatera Ophthalmology Nexus",
      href: "/issues",
    },
  ] as BreadcrumbItem[],
  currentIssue: {
    kicker: "NEW ISSUE",
    volumeTitle: "VOLUME 12\nNUMBER 1",
    publishMonth: "June 2026",
    description:
      "Explore the latest research on retinal diseases, glaucoma, corneal disorders and more.",
    viewIssueButton: "VIEW ISSUE",
    issnOnline: "Online ISSN : 2460-545X",
    issnPrint: "Print ISSN : 0126-1193",
    downloadLabel: "Download This Journal",
    coverAlt: "JONSON Journal Volume 12 Number 1 cover",
    publishedOn: "Published: 30-06-2026",
    heading: "VOLUME 12 – NUMBER 1",
    p1: "This issue brings together recent clinical and scientific contributions in ophthalmology, with a focus on advances in the diagnosis, management, and treatment of eye diseases.",
    p2: "Featuring original research, clinical studies, review articles, and case reports covering retinal diseases, glaucoma, corneal disorders, and other conditions affecting ocular health and vision.",
    facts: [
      {
        title: "12 Articles",
        text: "Original research, reviews, and clinical reports",
      },
      {
        title: "Open Access",
        text: "Freely available to readers worldwide",
      },
    ],
  },
  articles: {
    title: "ARTICLES FROM CURRENT ISSUE",
    items: [
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
    ] as IssueArticle[],
  },
  catalog: {
    title: "Volume\nCatalog",
    description:
      "Published biannually in February and August, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
    viewAll: "VIEW ALL VOLUMES",
    items: [
      {
        cover: "journal-cover.webp",
        alt: "JONSON Journal Volume 13 Number 1 cover",
        label: "VOLUME 13 • NUMBER 1",
        published: "Published January 2024",
        href: "#",
      },
      {
        cover: "journal-cover.webp",
        alt: "JONSON Journal Volume 12 Number 2 cover",
        label: "VOLUME 12 • NUMBER 2",
        published: "Published August 2024",
        href: "#",
      },
      {
        cover: "journal-cover.webp",
        alt: "JONSON Journal Volume 12 Number 1 cover",
        label: "VOLUME 12 • NUMBER 1",
        published: "Published February 2024",
        href: "#",
      },
    ] as VolumeCatalogItem[],
  },
};
