import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { landingContent } from "@/components/landing/content";
import { contactPath } from "./path";

const address = landingContent.footer.address;

export const contactContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Contact Us", href: contactPath },
  ] as BreadcrumbItem[],
  hero: {
    title: "Contact",
    officialSite: {
      prefix: "JONSON: Journal of North Sumatera Ophthalmology Nexus official website is only",
      href: "https://www.northsumateraophthalmology.com/",
      suffix: "We do not operate any other websites apart from this official site.",
    },
  },
  office: {
    kicker: "JONSON is part of",
    name: "Rumah Sakit Khusus Mata Mencirim 77 Medan",
    address,
    map: {
      label: "Find us on map",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `Rumah Sakit Khusus Mata Mencirim 77, ${address}`,
      )}`,
    },
    telephone: "Telephone: (061) 12312312313",
    disclaimer:
      "The contact details listed above are our only official contact channels. We are not affiliated with any other phone numbers, email addresses, or contact accounts.",
  },
};
