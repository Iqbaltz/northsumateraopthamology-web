import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { journal } from "@/components/issues/journal";
import { policiesAnchors, policiesPath, type PoliciesAnchor } from "./anchors";

export type PolicySection = {
  id: PoliciesAnchor;
  title: string;
  paragraphs: string[];
};

export const policiesContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Editorial Policy", href: policiesPath() },
  ] as BreadcrumbItem[],
  hero: {
    title: "Editorial Policy Overview",
    description: `${journal.name} is committed to maintaining high standards of academic quality, integrity, and transparency in the publication of scholarly research. All manuscripts are evaluated according to their originality, scientific quality, relevance, and compliance with publication ethics.`,
  },
  sections: [
    {
      id: policiesAnchors.peerReview,
      title: "Peer Review Policy",
      paragraphs: [
        `All research articles submitted to ${journal.name} undergo ${journal.peerReview.toLowerCase()}. Manuscripts are evaluated by qualified reviewers with relevant expertise.`,
        "Reviewers assess the manuscript based on its originality, scientific validity, methodology, relevance, clarity, and contribution to the field.",
        "Editorial decisions may include acceptance, minor revision, major revision, or rejection.",
      ],
    },
    {
      id: policiesAnchors.editorialDecision,
      title: "Editorial Decision",
      paragraphs: [
        "Final publication decisions are made by the Editor-in-Chief or designated editors based on the reviewers' recommendations, editorial policies, and the overall quality and relevance of the manuscript.",
        "A manuscript may be rejected if it falls outside the journal's scope, does not meet scientific or ethical standards, or contains significant methodological or publication concerns.",
      ],
    },
    {
      id: policiesAnchors.publicationEthics,
      title: "Publication Ethics",
      paragraphs: [
        `${journal.name} follows recognized principles of publication ethics and is committed to maintaining integrity throughout the publication process. Authors, editors, reviewers, and the publisher are expected to follow ethical standards and act with honesty, fairness, and transparency.`,
      ],
    },
    {
      id: policiesAnchors.researchMisconduct,
      title: "Research Misconduct",
      paragraphs: [
        "The journal does not tolerate plagiarism, fabrication, falsification, duplicate publication, citation manipulation, or other forms of research and publication misconduct. Suspected cases will be investigated in accordance with applicable publication-ethics procedures.",
      ],
    },
    {
      id: policiesAnchors.conflictOfInterest,
      title: "Conflict of Interest",
      paragraphs: [
        "Authors, editors, and reviewers must disclose any financial, personal, professional, or other relationships that could influence the objectivity of the publication or review process.",
        "Any potential conflict of interest should be declared during manuscript submission and peer review.",
      ],
    },
    {
      id: policiesAnchors.authorship,
      title: "Authorship & Contributorship",
      paragraphs: [
        "Authorship should be limited to individuals who have made significant contributions to the conception, research, analysis, interpretation, or preparation of the manuscript.",
        "All listed authors must approve the final version of the manuscript and agree to its submission for publication. Contributions that do not meet authorship criteria should be appropriately acknowledged.",
      ],
    },
    {
      id: policiesAnchors.corrections,
      title: "Corrections, Retractions & Post-Publication Issues",
      paragraphs: [
        `${journal.name} maintains the integrity of the published academic record. Corrections, retractions, or other post-publication notices may be issued when significant errors, ethical concerns, or research misconduct are identified after publication.`,
      ],
    },
    {
      id: policiesAnchors.ethicalApproval,
      title: "Ethical Approval",
      paragraphs: [
        "Research involving human participants, patient data, or identifiable clinical information must comply with applicable ethical standards and obtain approval from an appropriate ethics committee or institutional review board where required. Authors should provide relevant ethical approval and informed consent information during submission.",
      ],
    },
    {
      id: policiesAnchors.editorialIndependence,
      title: "Editorial Independence",
      paragraphs: [
        "Editorial decisions are made independently based on the scientific quality, originality, relevance, and ethical standards of submitted manuscripts. Editorial decisions are not influenced by commercial interests, financial considerations, or external pressure.",
      ],
    },
  ] as PolicySection[],
};
