import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { journal } from "@/components/issues/journal";
import type { GuideNode } from "@/components/landing/content";
import { ethicsAnchors, ethicsPath, type EthicsAnchor } from "./anchors";

/** A titled run of copy inside a section; `id` makes it a hash-link target. */
export type EthicsBlock = {
  id?: EthicsAnchor;
  heading?: string;
  body: GuideNode[];
};

export type EthicsSection = {
  id: EthicsAnchor;
  title: string;
  /** Spells out an abbreviated title. */
  subtitle?: string;
  blocks: EthicsBlock[];
};

export const ethicsContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Publication Ethics", href: ethicsPath() },
  ] as BreadcrumbItem[],
  hero: {
    title: "Publication Ethics",
    description:
      "This journal follows the guidelines of the Committee on Publication Ethics (COPE) in addressing all aspects of publication ethics and, in particular, how to handle cases of research and publication misconduct. All articles in this journal involving human subjects must adhere to the ethical research principles described in the Declaration of Helsinki, and research involving animals must comply with the International Guiding Principles for Biomedical Research as developed by the Council for International Organizations of Medical Sciences (CIOMS). JONSON adopts COPE to meet high ethical standards for publishers, editors, authors, and reviewers. As an important issue, publication ethics need to be clearly articulated to enhance the quality of research worldwide. In this section, we explain the standards for editors, reviewers, and authors. Additionally, the publisher does not have the right to interfere with the integrity of the content and only supports timely publication.",
  },
  sections: [
    {
      id: ethicsAnchors.editors,
      title: "For Editors",
      blocks: [
        {
          body: [
            {
              ordered: true,
              list: [
                "Editors must be responsible for every article published.",
                "Editors should assist authors in following the instructions for authors that we have adapted from ICMJE.",
                "Editors may communicate with other editors or reviewers when making the final decision.",
                "Editors must evaluate manuscripts to be published objectively, assessing each article based on quality without regard to nationality, ethnicity, political beliefs, race, religion, gender, seniority, or the institutional affiliation of the authors. They must decline assignments when there is a potential conflict of interest.",
                "Editors must ensure that the documents sent to reviewers do not contain information about the authors, and vice versa.",
                "Editors' decisions must be communicated to authors, accompanied by reviewers' comments, unless the comments contain offensive or defamatory statements.",
                "Editors must respect authors' requests that someone should not review their work if such reasons are reasonable and practical.",
                "Editors and all staff must ensure the confidentiality of submitted manuscripts.",
                "Editors will be guided by the COPE flowchart if misconduct or authorship disputes are suspected.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: ethicsAnchors.reviewers,
      title: "For Reviewers",
      blocks: [
        {
          body: [
            {
              ordered: true,
              list: [
                "Reviewers need to provide comments regarding ethical issues and potential errors in the research and publication.",
                "Reviewers should complete their work in a timely manner and must inform the editor if they are unable to finish the task.",
                "Reviewers must maintain the confidentiality of the manuscript.",
                "Reviewers should decline the assignment if they find any potential conflict of interest between themselves and the authors.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: ethicsAnchors.authors,
      title: "For Authors",
      blocks: [
        {
          body: [
            {
              ordered: true,
              list: [
                "Authors must confirm that the submitted material has not been previously published and that they have not transferred the publication rights of the paper elsewhere.",
                "Authors must ensure the originality of their work and correctly cite other people's work according to the applicable reference format.",
                "Authors must not engage in plagiarism or self-plagiarism.",
                "'Salami' publication is strictly prohibited.",
                "Authors must ensure they follow the authorship criteria taken from ICMJE as described in the instructions for authors.",
                "Authors must not provide personal information that allows the identification of patients in various descriptions, photos, or genealogies. When patient photos are essential and necessary as scientific information, authors must have obtained written consent and clearly stated this.",
                "In the case of human experiments, authors must ensure that the research process complies with the ethical standards of the Declaration of Helsinki and that it is monitored by domestic and international committees overseeing human experiments. If there is any doubt whether the research is in line with the declaration, authors must be able to explain it. In the case of animal experiments, authors must ensure that they have followed domestic and international guidelines related to laboratory animal experiments.",
                "Authors must provide editors with data and details of their work if there is suspicion of errors or data fabrication.",
                "Authors must disclose anything that could cause a conflict of interest, such as employment, research funding, consultancy fees, and intellectual property, in the ICMJE disclosure document.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: ethicsAnchors.rwc,
      title: "R-W-C Policy",
      subtitle: "Retraction, withdrawal and correction",
      blocks: [
        {
          heading: "Policy Statement",
          body: [
            "We understand that authors work carefully in preparing their manuscripts, and that every manuscript goes through peer review. However, published articles may occasionally need to be withdrawn or even removed for scientific reasons. This should not be done lightly and can only occur under extraordinary circumstances. Corrections, clarifications, retractions, and apologies, when needed, are therefore carried out to strict standards to maintain confidence in the authority of the journal's electronic archive. It is our commitment and policy to maintain the integrity and completeness of the scientific record for researchers and librarians.",
          ],
        },
        {
          id: ethicsAnchors.retraction,
          heading: "Article Retraction",
          body: [
            `${journal.name} is committed to playing its part in maintaining the integrity of the scholarly record; therefore, on occasion, it is necessary to retract articles. Articles may be retracted if:`,
            {
              list: [
                "There is a major scientific error that would invalidate the conclusions of the article, for example where there is clear evidence that findings are unreliable, either as a result of misconduct (e.g. data fabrication) or honest error (e.g. miscalculation or experimental error).",
                "The findings have previously been published elsewhere without proper cross-referencing, permission, or justification (i.e. cases of redundant publication).",
                "There are ethical issues such as plagiarism (appropriation of another person's ideas, processes, results, or words without giving appropriate credit, including those obtained through confidential review of others' manuscripts) or inappropriate authorship.",
              ],
            },
            `To ensure that retractions are handled according to publication best practice, and in accordance with COPE retraction guidelines, **${journal.name}** adopts the following retraction process:`,
            {
              list: [
                "An article requiring potential retraction is brought to the attention of the journal editor.",
                "The journal editor follows the step-by-step guidelines in the COPE flowcharts, including evaluating a response from the author of the article in question.",
                "Before any action is taken, the editor's findings are sent to the Ethics Advisory Board. The purpose of this step is to ensure a consistent approach in accordance with industry best practice.",
                "The final decision on whether to retract is then communicated to the author and, if necessary, to any other relevant bodies, such as the author's institution.",
                "The retraction statement is then posted online and published in the next available issue of the journal.",
              ],
            },
            "Note that if authors retain the copyright for an article, this does not mean they automatically have the right to retract it after publication. The integrity of the published scientific record is of paramount importance, and COPE's Retraction Guidelines still apply in such cases.",
          ],
        },
        {
          id: ethicsAnchors.withdrawal,
          heading: "Article Withdrawal",
          body: [
            "Authors are not allowed to withdraw submitted manuscripts, because withdrawal wastes the valuable resources that editors and referees spend processing submitted manuscripts, as well as the work invested by the publisher. Before submitting a manuscript through our OJS, authors are obliged to approve the checklist we provide.",
            {
              list: [
                "If an author requests the withdrawal of a manuscript while it is still in peer review, the author will be charged a penalty of USD 50 per manuscript.",
                "If a manuscript is withdrawn after it has been accepted for publication, the author will be charged a penalty of USD 100 per manuscript.",
                `An article published as “Article in Press” (accepted for publication but not yet formally published, so without complete volume, issue, or page information) may be withdrawn from the ${journal.name} website if it includes errors, is discovered to be an accidental duplicate of another published article, or is judged by the editors to violate the journal's publication ethics guidelines (such as multiple submissions, bogus claims of authorship, plagiarism, or fraudulent use of data). Withdrawal means the article content (HTML and PDF) is deleted and replaced with an HTML page and PDF stating that the article has been withdrawn. In this case, the author will be charged a penalty of USD 150 per manuscript.`,
                "If the author does not agree to pay the penalty, the author and their affiliation will be blacklisted from publishing in this journal for three years.",
                "To request the withdrawal of a manuscript, an official letter signed by the corresponding author and the head of their institution must be sent to the Editor-in-Chief.",
              ],
            },
          ],
        },
        {
          id: ethicsAnchors.correction,
          heading: "Article Correction",
          body: [
            `**${journal.name}** should consider issuing a correction if:`,
            {
              list: [
                "A small part of an otherwise reliable publication reports flawed data or proves to be misleading, especially if this is the result of honest error.",
                "The author or contributor list is incorrect (e.g. a deserving author has been omitted, or someone who does not meet authorship criteria has been included).",
              ],
            },
            "Corrections to peer-reviewed content fall into one of three categories:",
            {
              list: [
                "**Publisher correction (erratum):** to notify readers of an important error made by publishing or journal staff (usually a production error) that has a negative impact on the publication record, the scientific integrity of the article, or the reputation of the authors or the journal.",
                "**Author correction (corrigendum):** to notify readers of an important error made by the authors that has a negative impact on the publication record, the scientific integrity of the article, or the reputation of the authors or the journal.",
                "**Addendum:** an addition to the article by its authors to explain inconsistencies, expand the existing work, or otherwise explain or update the information in the main work.",
              ],
            },
            "Whether a correction should be issued is decided by the journal's editors, sometimes with advice from reviewers or editorial board members. Handling editors will contact the authors of the paper concerned with a request for clarification, but the final decision on whether a correction is required, and if so which type, rests with the editors.",
          ],
        },
        {
          id: ethicsAnchors.removal,
          heading: "Article Removal",
          body: [
            "In an extremely limited number of cases, it may be necessary to remove a published article from our online platform. This will only happen if an article is clearly defamatory, infringes others' legal rights, is (or we have good reason to expect that it will be) the subject of a court order, or, if acted upon, may pose a serious health risk. In such circumstances, the metadata of the article (its title and author information) will be retained, but the text will be replaced with a screen indicating that the article has been removed for legal reasons.",
          ],
        },
        {
          id: ethicsAnchors.replacement,
          heading: "Article Replacement",
          body: [
            "In cases where an article, if acted upon, may pose a serious health risk, the authors of the original paper may wish to retract the flawed original and replace it with a corrected version. In such circumstances, the retraction procedures above will be followed, except that the retraction notice will contain a link to the corrected, re-published article together with a history of the document.",
          ],
        },
      ],
    },
  ] as EthicsSection[],
};
