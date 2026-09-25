import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { shell, textLink } from "@/components/landing/styles";
import {
  announcementBreadcrumb,
  announcements,
  announcementsContent,
  formatAnnouncementDate,
  type Announcement,
} from "./content";
import { announcementPath } from "./path";

const tintedBand = "bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)]";

/** A full announcement: the whole notice sits on the tinted band, down to the footer. */
export function AnnouncementDetailSection({ announcement }: { announcement: Announcement }) {
  return (
    <article className={`${tintedBand} pt-8 pb-16 sm:pb-24`}>
      <div className={shell}>
        <Breadcrumb items={announcementBreadcrumb(announcement)} />

        <div className="mt-8 sm:mt-10 max-w-[1100px]" data-reveal>
          <h1 className="font-serif text-[32px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] text-[#0c0c0c]">
            {announcement.title}
          </h1>
          <time
            className="mt-4 block text-sm font-medium text-[#07868f] sm:mt-5 sm:text-base"
            dateTime={announcement.date}
          >
            {formatAnnouncementDate(announcement.date)}
          </time>

          <div className="mt-6 grid gap-6 text-base leading-[26px] text-[#3f3f3f] sm:mt-8">
            {announcement.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              {announcement.closing.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <p>{announcement.signature}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function AnnouncementListSection() {
  return (
    <div className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-24">
      <div className={shell}>
        {announcements.length === 0 ? (
          <p className="text-base text-[#5c6b73]">{announcementsContent.empty}</p>
        ) : (
          <ul className="grid gap-5">
            {announcements.map((announcement) => (
              <li key={announcement.slug} data-reveal>
                <article className="rounded-xl border border-[#d5e0e2] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#07868f] sm:p-8">
                  <time
                    className="text-sm font-medium text-[#07868f]"
                    dateTime={announcement.date}
                  >
                    {formatAnnouncementDate(announcement.date)}
                  </time>
                  <h2 className="mt-2 text-xl font-bold leading-tight text-[#0c0c0c] sm:text-2xl">
                    {announcement.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4a4a4a] sm:text-base sm:leading-[26px]">
                    {announcement.paragraphs[0]}
                  </p>
                  <Link
                    className={`${textLink} mt-4 text-sm`}
                    href={announcementPath(announcement.slug)}
                    aria-label={`${announcementsContent.readMore}: ${announcement.title}`}
                  >
                    {announcementsContent.readMore}
                    <Image className="size-4" src="/figma/caret-right.svg" alt="" width={16} height={16} />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
