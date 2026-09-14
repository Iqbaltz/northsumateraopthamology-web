import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EditorialOfficeCard } from "@/components/EditorialOfficeCard";
import { shell } from "@/components/landing/styles";
import { editorialContent, profileKinds, type BoardMember, type ProfileKind } from "./content";

const badgeFrameClass =
  "inline-flex h-10 w-[104px] items-center justify-center rounded-md border border-[#d5e0e2] bg-white px-2.5";

/** The service's mark: a logo file where we have one, otherwise its wordmark set in type. */
function ProfileMark({ kind }: { kind: ProfileKind }) {
  const label = editorialContent.profileLabels[kind];

  switch (kind) {
    case "scopus":
      return <span className="text-[19px] font-medium tracking-tight text-[#e9711c]">{label}</span>;
    case "orcid":
      return (
        <span className="text-[18px] font-medium tracking-[0.02em] text-[#8d9194]">
          <span aria-hidden>
            ORC<span className="text-[#a6ce39]">iD</span>
          </span>
          <span className="sr-only">{label}</span>
        </span>
      );
    case "sinta":
      return (
        <Image
          className="h-7 w-auto object-contain"
          src="/figma/sinta.webp"
          alt={label}
          width={136}
          height={49}
        />
      );
    case "scholar":
      return (
        <Image
          className="h-8 w-auto object-contain"
          src="/figma/google-scholar.webp"
          alt={label}
          width={138}
          height={61}
        />
      );
  }
}

function ProfileBadge({ member, kind }: { member: BoardMember; kind: ProfileKind }) {
  const href = member.profiles[kind];

  if (!href) {
    return (
      <span className={badgeFrameClass}>
        <ProfileMark kind={kind} />
      </span>
    );
  }

  return (
    <a
      className={`${badgeFrameClass} transition-[border-color,box-shadow,transform] duration-200 hover:border-[#07868f] hover:shadow-[0_8px_18px_-12px_rgba(7,134,143,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] motion-safe:hover:-translate-y-0.5`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${member.name} on ${editorialContent.profileLabels[kind]}`}
    >
      <ProfileMark kind={kind} />
    </a>
  );
}

/** Grey head-and-shoulders stand-in until a portrait is supplied. */
function PortraitPlaceholder() {
  return (
    <svg className="size-full" viewBox="0 0 120 120" aria-hidden>
      <rect width="120" height="120" fill="#e3e7e9" />
      <circle cx="60" cy="47" r="21" fill="#b5bbbf" />
      <path d="M18 120c3-27 20-42 42-42s39 15 42 42Z" fill="#b5bbbf" />
    </svg>
  );
}

export function EditorialHeroSection() {
  const content = editorialContent.hero;

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={editorialContent.breadcrumb} />

        <div className="mt-8 sm:mt-10 max-w-[1100px]" data-reveal>
          <h1 className="font-serif text-[32px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] text-[#0c0c0c]">
            {content.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base leading-[26px] text-[#3f3f3f]">{content.description}</p>

          <dl className="mt-7 grid grid-cols-3 gap-6 border-t border-[#d5e0e2] pt-6 max-[700px]:grid-cols-1 max-[700px]:gap-4">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs sm:text-sm text-[#7a8a91]">{stat.label}</dt>
                <dd className="mt-1 text-sm sm:text-base font-semibold text-[#0c0c0c]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <article
      className="overflow-hidden rounded-xl border border-[#e3eaef] bg-white shadow-[0_14px_30px_-24px_rgba(0,0,0,0.25)]"
      data-reveal
    >
      <div className="flex items-start gap-8 p-6 sm:p-8 max-[700px]:flex-col-reverse max-[700px]:gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-sm sm:text-base font-semibold text-[#3f3f3f]">{member.role}</p>
          <h3 className="mt-1.5 text-xl sm:text-2xl font-bold leading-snug text-[#0c0c0c]">
            {member.name}
          </h3>
          <p className="mt-2.5 text-sm font-medium text-[#07868f]">{member.affiliation}</p>
          <p className="mt-4 text-sm leading-6 text-[#4a4a4a]">{member.bio}</p>
        </div>

        {member.portrait && (
          <div className="relative size-[180px] shrink-0 overflow-hidden rounded-md max-[1200px]:size-[140px] max-[700px]:size-[112px]">
            {member.portrait.src ? (
              <Image
                className="object-cover"
                src={member.portrait.src}
                alt={`Portrait of ${member.name}`}
                fill
                sizes="(max-width: 700px) 112px, (max-width: 1200px) 140px, 180px"
              />
            ) : (
              <PortraitPlaceholder />
            )}
          </div>
        )}
      </div>

      <div className="mx-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-[#e3eaef] py-5 sm:mx-8">
        <ul className="flex flex-wrap gap-2.5" aria-label={`${member.name}'s research profiles`}>
          {profileKinds.map((kind) => (
            <li key={kind}>
              <ProfileBadge member={member} kind={kind} />
            </li>
          ))}
        </ul>
        <a
          className="flex min-w-0 items-center gap-2 rounded-sm text-sm font-medium text-[#07868f] transition-colors duration-200 hover:text-[#066e75] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] [overflow-wrap:anywhere]"
          href={`mailto:${member.email}`}
        >
          <Image className="shrink-0" src="/figma/envelope.svg" alt="" width={18} height={18} />
          {member.email}
        </a>
      </div>
    </article>
  );
}

export function EditorialTeamSection() {
  return (
    <section className="bg-white pt-10 sm:pt-14 pb-14 sm:pb-20" aria-labelledby="editorial-team">
      <div className={shell}>
        <h2 id="editorial-team" className="sr-only">
          {editorialContent.teamHeading}
        </h2>
        <div className="grid gap-6 sm:gap-8">
          {editorialContent.members.map((member) => (
            <MemberCard key={member.email} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorialIndependenceSection() {
  const content = editorialContent.independence;

  return (
    <section className="bg-white pb-14 sm:pb-20">
      <div className={shell}>
        <div data-reveal>
          <h2 className="text-2xl sm:text-[28px] font-bold leading-tight text-[#0c0c0c]">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-[26px] text-[#3f3f3f]">{content.text}</p>
        </div>
      </div>
    </section>
  );
}

export function EditorialContactSection() {
  const content = editorialContent.contact;

  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className={shell}>
        <EditorialOfficeCard title={content.title} text={content.text} cta={content.cta} withIcon />
      </div>
    </section>
  );
}
