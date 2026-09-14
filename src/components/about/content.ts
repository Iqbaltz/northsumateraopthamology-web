import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { journal } from "@/components/issues/journal";
import { landingContent } from "@/components/landing/content";
import { submissionAnchors } from "@/components/submission/content";
import { aboutPath } from "./anchors";

export type ScopeArea = {
  title: string;
  text: string;
};

/** A row of the journal information table; `href` turns the value into a link. */
export type JournalFact = {
  label: string;
  value: string;
  href?: string;
};

const license = landingContent.footer.license;

export const aboutContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "About JONSON", href: aboutPath() },
  ] as BreadcrumbItem[],
  hero: {
    title: "About the Journal",
    journalName: journal.name,
    issnLabels: { print: "P-ISSN", online: "E-ISSN" },
    description: `is a scientific journal published by ${journal.publisher}. It accepts articles written in ${journal.languages} and aims to be a medium for conveying scientific discoveries and innovations in medicine and allied health fields to practitioners and academics. The journal is published twice a year, in February and August, and selects articles through peer review. It publishes case reports, systematic reviews, and clinical research related to visual science for ophthalmologists, eye nurses, and medical support professionals in other fields of ophthalmology.`,
    submit: { label: "SUBMIT MANUSCRIPT", href: "/submission" },
    coverAlt: "Cover of JONSON: Journal of North Sumatera Ophthalmology Nexus",
  },
  templateBanner: {
    text: landingContent.aboutJournal.submitBanner,
    download: landingContent.aboutJournal.downloadTemplate,
    href: "#",
  },
  aimsScope: {
    kicker: "ABOUT THE JOURNAL",
    title: landingContent.scope.title,
    description: landingContent.scope.p1,
    aimTitle: "Aim",
    aim: "The journal aims to promote the dissemination of high-quality scientific knowledge in ophthalmology and vision science and to support collaboration between researchers, clinicians, and healthcare professionals. Through rigorous peer review and open access to published research, the journal seeks to contribute to advances in clinical practice, scientific discovery, and the improvement of eye health worldwide.",
    scopeTitle: "Scope",
    scopeIntro:
      "The journal welcomes original and significant contributions across a broad range of ophthalmology and vision science disciplines, including:",
    areas: [
      {
        title: "Clinical Ophthalmology",
        text: "Research addressing the diagnosis, treatment, prevention, and management of ophthalmic diseases and disorders.",
      },
      {
        title: "Cataract & Refractive Surgery",
        text: "Research covering cataract surgery, refractive procedures, intraocular lenses, surgical techniques, and clinical outcomes.",
      },
      {
        title: "Retina & Vitreous",
        text: "Studies addressing retinal and vitreous diseases, vitreoretinal surgery, retinal imaging, and emerging therapeutic approaches.",
      },
      {
        title: "Glaucoma",
        text: "Clinical, translational, and experimental research related to glaucoma diagnosis, treatment, monitoring, and long-term management.",
      },
      {
        title: "Cornea & External Eye Disease",
        text: "Research focused on corneal disorders, ocular surface diseases, keratoplasty, dry eye, and related therapeutic approaches.",
      },
      {
        title: "Ocular Oncology",
        text: "Research concerning the diagnosis, treatment, and management of ocular and orbital tumors.",
      },
      {
        title: "Pediatric Ophthalmology",
        text: "Studies addressing childhood eye diseases, pediatric vision disorders, strabismus, amblyopia, and related clinical conditions.",
      },
      {
        title: "Neuro-Ophthalmology",
        text: "Research exploring the relationship between the visual system and neurological disorders, including optic nerve and visual pathway diseases.",
      },
      {
        title: "Vision Science",
        text: "Basic and clinical research investigating visual function, ocular physiology, and visual perception underlying vision and eye disease.",
      },
    ] as ScopeArea[],
  },
  information: {
    title: "Journal Information",
    coverAlt: "JONSON: Journal of North Sumatera Ophthalmology Nexus cover",
    facts: [
      { label: "Journal Title", value: journal.name },
      { label: "ISSN", value: journal.issn.print },
      { label: "eISSN", value: journal.issn.online },
      { label: "DOI Prefix", value: journal.doiPrefix },
      { label: "Publisher", value: journal.publisher },
      { label: "Language", value: journal.languages },
      { label: "Publication Frequency", value: journal.frequency },
      { label: "Peer Review", value: "Double-blind peer review" },
      { label: "Access", value: "Open Access" },
      { label: "License", value: `CC ${license.badge}`, href: license.href },
      {
        label: "Article Types",
        value: "Original Research, Review, Case Report, and more",
        href: `/submission#${submissionAnchors.articleTypes}`,
      },
    ] as JournalFact[],
  },
  policies: {
    peerReview: {
      title: "Peer Review Process",
      paragraphs: [
        "All manuscripts submitted to this journal must follow its focus and scope and its author guidelines. Submitted manuscripts must demonstrate scientific merit or novelty appropriate to the focus and scope, and must be free from plagiarism. Authors are encouraged to check similarity with plagiarism detection software before submitting; the editors screen every article using Turnitin.",
        "Research articles submitted to this journal undergo double-blind review by at least two expert reviewers. A review round takes about three weeks, and reviewers provide scientifically valuable comments to improve the manuscript. The editors make the final acceptance decision based on the reviewers' comments. The Editor in Chief sets the publication order of accepted articles, considering the date of acceptance, the geographical distribution of authors, and the theme of the issue.",
      ],
    },
    openAccess: {
      title: "Open Access Policy",
      paragraphs: [
        "This journal provides immediate open access to its content on the principle that making research freely available to the public supports a greater global exchange of knowledge. The full text of every published article is free to read, with no charge to readers or their institutions.",
      ],
    },
    archiving: {
      title: "Archiving",
      /** `link.text` appears once in the paragraph and becomes the link. */
      paragraph:
        "This journal utilizes the LOCKSS system to create a distributed archiving system among participating libraries and permits those libraries to create permanent archives of the journal for purposes of preservation and restoration.",
      link: { text: "LOCKSS", href: "https://www.lockss.org/" },
    },
    copyright: {
      title: "Copyright Notice",
      paragraph:
        "Articles published in JONSON are distributed under the Creative Commons Attribution-ShareAlike 4.0 International License. Anyone may copy, redistribute, and adapt the material in any medium or format, provided they give appropriate credit to the original work and distribute any adaptations under the same license.",
      link: { text: "Creative Commons Attribution-ShareAlike 4.0 International License", href: license.href },
    },
  },
};
