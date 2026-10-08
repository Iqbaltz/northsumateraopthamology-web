import { Breadcrumb } from "@/components/Breadcrumb";
import { Pagination } from "@/components/Pagination";
import { VolumeCard, type VolumeCatalogItem } from "@/components/VolumeCard";
import { shell } from "@/components/landing/styles";
import { archiveContent, archivePagePath } from "./content";

/** One page of the volumes the journal has published in OJS, newest first. */
export function ArchiveCatalogSection({
  volumes,
  page,
  totalPages,
}: {
  volumes: VolumeCatalogItem[];
  page: number;
  totalPages: number;
}) {
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
        </div>

        {volumes.length ? (
          <>
            <div className="mt-10 sm:mt-12 grid grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
              {volumes.map((volume) => (
                <VolumeCard key={volume.label} volume={volume} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} hrefFor={archivePagePath} />
          </>
        ) : (
          <p className="mt-10 sm:mt-12 text-sm leading-6 text-[#4a4a4a]" data-reveal>
            {content.empty}
          </p>
        )}
      </div>
    </section>
  );
}
