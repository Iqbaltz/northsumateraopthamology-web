import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveCatalogSection, archiveContent, archivePagePath } from "@/components/archive";
import { MotionEffects } from "@/components/landing";
import { getVolumeCardPage } from "@/lib/ojs/view";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** `?page=` as a positive whole number; anything else reads as the first page. */
function requestedPage(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const page = requestedPage((await searchParams).page);
  // Each page is canonical to itself so the volumes past the first page stay indexable.
  const path = archivePagePath(page);

  return {
    title: page > 1 ? `Archive Catalog · Page ${page}` : "Archive Catalog",
    description:
      "Every published volume of JONSON. Issued biannually in February and August with original research, review articles, and case reports in ophthalmology and visual science.",
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: "Archive Catalog · JONSON",
      description: "Browse every published volume and issue of JONSON.",
      url: path,
      locale: "en_US",
    },
  };
}

export default async function ArchivePage({ searchParams }: PageProps) {
  const requested = requestedPage((await searchParams).page);
  // Every volume published in OJS, a page at a time; the catalog shows a note while there are none.
  const { volumes, page, totalPages } = await getVolumeCardPage(requested, archiveContent.perPage);
  if (page > Math.max(totalPages, 1)) notFound();

  return (
    // Changing `?page=` keeps the page mounted, so key on it: MotionEffects then
    // runs again and reveals the newly rendered cards.
    <div className="overflow-hidden text-[#0c0c0c]" key={page}>
      <MotionEffects />
      <ArchiveCatalogSection volumes={volumes} page={page} totalPages={totalPages} />
    </div>
  );
}
