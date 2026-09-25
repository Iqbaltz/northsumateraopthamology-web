import { aboutAnchors, aboutPath } from "@/components/about/anchors";
import { announcementsPath } from "@/components/announcements/path";
import { contactPath } from "@/components/contact/path";
import { editorialPath } from "@/components/editorial/path";
import { ethicsPath } from "@/components/ethics/anchors";
import { articlePath } from "@/components/issues/journal";
import { policiesPath } from "@/components/policies/anchors";
import { privacyPath } from "@/components/privacy/path";
import { submissionAnchors } from "@/components/submission/content";
import { ojsLinks } from "@/lib/links";

export type QuickLink = {
  image: string;
  title: string;
  text: string;
  href: string;
  alt: string;
};

export type ArticlePreview = {
  tag: string;
  title: string;
  author: string;
  date: string;
  href: string;
};

export type PublishingBenefit = {
  image: string;
  title: string;
  text: string;
  alt: string;
};

/** A paragraph (plain string), a list, or term/description pairs — rendered in order. */
export type GuideNode =
  | string
  | { list: string[]; ordered?: boolean }
  | { terms: { term: string; description: string }[] };

/** One titled block of copy inside an accordion panel. */
export type GuideBlock = {
  heading?: string;
  body: GuideNode[];
};

export type GuideSection = {
  title: string;
  blocks: GuideBlock[];
};

export type FooterColumn = {
  title: string;
  items: { label: string; href: string }[];
};

/** A top-level nav entry. `children` turns it into a dropdown trigger. */
export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type IndexingPartner = {
  image: string;
  name: string;
  width: number;
  height: number;
  size: string;
};

export const indexingPartners: IndexingPartner[] = [
  { image: "garuda.webp", name: "Garuda Ristekdikti", width: 177, height: 48, size: "h-12 w-[177px]" },
  { image: "sinta.webp", name: "SINTA Kemendikbud", width: 136, height: 49, size: "h-[49px] w-[136px]" },
  { image: "google-scholar.webp", name: "Google Scholar", width: 138, height: 61, size: "h-[61px] w-[138px]" },
  { image: "dimensions.webp", name: "Dimensions", width: 213, height: 49, size: "h-[49px] w-[213px]" },
  { image: "worldcat.webp", name: "WorldCat", width: 156, height: 61, size: "h-[61px] w-[156px]" },
];

export const landingContent = {
  hero: {
    kicker: "JOURNAL OF",
    title: "North Sumatera Ophthalmology Nexus",
    subtitle:
      "JONSON is a peer-reviewed, open-access journal publishing high-impact research across all areas of ophthalmology and visual science.",
    submitButton: "Submit Your Journal",
    viewIssueButton: "View New Issue",
    heroEyeAlt: "High-precision ophthalmic examination of the human eye - JONSON",
  },
  quickLinks: [
    {
      image: "for-authors.webp",
      title: "For Authors",
      text: "Submission guidelines and policies",
      href: "/#submission-guide",
      alt: "Submission guidelines and author instructions",
    },
    {
      image: "for-reviewers.webp",
      title: "Editorial Board",
      text: "Editorial team and masthead",
      href: editorialPath,
      alt: "JONSON editorial board and masthead",
    },
    {
      image: "current-issue.webp",
      title: "Current Issue",
      text: "Latest research and articles",
      href: "/issues",
      alt: "Browse current issue and published articles",
    },
    {
      image: "about-journal.webp",
      title: "About the Journal",
      text: "Aims, scope and editorial board",
      href: aboutPath(),
      alt: "About JONSON aims, scope, and editorial board",
    },
  ] as QuickLink[],
  aboutJournal: {
    kicker: "ABOUT THE JOURNAL",
    title: "A Global Platform for Ophthalmic Research",
    p1: "We publish high-quality original research, reviews, case reports, and clinical studies that contribute to the understanding and treatment of eye diseases and visual disorders.",
    p2: "Published biannually in February and August, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
    learnMore: "Learn More about JONSON",
    values: [
      "Open Access – Free for readers worldwide",
      "Peer Reviewed – Rigorous and fair evaluation",
      "Global Reach – Connecting researchers globally",
      "Ethical Publishing – Transparency and integrity",
    ],
    issueKicker: "NEW ISSUE",
    volumeTitle: "VOLUME 12\nNUMBER 1",
    publishDate: "June 2026",
    issueDescription:
      "Explore the latest research on retinal diseases, glaucoma, corneal disorders and advanced ophthalmic surgical techniques.",
    viewIssueButton: "VIEW ISSUE",
    issnOnline: "Online ISSN : 2460-545X",
    issnPrint: "Print ISSN : 0126-1193",
    submitBanner: "Submit your journal with us",
    downloadTemplate: "Download Jonson Journal Template",
    coverAlt: "JONSON Journal Volume 12 Issue 1 Cover",
  },
  indexing: {
    title: "Indexing Partners:",
  },
  articlesSection: {
    title: "LATEST ARTICLES",
    viewAll: "VIEW ALL ARTICLES",
    // Each links to its page by title, so these must match an issue article's title.
    items: (
      [
        {
          tag: "Case Study",
          title: "Efficacy of Artificial Intelligence in Diabetic Retinopathy Screening",
          author: "Sarah Johnson, MD, Michael Lee, PhD, Priya Shah, MD",
          date: "May 26, 2024",
        },
        {
          tag: "Literature Review",
          title: "Advancements in Machine Learning for Early Cancer Detection",
          author: "David Kim, PhD, Amina Yusuf, MD",
          date: "April 15, 2024",
        },
        {
          tag: "Original Research",
          title: "Impact of Virtual Reality Therapy on PTSD Recovery Rates",
          author: "Liam O’Connor, MD, Sofia Martinez, PhD",
          date: "June 10, 2024",
        },
        {
          tag: "Case Study",
          title: "Telemedicine Adoption in Rural Healthcare Facilities during COVID-19",
          author: "Chen Wei, MD, Fatima Al-Mansouri, MPH",
          date: "April 15, 2024",
        },
      ] as Omit<ArticlePreview, "href">[]
    ).map((item) => ({ ...item, href: articlePath(item.title) })),
  },
  scope: {
    kicker: "AIMS & SCOPE",
    title: "Advancing Ophthalmic Science & Clinical Practice",
    p1: "JONSON Journal is committed to advancing knowledge in ophthalmology by publishing high-quality scientific research, clinical studies, reviews, and case reports. We provide a platform for clinicians, researchers, and healthcare professionals to share evidence-based knowledge and emerging developments that contribute to better eye care and patient outcomes.",
    p2: "Our scope covers a broad range of ophthalmic disciplines, including anterior segment, cataract and refractive surgery, glaucoma, retina and vitreous diseases, pediatric ophthalmology, neuro-ophthalmology, uveitis, ocular oncology, ophthalmic imaging, and emerging diagnostic and therapeutic technologies.",
    cta: "Explore our scope and discover the latest contributions to ophthalmic science.",
    scopeAlt: "Anatomical and clinical scope illustration of JONSON",
  },
  metrics: {
    title: "JOURNAL METRICS",
    items: [
      { value: "3.2", label: "Impact Factor 2025" },
      { value: "2.1", label: "CiteScore 2025" },
      { value: "1.8", label: "SJR 2025" },
      { value: "82%", label: "Acceptance Rate 2025" },
    ],
    decorationAlt: "JONSON journal performance metrics graphic decoration",
  },
  benefits: {
    title: "WHY PUBLISH IN JONSON",
    items: [
      {
        image: "benefit-eye.webp",
        title: "High Visibility",
        text: "Your research is visible to a global audience of clinicians, researchers, and vision science professionals.",
        alt: "High research visibility worldwide",
      },
      {
        image: "benefit-lightning.webp",
        title: "Fast & Transparent Process",
        text: "Our editorial process is efficient, transparent, and committed to maintaining the highest scientific standards.",
        alt: "Fast, transparent editorial and peer-review process",
      },
      {
        image: "benefit-access.webp",
        title: "Open Access",
        text: "All articles are freely available, ensuring your research achieves maximum reach and citations without paywalls.",
        alt: "Fully open access publishing model",
      },
      {
        image: "benefit-book.webp",
        title: "Indexing & Archiving",
        text: "Indexed in Garuda, SINTA, Google Scholar, Dimensions, WorldCat, with long-term preservation standards.",
        alt: "Comprehensive indexing and digital preservation",
      },
    ] as PublishingBenefit[],
  },
  submissionGuide: {
    kicker: "GENERAL SUBMISSION GUIDE",
    title: "Submission Preparation Guideline",
    cta: "SUBMISSION DETAILS FOR AUTHOR",
    /** Shown until the copy for a section arrives; delete once every panel is filled. */
    placeholder: "Guidance for this section is being finalised.",
    sections: [
      {
        title: "Publishing fees and open access",
        blocks: [
          {
            heading: "Open Access Policy",
            body: [
              "The journal is committed to making published research widely accessible to the ophthalmology community and the public. All articles published by the journal are made available through an open-access model, allowing readers to access, read, and share published research without subscription barriers.",
              "Open access supports the dissemination of scientific knowledge and enables clinicians, researchers, educators, and healthcare professionals to benefit from current developments in ophthalmology.",
            ],
          },
          {
            heading: "Article Processing Charges",
            body: [
              "To support the editorial, peer-review, production, hosting, and long-term preservation of published articles, the journal may apply an Article Processing Charge (APC) to accepted manuscripts.",
              'Current Article Processing Charge: [Insert APC / "No APC"]',
              "Any applicable publication fee will be communicated clearly to authors before publication. Payment of an APC does not guarantee acceptance and has no influence on the editorial or peer-review process.",
              "Authors who are unable to cover the applicable publication fee may contact the editorial office to discuss available waiver or discount options.",
            ],
          },
          {
            heading: "Waivers and Discounts",
            body: [
              "To support the editorial, peer-review, production, hosting, and long-term preservation of published articles, the journal may apply an Article Processing Charge (APC) to accepted manuscripts.",
              'Current Article Processing Charge: [Insert APC / "No APC"]',
              "Any applicable publication fee will be communicated clearly to authors before publication. Payment of an APC does not guarantee acceptance and has no influence on the editorial or peer-review process.",
              "Authors who are unable to cover the applicable publication fee may contact the editorial office to discuss available waiver or discount options.",
            ],
          },
          {
            heading: "Copyright and Licensing",
            body: [
              "Authors retain the appropriate rights to their work in accordance with the journal's publishing agreement. Published articles are distributed under the journal's designated open-access license.",
              "License: [Insert Creative Commons license, e.g. CC BY 4.0]",
              "Authors are responsible for ensuring that any third-party material included in their manuscript is appropriately credited and permitted for use.",
            ],
          },
        ],
      },
      {
        title: "Preparing your manuscript for submission",
        blocks: [
          {
            body: [
              "Authors should prepare manuscripts according to the journal's guidelines before beginning the submission process. Following the requirements below helps ensure an efficient editorial and peer-review process.",
            ],
          },
          {
            heading: "General Requirements",
            body: [
              "Manuscripts should:",
              {
                list: [
                  "Be written clearly and concisely in English.",
                  "Present original work that has not been published elsewhere.",
                  "Not be simultaneously submitted to another journal.",
                  "Follow the appropriate manuscript structure for the selected article type.",
                  "Include complete and accurate author information.",
                  "Meet all applicable ethical and reporting requirements.",
                  "Include appropriate references and citations.",
                  "Provide clear declarations regarding conflicts of interest, funding, ethics, and other relevant matters.",
                ],
              },
              "Authors should carefully proofread their manuscript before submission. Manuscripts that do not meet the journal's basic requirements may be returned to the authors for correction before entering editorial assessment.",
            ],
          },
          {
            heading: "Manuscript Structure",
            body: [
              "Research articles should generally include the following sections:",
              {
                ordered: true,
                list: [
                  "Title",
                  "Abstract",
                  "Keywords",
                  "Introduction",
                  "Methods",
                  "Results",
                  "Discussion",
                  "Conclusion",
                  "Acknowledgments, where applicable",
                  "Funding Statement",
                  "Conflict of Interest Statement",
                  "Ethics Statement, where applicable",
                  "Author Contributions, where applicable",
                  "References",
                ],
              },
              "The required structure may differ depending on the article type. Authors should consult the relevant article-type requirements before submission.",
            ],
          },
          {
            heading: "Keywords",
            body: [
              "Authors should provide 3–6 keywords that accurately represent the main topics, conditions, techniques, or concepts discussed in the manuscript. Where appropriate, authors are encouraged to use established medical terminology.",
            ],
          },
          {
            heading: "Figures and Tables",
            body: [
              "Figures and tables should add meaningful information to the manuscript and should not unnecessarily duplicate information presented in the main text.",
              "Each figure and table should:",
              {
                list: [
                  "Have a clear and descriptive title or caption.",
                  "Be numbered consecutively.",
                  "Be referenced in the main text.",
                  "Be submitted in an appropriate format and resolution.",
                  "Clearly identify relevant units, abbreviations, and statistical information.",
                ],
              },
              "Patient photographs and other potentially identifiable images must comply with applicable consent and privacy requirements.",
            ],
          },
          {
            heading: "References",
            body: [
              "References should be relevant, accurate, and complete. Authors should ensure that every reference cited in the manuscript appears in the reference list and that every reference in the reference list is cited in the manuscript.",
              "Authors should follow the journal's required reference style.",
              "Reference style: [Insert reference style]",
              "Authors are encouraged to verify references against the original sources and use persistent identifiers such as DOI where available.",
            ],
          },
          {
            heading: "Supplementary Materials",
            body: [
              "Supplementary materials may be submitted when they provide additional information that supports the manuscript but is not essential to understanding the main text.",
              "Examples may include:",
              {
                list: [
                  "Additional tables",
                  "Additional figures",
                  "Extended methodology",
                  "Supplementary datasets",
                  "Videos",
                  "Additional statistical analyses",
                ],
              },
              "Supplementary materials are subject to editorial review and should be clearly labeled and referenced within the manuscript.",
            ],
          },
        ],
      },
      {
        title: "Submitting Your Manuscript",
        blocks: [
          {
            body: [
              "All manuscripts should be submitted electronically through the journal's online submission system.",
            ],
          },
          {
            heading: "Before You Submit",
            body: [
              "Before submitting, authors should confirm that:",
              {
                list: [
                  "The manuscript follows the journal's formatting requirements.",
                  "The selected article type is appropriate.",
                  "All authors have reviewed and approved the manuscript.",
                  "Author names, affiliations, and contact information are complete and accurate.",
                  "The corresponding author has been identified.",
                  "Required figures and tables are included.",
                  "Ethical approval and informed consent statements are provided where applicable.",
                  "Funding information has been disclosed.",
                  "Conflicts of interest have been declared.",
                  "The manuscript is not under consideration elsewhere.",
                  "Permissions have been obtained for copyrighted or third-party material where necessary.",
                ],
              },
            ],
          },
          {
            heading: "Submission Files",
            body: [
              "Depending on the article type, authors may be asked to provide:",
              {
                terms: [
                  {
                    term: "Main Manuscript",
                    description:
                      "The complete manuscript, including the title, abstract, main text, references, tables, and figure legends as required.",
                  },
                  {
                    term: "Figures",
                    description:
                      "High-quality figure files prepared according to the journal's technical requirements.",
                  },
                  {
                    term: "Supplementary Files",
                    description: "Additional materials supporting the manuscript.",
                  },
                  {
                    term: "Cover Letter",
                    description:
                      "A brief letter introducing the manuscript and explaining its relevance to the journal.",
                  },
                  {
                    term: "Author Information",
                    description:
                      "Complete details for all contributing authors, including affiliations and contact information.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Cover Letter",
            body: [
              "The cover letter should briefly explain:",
              {
                list: [
                  "The title of the manuscript.",
                  "The article type.",
                  "The principal contribution or significance of the work.",
                  "Why the manuscript is relevant to the journal.",
                  "Confirmation that the manuscript is original and not under consideration elsewhere.",
                  "Any additional information that the editors should consider.",
                ],
              },
              "The cover letter should not duplicate the full manuscript abstract.",
            ],
          },
          {
            heading: "Submission Confirmation",
            body: [
              "After successfully completing the submission process, the corresponding author will receive a confirmation and manuscript identification number.",
              "Please retain this identification number for future correspondence with the editorial office.",
            ],
          },
        ],
      },
      {
        title: "Peer Review Policy",
        blocks: [
          {
            body: [
              "The journal follows a rigorous peer-review process designed to maintain the scientific quality, integrity, and relevance of published research.",
            ],
          },
          {
            heading: "Initial Editorial Assessment",
            body: [
              "Following submission, each manuscript undergoes an initial editorial assessment.",
              "The editorial team evaluates whether the manuscript:",
              {
                list: [
                  "Falls within the journal's aims and scope.",
                  "Meets basic submission requirements.",
                  "Demonstrates sufficient scientific and methodological quality.",
                  "Meets applicable ethical standards.",
                  "Contains appropriate declarations and supporting information.",
                ],
              },
              "Manuscripts that are outside the journal's scope or do not meet essential requirements may be rejected or returned to the authors before external peer review.",
            ],
          },
          {
            heading: "Peer Review",
            body: [
              "Manuscripts that pass the initial editorial assessment are typically evaluated by independent reviewers with relevant expertise.",
              "Reviewers assess aspects including:",
              {
                list: [
                  "Scientific originality",
                  "Research question and relevance",
                  "Methodological rigor",
                  "Data quality and interpretation",
                  "Statistical analysis, where applicable",
                  "Clarity of presentation",
                  "Validity of conclusions",
                  "Ethical considerations",
                  "Contribution to ophthalmic knowledge",
                ],
              },
              "The number of reviewers and specific review process may vary according to the article type and editorial requirements.",
            ],
          },
          {
            heading: "Reviewer Confidentiality",
            body: [
              "The identities of reviewers are kept confidential in accordance with the journal's peer-review policy.",
              "Reviewers are expected to maintain the confidentiality of submitted manuscripts and must not use unpublished information for personal or professional advantage.",
            ],
          },
          {
            heading: "Editorial Decisions",
            body: [
              "Following peer review, the editor may make one of several decisions:",
              { list: ["Accept", "Minor Revision", "Major Revision", "Reject"] },
              "A request for revision does not guarantee eventual acceptance. Revised manuscripts may be returned to the original reviewers or evaluated by the editor.",
            ],
          },
          {
            heading: "Appeals",
            body: [
              "Authors who believe that an editorial decision was based on a significant misunderstanding or procedural error may submit an appeal to the editorial office.",
              "Appeals should provide a clear and evidence-based explanation of the concern. Disagreement with an editor's scientific judgment alone is generally not sufficient grounds for an appeal.",
            ],
          },
        ],
      },
      {
        title: "Publication Ethics",
        blocks: [
          {
            body: [
              "The journal is committed to maintaining high standards of research and publication integrity.",
              "Authors, editors, and reviewers are expected to follow ethical principles throughout the publication process.",
            ],
          },
          {
            heading: "Originality and Duplicate Submission",
            body: [
              "Manuscripts must contain original work and must not have been published previously, except where appropriately disclosed and permitted.",
              "A manuscript must not be submitted simultaneously to more than one journal.",
              "Authors should appropriately cite previous publications and disclose any closely related manuscripts or reports.",
            ],
          },
          {
            heading: "Authorship",
            body: [
              "Authorship should be limited to individuals who have made substantial contributions to the work and who are willing to take responsibility for the content of the manuscript.",
              "All listed authors should:",
              {
                list: [
                  "Have made a meaningful contribution to the work.",
                  "Participate in drafting or critically revising the manuscript.",
                  "Approve the final version.",
                  "Agree to be accountable for the work.",
                ],
              },
              "Individuals who contributed to the work but do not meet authorship criteria should be acknowledged where appropriate.",
            ],
          },
          {
            heading: "Conflicts of Interest",
            body: [
              "Authors must disclose any financial, professional, personal, or other relationships that could reasonably be perceived as influencing the research or its interpretation.",
              "If no conflicts exist, authors should provide an appropriate declaration such as:",
              "“The authors declare that they have no conflicts of interest related to this work.”",
            ],
          },
          {
            heading: "Funding",
            body: [
              "All sources of financial support for the research or publication should be disclosed.",
              "Authors should provide the name of the funding organization and, where applicable, the relevant grant or project number.",
            ],
          },
          {
            heading: "Research Ethics",
            body: [
              "Research involving human participants must comply with applicable ethical principles and institutional or national requirements.",
              "Where applicable, manuscripts should include:",
              {
                list: [
                  "Name of the approving ethics committee or institutional review board.",
                  "Approval or reference number.",
                  "Statement regarding informed consent.",
                ],
              },
              "For research involving animals, authors should provide appropriate information regarding ethical approval and compliance with applicable animal welfare standards.",
            ],
          },
          {
            heading: "Patient Privacy and Consent",
            body: [
              "Authors must protect the privacy of patients and research participants.",
              "Identifying information should not be published unless it is essential for scientific purposes and appropriate informed consent has been obtained.",
              "Patient photographs, clinical images, and case descriptions should be prepared in a manner that protects individual privacy.",
            ],
          },
          {
            heading: "Research Misconduct",
            body: [
              "The journal takes allegations of research misconduct seriously. Potential concerns may include:",
              {
                list: [
                  "Fabrication or falsification of data",
                  "Plagiarism",
                  "Duplicate publication",
                  "Undisclosed conflicts of interest",
                  "Inappropriate authorship",
                  "Manipulation of images or data",
                  "Unethical research practices",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "After Acceptance",
        blocks: [
          {
            body: [
              "Once a manuscript has been accepted, it proceeds through the journal's production and publication process.",
            ],
          },
          {
            heading: "Copyediting and Production",
            body: [
              "The accepted manuscript may undergo editorial and production checks to ensure consistency, clarity, formatting, and adherence to the journal's publication standards.",
              "Authors may be contacted if clarification or additional information is required.",
            ],
          },
          {
            heading: "Proofreading",
            body: [
              "Before publication, authors may receive a proof version of the article for final review.",
              "Authors should carefully check:",
              {
                list: [
                  "Author names and affiliations",
                  "Article title",
                  "Figures and tables",
                  "References",
                  "Numerical data",
                  "Equations and symbols",
                  "Spelling and grammatical errors",
                  "Other factual or production errors",
                ],
              },
              "Proof corrections should generally be limited to errors introduced during production or essential factual corrections.",
            ],
          },
          {
            heading: "Publication",
            body: [
              "After final approval, the article will be published online as part of the journal's current publication workflow.",
              "Each published article will receive its permanent publication information, including a Digital Object Identifier (DOI) where applicable.",
            ],
          },
          {
            heading: "Article Updates and Corrections",
            body: [
              "The journal is committed to maintaining the accuracy and integrity of the published record.",
              "If an error is identified after publication, the editorial team will assess the issue and determine the appropriate action. This may include a correction, clarification, expression of concern, or retraction when necessary.",
            ],
          },
          {
            heading: "Promoting Your Published Research",
            body: [
              "Authors are encouraged to share their published work with colleagues, academic institutions, and professional communities.",
              "When sharing an article, authors should use the official published version and cite the article appropriately.",
            ],
          },
        ],
      },
    ] as GuideSection[],
  },
  footer: {
    address: "Jl. Sei Mencirim No.77, Babura, Kec. Medan Baru, Kota Medan, Sumatera Utara 20154",
    copyright: "JONSON: Journal of North Sumatera Ophthalmology Nexus",
    hospital: "Part of Rumah Sakit Khusus Mata Mencirim 77 Medan",
    /** `href: "#"` marks the few entries that have no destination anywhere yet. */
    columns: [
      {
        title: "For Author",
        items: [
          { label: "Author Guidelines", href: `/submission#${submissionAnchors.preparation}` },
          { label: "Submission Process", href: `/submission#${submissionAnchors.howToSubmit}` },
          { label: "Article Types", href: `/submission#${submissionAnchors.articleTypes}` },
          { label: "Terms & Conditions", href: "#" },
          { label: "Article Processing Charges", href: `/submission#${submissionAnchors.fees}` },
          { label: "Writer Resources", href: `/submission#${submissionAnchors.resources}` },
        ],
      },
      {
        title: "About Journal",
        items: [
          { label: "About Us", href: aboutPath() },
          { label: "Editorial Board", href: editorialPath },
          { label: "Aims & Scope", href: aboutPath(aboutAnchors.aimsScope) },
        ],
      },
      {
        title: "Support",
        items: [
          { label: "Contact Us", href: contactPath },
          { label: "Privacy Statement", href: privacyPath },
          { label: "Editorial Policies", href: policiesPath() },
        ],
      },
    ] as FooterColumn[],
    license: {
      journal: "JONSON: Journal of North Sumatera Ophthalmology Nexus",
      statement: "is an open-access journal.",
      prefix: "This work is licensed under a",
      name: "Creative Commons Attribution-ShareAlike 4.0 International License",
      badge: "BY-SA 4.0",
      href: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  header: {
    tagline: "Peer-reviewed. Open access. Advancing eye care worldwide",
    whatsapp: "Whatsapp: +62 823-2131-231",
    email: "halo@jonson.org",
    nav: [
      { label: "Home", href: "/" },
      {
        label: "Issues",
        href: "/issues",
        children: [
          { label: "Current Issue", href: "/issues" },
          { label: "Archives", href: "/archive" },
        ],
      },
      {
        label: "About",
        href: "#",
        children: [
          { label: "About the Journal", href: aboutPath() },
          { label: "Submissions", href: "/submission" },
          { label: "Publication Ethics", href: ethicsPath() },
          { label: "Privacy Statement", href: privacyPath },
          { label: "Contact Us", href: contactPath },
        ],
      },
      { label: "Announcement", href: announcementsPath },
      { label: "Editorial Board", href: editorialPath },
      { label: "Policies", href: policiesPath() },
    ] as NavItem[],
    login: "Login",
    submit: "Submit Manuscript",
    submitHref: "/submission",
    search: {
      open: "Open search",
      label: "Search:",
      query: "Title/Keyword",
      publishedAfter: "Published After",
      publishedBefore: "Published Before",
      author: "By Author",
      submit: "Search",
      close: "Close",
    },
  },
};
