/**
 * In-page anchors on /publication-ethics, shared by the section ids and every link
 * that jumps to them. Import-free so site-wide content (footer) can use it without a cycle.
 */
export const ethicsAnchors = {
  editors: "for-editors",
  reviewers: "for-reviewers",
  authors: "for-authors",
  rwc: "retraction-withdrawal-correction",
  retraction: "article-retraction",
  withdrawal: "article-withdrawal",
  correction: "article-correction",
  removal: "article-removal",
  replacement: "article-replacement",
} as const;

export type EthicsAnchor = (typeof ethicsAnchors)[keyof typeof ethicsAnchors];

export const ethicsPath = (anchor?: EthicsAnchor) =>
  anchor ? `/publication-ethics#${anchor}` : "/publication-ethics";
