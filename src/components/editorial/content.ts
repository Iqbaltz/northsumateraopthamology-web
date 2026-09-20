import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { journal } from "@/components/issues/journal";
import { editorialPath } from "./path";

/** Research profiles a member card links to, in display order. */
export const profileKinds = ["scopus", "orcid", "sinta", "scholar"] as const;
export type ProfileKind = (typeof profileKinds)[number];

export type BoardMember = {
  role: string;
  name: string;
  affiliation: string;
  bio: string;
  email: string;
  /** Profile URLs; a badge without one renders as a plain, unlinked mark. */
  profiles: Partial<Record<ProfileKind, string>>;
};

const members: BoardMember[] = [
  {
    role: "Editor-in-Chief",
    name: "dr. Endi T. Pasaribu, M.si. Med. Sp.B. Subsp.Onk (K)",
    affiliation: "Universitas Sumatera Utara",
    bio: `dr. Endi T. Pasaribu, M.si. Med. Sp.B. Subsp.Onk (K) serves as the Editor-in-Chief of ${journal.name}, overseeing the journal's editorial direction, scholarly standards, and publication policies. The Editor-in-Chief is responsible for ensuring that editorial decisions are made independently, fairly, and in accordance with the journal's aims, scope, and publication ethics.`,
    email: "endi_pasaribu@usu.ac.id",
    profiles: {},
  },
  {
    role: "Managing Editor",
    name: "dr. M. Mubarak Hazazi, M.Ked. (Oph) Sp.M",
    affiliation: journal.publisher,
    bio: "Dr. M. Mubarak Hazazi, M.Ked. (Oph), Sp.M is an ophthalmologist and medical researcher based in Indonesia, specializing in clinical ophthalmology and vision sciences. He serves as the Managing Editor of the journal, overseeing editorial workflows, manuscript peer-review processes, and the strategic curation of high-quality ophthalmic research.",
    email: "77.hazazi@gmail.com",
    profiles: {},
  },
  {
    role: "Editor",
    name: "Dimas Aditya Syahputra, SKM., M.K.M",
    affiliation: journal.publisher,
    bio: "Dimas Aditya Syahputra, SKM., M.K.M is an ophthalmologist and medical researcher from Indonesia, focusing on clinical ophthalmology and vision sciences. He holds the position of Editorial Director for the journal, where he manages editorial processes, oversees the peer-review of manuscripts, and strategically curates top-tier ophthalmic research.",
    email: "dimazaditya02@gmail.com",
    profiles: {},
  },
  {
    role: "Reviewer",
    name: "dr. Annisa Dhiya Zafira, MARS., FISQUA",
    affiliation: journal.publisher,
    bio: `Dr. Annisa Dhiya Zafira, MARS., FISQUA is a medical doctor and healthcare management executive based in Indonesia, serving as the Hospital Director of ${journal.publisher}. She joins the journal as a Peer Reviewer, bringing extensive expertise in healthcare quality assurance, hospital administration, and clinical governance to ensure the rigorous evaluation and scientific integrity of submitted manuscripts.`,
    email: "Annisa.Dhiya@gmail.com",
    profiles: {},
  },
];

export const editorialContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Editorial Board", href: editorialPath },
  ] as BreadcrumbItem[],
  hero: {
    title: "Meet the Editorial Team",
    description: `Meet the editors and editorial board members responsible for maintaining the scholarly quality, integrity, and editorial standards of ${journal.name}.`,
    stats: [
      { label: "Editorial Leadership", value: `${members.length} Editors & Board Members` },
      { label: "Peer Review", value: journal.peerReview },
      { label: "Publication Frequency", value: journal.frequency },
    ],
  },
  teamHeading: "Editorial team",
  members,
  profileLabels: {
    scopus: "Scopus",
    orcid: "ORCID",
    sinta: "SINTA",
    scholar: "Google Scholar",
  } satisfies Record<ProfileKind, string>,
  independence: {
    title: "Editorial Independence",
    text: `Editorial decisions at ${journal.name} are based solely on the scholarly quality, originality, relevance, and integrity of submitted manuscripts. Editorial decisions are independent of commercial interests, advertising, sponsorship, or other financial considerations.`,
  },
  contact: {
    title: "Contact the Editorial Office",
    text: "For inquiries regarding editorial board matters, manuscript guidelines, or the progress of your submission, feel free to reach out to the JONSON Editorial Office.",
    cta: "CONTACT US",
  },
};
