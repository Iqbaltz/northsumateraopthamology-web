import Image from "next/image";
import Link from "next/link";

export type VolumeCatalogItem = {
  cover: string;
  alt: string;
  label: string;
  published: string;
  href: string;
};

/** Cover tile for one published volume. Shared by the issue catalog and the archive. */
export function VolumeCard({ volume }: { volume: VolumeCatalogItem }) {
  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-lg border border-[#e3e9eb] bg-white transition-[border-color,box-shadow,transform] duration-200 hover:shadow-[0_18px_30px_-24px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-2 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#a9cacc]"
      href={volume.href}
      data-reveal-item
    >
      <div className="relative h-[260px] lg:h-[320px] shrink-0 overflow-hidden bg-white">
        <Image
          className="object-contain transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          src={`/figma/${volume.cover}`}
          alt={volume.alt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 320px"
        />
      </div>
      <div className="border-t border-[#eef1f3] px-4 py-5 sm:px-5 sm:py-6">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.04em] text-[#0c0c0c]">
          {volume.label}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-[#8d8d8d]">{volume.published}</span>
          <Image
            className="size-5 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
            src="/figma/arrow-up-right.svg"
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </Link>
  );
}
