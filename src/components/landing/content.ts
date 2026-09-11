export type QuickLink = {
  image: string;
  title: string;
  text: string;
  href: string;
  alt: string;
};

export type ArticlePreview = {
  image: string;
  tag: string;
  title: string;
  author: string;
  date: string;
  href: string;
  alt: string;
};

export type PublishingBenefit = {
  image: string;
  title: string;
  text: string;
  alt: string;
};

/** One titled block of copy inside an accordion panel. */
export type GuideBlock = {
  heading?: string;
  paragraphs: string[];
};

export type GuideSection = {
  title: string;
  blocks: GuideBlock[];
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
      href: "#",
      alt: "Submission guidelines and author instructions",
    },
    {
      image: "for-reviewers.webp",
      title: "For Reviewers",
      text: "Review process and guidelines",
      href: "#",
      alt: "Reviewer guidelines and peer review process",
    },
    {
      image: "current-issue.webp",
      title: "Current Issue",
      text: "Latest research and articles",
      href: "#",
      alt: "Browse current issue and published articles",
    },
    {
      image: "about-journal.webp",
      title: "About the Journal",
      text: "Aims, scope and editorial board",
      href: "#",
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
    items: [
      {
        image: "article-1.webp",
        tag: "Case Study",
        title: "Efficacy of Artificial Intelligence in Diabetic Retinopathy Screening",
        author: "Sarah Johnson, MD, Michael Lee, PhD, Priya Shah, MD",
        date: "May 26, 2024",
        href: "#",
        alt: "AI efficacy in diabetic retinopathy screening research",
      },
      {
        image: "article-2.webp",
        tag: "Literature Review",
        title: "Advancements in Machine Learning for Early Cancer Detection",
        author: "David Kim, PhD, Amina Yusuf, MD",
        date: "April 15, 2024",
        href: "#",
        alt: "Machine learning advances for early ocular cancer detection",
      },
      {
        image: "article-3.webp",
        tag: "Original Research",
        title: "Impact of Virtual Reality Therapy on PTSD Recovery Rates",
        author: "Liam O’Connor, MD, Sofia Martinez, PhD",
        date: "June 10, 2024",
        href: "#",
        alt: "VR therapy impact on vision-related trauma recovery",
      },
      {
        image: "article-4.webp",
        tag: "Case Study",
        title: "Telemedicine Adoption in Rural Healthcare Facilities during COVID-19",
        author: "Chen Wei, MD, Fatima Al-Mansouri, MPH",
        date: "April 15, 2024",
        href: "#",
        alt: "Telemedicine and teleophthalmology adoption in rural clinics",
      },
    ] as ArticlePreview[],
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
            paragraphs: [
              "The journal is committed to making published research widely accessible to the ophthalmology community and the public. All articles published by the journal are made available through an open-access model, allowing readers to access, read, and share published research without subscription barriers.",
              "Open access supports the dissemination of scientific knowledge and enables clinicians, researchers, educators, and healthcare professionals to benefit from current developments in ophthalmology.",
            ],
          },
          {
            heading: "Article Processing Charges",
            paragraphs: [
              "To support the editorial, peer-review, production, hosting, and long-term preservation of published articles, the journal may apply an Article Processing Charge (APC) to accepted manuscripts.",
              'Current Article Processing Charge: [Insert APC / "No APC"]',
              "Any applicable publication fee will be communicated clearly to authors before publication. Payment of an APC does not guarantee acceptance and has no influence on the editorial or peer-review process.",
              "Authors who are unable to cover the applicable publication fee may contact the editorial office to discuss available waiver or discount options.",
            ],
          },
          {
            heading: "Waivers and Discounts",
            paragraphs: [
              "To support the editorial, peer-review, production, hosting, and long-term preservation of published articles, the journal may apply an Article Processing Charge (APC) to accepted manuscripts.",
              'Current Article Processing Charge: [Insert APC / "No APC"]',
              "Any applicable publication fee will be communicated clearly to authors before publication. Payment of an APC does not guarantee acceptance and has no influence on the editorial or peer-review process.",
              "Authors who are unable to cover the applicable publication fee may contact the editorial office to discuss available waiver or discount options.",
            ],
          },
          {
            heading: "Copyright and Licensing",
            paragraphs: [
              "Authors retain the appropriate rights to their work in accordance with the journal's publishing agreement. Published articles are distributed under the journal's designated open-access license.",
              "License: [Insert Creative Commons license, e.g. CC BY 4.0]",
              "Authors are responsible for ensuring that any third-party material included in their manuscript is appropriately credited and permitted for use.",
            ],
          },
        ],
      },
      { title: "Preparing your manuscript for submission", blocks: [] },
      { title: "Submitting your manuscript", blocks: [] },
      { title: "Peer review policy", blocks: [] },
      { title: "Publication Ethics", blocks: [] },
      { title: "After Acceptance", blocks: [] },
    ] as GuideSection[],
  },
  footer: {
    address: "Jl. Sei Mencirim No.77, Babura, Medan Baru, Medan City, North Sumatera 20154, Indonesia",
    copyright: "JONSON: Journal of North Sumatera Ophthalmology Nexus",
    hospital: "Part of Rumah Sakit Khusus Mata Mencirim 77 Medan",
    columns: [
      {
        title: "For Authors",
        items: [
          "Author Guidelines",
          "Submission Process",
          "Article Types",
          "Terms & Conditions",
          "Article Processing Charges",
          "Writer Resources",
        ],
      },
      {
        title: "For Reviewers",
        items: ["Reviewer Guidelines", "Peer Review Process", "Become a Reviewer", "Reviewer Ethics & Resources"],
      },
      {
        title: "Journal Information",
        items: ["About the Journal", "Editorial Board", "Aims & Scope", "Journal Metrics", "Indexing & Abstracting"],
      },
      {
        title: "Support",
        items: ["Contact Us", "FAQ", "Privacy Policy", "Publication Ethics & Malpractice"],
      },
    ],
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
          { label: "About the Journal", href: "#" },
          { label: "Submissions", href: "#" },
          { label: "Editorial Masthead", href: "#" },
          { label: "Privacy Statement", href: "#" },
          { label: "Reviewer Acknowledgement", href: "#" },
        ],
      },
      { label: "For Authors", href: "#" },
      { label: "Editorial Board", href: "#" },
      { label: "Policies", href: "#" },
    ] as NavItem[],
    login: "Login",
    submit: "Submit Manuscript",
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
