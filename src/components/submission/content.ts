import { aboutAnchors, aboutPath } from "@/components/about/anchors";
import type { BreadcrumbItem } from "@/components/Breadcrumb";

/** One pre-submission check. `link` points at the page or section that explains it. */
export type SubmissionStep = {
  title: string;
  text: string;
  link?: { label: string; href: string };
};

export type AuthorResource = {
  title: string;
  text: string;
  href: string;
};

export type ArticleType = {
  title: string;
  text: string;
};

export type SubmissionFile = {
  title: string;
  text: string;
};

/** A preparation rule, either as prose or as an ordered flow of section names. */
export type PreparationItem =
  | { title: string; text: string }
  | { title: string; flow: string[] };

export type SubmitStage = {
  title: string;
  text: string;
};

export type AuthorFee = {
  label: string;
  amount: string;
  text: string;
};

/** In-page anchors, shared by the section ids and every link that jumps to them. */
export const submissionAnchors = {
  resources: "author-resources",
  articleTypes: "article-types",
  requiredFiles: "required-files",
  preparation: "manuscript-preparation",
  howToSubmit: "how-to-submit",
  fees: "author-fees",
  privacy: "privacy",
  copyright: "copyright",
} as const;

export const submissionContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Submission", href: "/submission" },
  ] as BreadcrumbItem[],
  hero: {
    title: "Submit Your Manuscript",
    description:
      "We welcome original research and scholarly contributions within the scope of JONSON – Journal of North Sumatera Ophthalmology Nexus. Authors are encouraged to carefully review the submission requirements, manuscript preparation guidelines, and required documents before submitting their work.",
    login: { label: "Login to Submit Manuscript", href: "/login" },
    separator: "or",
    register: { label: "Register New Account", href: "/register" },
  },
  beforeSubmit: {
    title: "Before You Submit",
    description:
      "Before submitting your manuscript, please ensure that your article meets the journal's scope, formatting requirements, ethical standards, and submission criteria. Manuscripts that do not comply with the requirements may be returned to the authors for revision before entering the peer-review process.",
    steps: [
      {
        title: "Check the Scope",
        text: "Ensure that your manuscript falls within the aims and scope of JONSON and is relevant to ophthalmology, vision science, or related clinical and scientific disciplines.",
        link: { label: "Read Aims & Scope", href: aboutPath(aboutAnchors.aimsScope) },
      },
      {
        title: "Prepare Your Manuscript",
        text: "Follow the official manuscript template, formatting requirements, article structure, reference style, and word limits specified in the Author Guidelines.",
        link: { label: "Author Guidelines", href: `#${submissionAnchors.preparation}` },
      },
      {
        title: "Prepare Required Documents",
        text: "Make sure all required files and supporting documents are ready before beginning the submission process.",
        link: { label: "Required Documents", href: `#${submissionAnchors.requiredFiles}` },
      },
      {
        title: "Check Ethics Requirements",
        text: "Research involving human participants, patient data, human tissue, animals, or identifiable clinical information must comply with applicable ethical requirements.",
        link: { label: "Publication Ethics", href: "#" },
      },
      {
        title: "Review Author Responsibilities",
        text: "All authors must approve the submitted manuscript and provide accurate information regarding authorship, affiliations, funding, competing interests, and other required declarations.",
      },
      {
        title: "Complete the Submission Checklist",
        text: "Use the submission checklist to confirm that your manuscript is complete and ready for editorial assessment.",
      },
    ] as SubmissionStep[],
  },
  resources: {
    title: "Author Resources",
    description:
      "Download the official documents and templates required to prepare your manuscript for submission.",
    downloadLabel: "Download",
    items: [
      {
        title: "Jonson Journal Template",
        text: "Official templates for preparing your manuscript.",
        href: "#",
      },
      {
        title: "Author Guidelines",
        text: "Complete instructions covering manuscript preparation.",
        href: "#",
      },
      {
        title: "Submission Checklist",
        text: "Checklist to help authors verify that all submission requirements have been completed.",
        href: "#",
      },
      {
        title: "Cover Letter Template",
        text: "Suggested structure for introducing your manuscript to the editorial team.",
        href: "#",
      },
      {
        title: "Author Declaration Form",
        text: "Statement on originality, authorship, conflicts of interest, and publication requirements.",
        href: "#",
      },
      {
        title: "Copyright/License",
        text: "Information and agreement concerning copyright and licensing of published work.",
        href: "#",
      },
      {
        title: "Reporting Guidelines",
        text: "Relevant reporting standards for different study designs.",
        href: "#",
      },
    ] as AuthorResource[],
  },
  articleTypes: {
    kicker: "WHAT CAN BE SUBMITTED?",
    title: "Article Types",
    description:
      "JONSON considers several types of scholarly contributions. Authors should select the appropriate article type during submission and follow the corresponding requirements.",
    items: [
      {
        title: "Original Research Article",
        text: "Reports novel findings from clinical, experimental, epidemiological, or observational research.",
      },
      {
        title: "Review Article",
        text: "Provides a comprehensive and critical synthesis of existing evidence on a specific ophthalmic topic.",
      },
      {
        title: "Systematic Review",
        text: "Presents a structured review of evidence using a clearly defined methodology and reporting framework.",
      },
      {
        title: "Case Report",
        text: "Describes an unusual, educational, or clinically significant ophthalmic case.",
      },
      {
        title: "Case Series",
        text: "Reports findings from a series of patients presenting similar clinical characteristics.",
      },
      {
        title: "Brief Report",
        text: "Presents concise findings from research of limited scope or preliminary significance.",
      },
      {
        title: "Editorial",
        text: "Provides expert commentary on a significant issue, article, or development in ophthalmology.",
      },
      {
        title: "Letter to the Editor",
        text: "Presents a concise scholarly comment, observation, or response concerning previously published content.",
      },
    ] as ArticleType[],
  },
  requiredFiles: {
    kicker: "DOCUMENTS",
    title: "Required Submission Files",
    description:
      "Authors may be required to provide several files during the submission process. Please prepare the appropriate documents before starting your submission.",
    items: [
      {
        title: "Main Manuscript",
        text: "The main manuscript should contain the complete article text but must not include information that directly identifies the authors or their institutions.",
      },
      {
        title: "Title Page",
        text: "The title page should contain the manuscript title, full names of all authors, institutional affiliations, corresponding author information, ORCID iDs where applicable, author contributions, funding information, competing interests, acknowledgements, and other required declarations.",
      },
      {
        title: "Cover Letter",
        text: "A brief letter introducing the manuscript to the editorial team. The cover letter should explain the significance and originality of the work and confirm that the manuscript is not under consideration by another journal.",
      },
      {
        title: "Figures and Tables",
        text: "Figures and tables should be clearly numbered and cited in the manuscript. Additional high-resolution or editable files may be requested where applicable.",
      },
      {
        title: "Supplementary Materials",
        text: "Additional datasets, appendices, protocols, questionnaires, images, videos, or other supporting materials may be submitted when relevant to the manuscript.",
      },
      {
        title: "Ethics Approval / Consent",
        text: "Documentation of ethics approval, informed consent, patient consent, or other relevant ethical documentation must be provided when required by the study design.",
      },
      {
        title: "Reporting Guideline Checklist",
        text: "Authors should provide the appropriate reporting guideline checklist according to the study design, such as CONSORT, STROBE, PRISMA, CARE, or other relevant guidelines.",
      },
      {
        title: "Author Declaration / Checklist",
        text: "Authors may be required to confirm compliance with the journal's authorship, originality, ethical, conflict-of-interest, and publication requirements.",
      },
    ] as SubmissionFile[],
  },
  preparation: {
    kicker: "AUTHOR GUIDELINES",
    title: "Manuscript Preparation",
    description:
      "Manuscripts should be prepared according to the journal's official Author Guidelines and manuscript template. Authors are responsible for ensuring that their submission meets all formatting and content requirements.",
    items: [
      {
        title: "General Requirements",
        text: "Manuscripts should be written in clear and consistent academic English or Indonesian. The manuscript should follow the journal's prescribed structure, formatting, word limit, and reference style.",
      },
      {
        title: "Title",
        text: "The title should be concise, informative, and accurately reflect the content of the manuscript.",
      },
      {
        title: "Abstract",
        text: "Provide a concise summary of the study, including the objective, methods, principal findings, and conclusions where applicable.",
      },
      {
        title: "Keywords",
        text: "Provide 3–6 keywords that accurately represent the main topics of the manuscript.",
      },
      {
        title: "Main Text",
        flow: ["Introduction", "Methods", "Results", "Discussion", "Conclusion"],
      },
      {
        title: "References",
        text: "References should be complete, accurate, and formatted according to the journal's required reference style. Authors are encouraged to provide DOI information where available.",
      },
      {
        title: "Figures and Tables",
        text: "All figures and tables must be numbered consecutively and referred to within the manuscript text.",
      },
    ] as PreparationItem[],
  },
  howToSubmit: {
    title: "How to Submit",
    note: "OJS commonly requires registration/login to submit and track manuscripts online.",
    stages: [
      {
        title: "Register / Log In",
        text: "Create an account or log in to your existing JONSON account through the OJS platform.",
      },
      {
        title: "Start New Submission",
        text: "Select the appropriate article type and complete the required submission information.",
      },
      {
        title: "Upload Your Files",
        text: "Upload your manuscript and all required supporting documents. Complete the submission checklist and required declarations.",
      },
      {
        title: "Submit & Track",
        text: "Check your submission details and confirm. After that, you can track the editorial and peer-review process via your OJS dashboard.",
      },
    ] as SubmitStage[],
  },
  fees: {
    title: "Author Fees",
    intro: "This journal charges the following author fees.",
    items: [
      {
        label: "Article Submission",
        amount: "0.00 (IDR)",
        text: "Authors are required to pay an Article Submission Fee as part of the submission process to contribute to review costs.",
      },
      {
        label: "Article Publication",
        amount: "0.00 (IDR)",
        text: "If this paper is accepted for publication, you will be asked to pay an Article Publication Fee to cover publications costs.",
      },
    ] as AuthorFee[],
    waiver:
      "If you do not have funds to pay such fees, you will have an opportunity to waive each fee. We do not want fees to prevent the publication of worthy work.",
  },
  privacy: {
    title: "Privacy & Data Protection",
    paragraphs: [
      "Information provided during manuscript submission, including author names, affiliations, email addresses, and other personal information, will be used for the purposes of manuscript processing, peer review, publication, and communication related to the journal.",
      "JONSON will not use or disclose author information for unrelated purposes except where required by applicable policies or law.",
    ],
    link: { label: "Read Privacy Statement", href: "#" },
  },
  copyright: {
    title: "Copyright & Licensing",
    paragraphs: [
      "Copyright for articles published in JONSON is retained by [author / journal / publisher], subject to the terms of the journal's publication agreement.",
      "Published articles are distributed under the Creative Commons Attribution-ShareAlike 4.0 International License, allowing readers to access and reuse the work according to the applicable licence terms.",
    ],
    link: { label: "View Copyright & Licensing Policy", href: "#" },
  },
  help: {
    title: "Need Help With Your Submission?",
    text: "If you have questions about manuscript preparation, submission requirements, or the status of an existing submission, please contact the JONSON Editorial Office.",
    cta: "CONTACT US",
  },
};
