/**
 * Pragmatic TypeScript models for the OJS 3.4/3.5 REST API responses we consume.
 * Derived from the OJS entity schemas (context/issue/publication/galley/section).
 * Localized fields come back as objects keyed by locale, e.g. { en: "Title" }.
 */

export type LocalizedString = Record<string, string>;

export interface DoiObject {
  id?: number;
  doi?: string;
  resolvingUrl?: string;
}

export interface Author {
  id: number;
  fullName?: string;
  givenName?: LocalizedString | string;
  familyName?: LocalizedString | string;
  preferredPublicName?: LocalizedString | string;
  affiliation?: LocalizedString | string;
  /** OJS 3.5 moved affiliation into a ROR-aware list. */
  affiliations?: { name?: LocalizedString | string }[];
  orcid?: string;
  email?: string;
  seq?: number;
  userGroupName?: LocalizedString | string;
}

export interface Galley {
  id: number;
  label?: string;
  locale?: string;
  seq?: number;
  urlPublished?: string;
  urlRemote?: string;
  submissionFileId?: number;
  isApproved?: boolean;
  file?: {
    id?: number;
    mimetype?: string;
    name?: LocalizedString | string;
  };
}

export interface Publication {
  id: number;
  fullTitle?: LocalizedString;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  abstract?: LocalizedString;
  authors?: Author[];
  authorsString?: string;
  authorsStringShort?: string;
  galleys?: Galley[];
  pages?: string;
  sectionId?: number;
  issueId?: number;
  datePublished?: string;
  doiObject?: DoiObject;
  keywords?: Record<string, { name: string }[]> | LocalizedString;
  /** Plain strings in OJS 3.5; older builds wrapped them in an object. */
  citations?: (string | { rawCitation?: string })[];
  urlPublished?: string;
  coverImage?: Record<string, { uploadName?: string; altText?: string }>;
}

/** A submission as embedded in an issue's table of contents. */
export interface Article {
  id: number;
  currentPublicationId?: number;
  publications?: Publication[];
  /** OJS often inlines the current publication's summary fields on the article. */
  fullTitle?: LocalizedString;
  authorsString?: string;
  galleys?: Galley[];
  sectionId?: number;
  pages?: string;
  status?: number;
}

export interface Section {
  id: number;
  title?: LocalizedString;
  abbrev?: LocalizedString;
  seq?: number;
}

export interface Issue {
  id: number;
  title?: LocalizedString;
  description?: LocalizedString;
  identification?: string;
  volume?: number;
  number?: string;
  year?: number;
  published?: boolean;
  datePublished?: string;
  lastModified?: string;
  urlPath?: string;
  publishedUrl?: string;
  coverImageUrl?: LocalizedString;
  coverImageAltText?: LocalizedString;
  articles?: Article[];
  sections?: Section[];
}

export interface Context {
  id: number;
  name?: LocalizedString;
  description?: LocalizedString;
  acronym?: LocalizedString;
  abbreviation?: LocalizedString;
  onlineIssn?: string;
  printIssn?: string;
  publisherInstitution?: string;
  contactName?: string;
  contactEmail?: string;
  urlPath?: string;
  currentIssueId?: number;
}

/** OJS list endpoints return { itemsMax, items }. */
export interface ListResponse<T> {
  itemsMax: number;
  items: T[];
}
