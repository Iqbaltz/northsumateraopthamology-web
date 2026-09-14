/**
 * In-page anchors on /policies, shared by the section ids and every link that jumps
 * to them. Import-free so site-wide content (nav, footer) can use it without a cycle.
 */
export const policiesAnchors = {
  peerReview: "peer-review-policy",
  editorialDecision: "editorial-decision",
  publicationEthics: "publication-ethics",
  researchMisconduct: "research-misconduct",
  conflictOfInterest: "conflict-of-interest",
  authorship: "authorship",
  corrections: "corrections-retractions",
  ethicalApproval: "ethical-approval",
  editorialIndependence: "editorial-independence",
} as const;

export type PoliciesAnchor = (typeof policiesAnchors)[keyof typeof policiesAnchors];

export const policiesPath = (anchor?: PoliciesAnchor) =>
  anchor ? `/policies#${anchor}` : "/policies";
