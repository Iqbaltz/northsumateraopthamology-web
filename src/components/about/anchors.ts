/**
 * In-page anchors on /about, shared by the section ids and every link that jumps
 * to them. Import-free so site-wide content (nav, footer) can use it without a cycle.
 */
export const aboutAnchors = {
  aimsScope: "aims-scope",
  information: "journal-information",
  peerReview: "peer-review",
  openAccess: "open-access",
  archiving: "archiving",
  copyright: "copyright",
} as const;

export const aboutPath = (anchor?: (typeof aboutAnchors)[keyof typeof aboutAnchors]) =>
  anchor ? `/about#${anchor}` : "/about";
