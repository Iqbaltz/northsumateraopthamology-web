import type { BreadcrumbItem } from "@/components/Breadcrumb";
import type { VolumeCatalogItem } from "@/components/VolumeCard";

/** Only one cover asset exists so far; swap per-volume artwork in as it lands. */
function volume(
  label: string,
  published: string,
  alt: string,
): VolumeCatalogItem {
  return { cover: "journal-cover.webp", alt, label, published, href: "#" };
}

export const archiveContent = {
  breadcrumb: [
    { label: "Homepage", href: "/" },
    { label: "Archive", href: "/archive" },
  ] as BreadcrumbItem[],
  title: "Archive Catalog",
  description:
    "Published biannually in February and August, JONSON disseminates original research articles, review articles, case reports, and other scientific contributions relevant to ophthalmology and visual science.",
  viewAll: "VIEW ALL VOLUMES",
  volumes: [
    volume("VOLUME 13 • NUMBER 1", "Published January 2024", "JONSON Journal Volume 13 Number 1 cover"),
    volume("VOLUME 12 • NUMBER 2", "Published August 2024", "JONSON Journal Volume 12 Number 2 cover"),
    volume("VOLUME 12 • NUMBER 1", "Published February 2024", "JONSON Journal Volume 12 Number 1 cover"),
    volume("VOLUME 11 • NUMBER 2", "Published August 2023", "JONSON Journal Volume 11 Number 2 cover"),
    volume("VOLUME 11 • NUMBER 1", "Published February 2023", "JONSON Journal Volume 11 Number 1 cover"),
    volume("VOLUME 10 • NUMBER 2", "Published August 2022", "JONSON Journal Volume 10 Number 2 cover"),
    volume("VOLUME 10 • NUMBER 1", "Published February 2022", "JONSON Journal Volume 10 Number 1 cover"),
    volume("VOLUME 9 • NUMBER 2", "Published August 2021", "JONSON Journal Volume 9 Number 2 cover"),
    volume("VOLUME 9 • NUMBER 1", "Published February 2021", "JONSON Journal Volume 9 Number 1 cover"),
    volume("VOLUME 8 • NUMBER 2", "Published August 2020", "JONSON Journal Volume 8 Number 2 cover"),
    volume("VOLUME 8 • NUMBER 1", "Published February 2020", "JONSON Journal Volume 8 Number 1 cover"),
    volume("VOLUME 7 • NUMBER 2", "Published August 2019", "JONSON Journal Volume 7 Number 2 cover"),
    volume("VOLUME 7 • NUMBER 1", "Published February 2019", "JONSON Journal Volume 7 Number 1 cover"),
    volume("VOLUME 6 • NUMBER 2", "Published August 2018", "JONSON Journal Volume 6 Number 2 cover"),
    volume("VOLUME 6 • NUMBER 1", "Published February 2018", "JONSON Journal Volume 6 Number 1 cover"),
    volume("VOLUME 5 • NUMBER 2", "Published August 2017", "JONSON Journal Volume 5 Number 2 cover"),
  ],
};
