import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { privacyPath } from "./path";

export const privacyContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Privacy Statement", href: privacyPath },
  ] as BreadcrumbItem[],
  hero: {
    title: "Privacy Statement",
    description:
      "The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this journal and will not be made available for any other purpose or to any other party.",
  },
};
