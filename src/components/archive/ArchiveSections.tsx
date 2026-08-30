import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { VolumeCard } from "@/components/VolumeCard";
import { shell, textLink } from "@/components/landing/styles";
import { archiveContent } from "./content";

export function ArchiveCatalogSection() {
  const content = archiveContent;

  return (
    <section className="bg-white pt-16 sm:pt-24 pb-16 sm:pb-20">
      <div className={shell}>
        <Breadcrumb items={content.breadcrumb} />

        <div data-reveal>
          <h1 className="mt-10 sm:mt-12 text-2xl sm:text-[32px] font-bold leading-tight text-[#0c0c0c]">
            {content.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base leading-[25px] text-[#0c0c0c]">
            {content.description}
          </p>
          <Link className={`${textLink} mt-6 sm:mt-8 text-sm uppercase`} href="#">
            {content.viewAll}
            <Image
              className="size-5"
              src="/figma/caret-right.svg"
              alt="Right caret icon"
              width={20}
              height={20}
            />
          </Link>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {content.volumes.map((volume) => (
            <VolumeCard key={volume.label} volume={volume} />
          ))}
        </div>
      </div>
    </section>
  );
}
