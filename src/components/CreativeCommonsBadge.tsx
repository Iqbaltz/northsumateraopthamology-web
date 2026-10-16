import Image from "next/image";
import { landingContent } from "@/components/landing/content";

/** Link to the journal's Creative Commons licence, shown as the official CC BY-NC-SA button. */
export function CreativeCommonsBadge({ className = "" }: { className?: string }) {
  const license = landingContent.footer.license;

  return (
    <a
      className={`inline-flex shrink-0 rounded-[3px] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 ${className}`}
      href={license.href}
      target="_blank"
      rel="license noopener noreferrer"
    >
      <Image
        className="h-[31px] w-[88px]"
        src={license.badgeImage}
        alt={license.name}
        width={88}
        height={31}
      />
    </a>
  );
}
