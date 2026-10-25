import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { journal } from "@/components/issues/journal";
import { landingContent } from "@/components/landing/content";
import { contactPath } from "./path";

const { address, showAddress } = landingContent.footer;

export const contactContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Contact Us", href: contactPath },
  ] as BreadcrumbItem[],
  hero: {
    title: "Contact",
    officialSite: {
      prefix:
        "JONSON: Journal of North Sumatera Ophthalmology Nexus official website is only",
      href: "https://www.northsumateraophthalmology.com/",
      href2: "https://journal.northsumateraophthalmology.com/",
      suffix:
        "We do not operate any other websites apart from this official site.",
    },
  },
  office: {
    title: `${journal.name}, is Journal publishing based on North Sumatera`,
    /** Bold lead-in on the email button, followed by the address itself. */
    emailLabel: "Contact us:",
    /** The address and its map link follow the site-wide `showAddress` switch. */
    location: showAddress
      ? {
          address,
          map: {
            label: "Find us on map",
            href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
          },
        }
      : null,
    disclaimer:
      "The contact details listed above are our only official contact channels. We are not affiliated with any other phone numbers, email addresses, or contact accounts.",
  },
};
