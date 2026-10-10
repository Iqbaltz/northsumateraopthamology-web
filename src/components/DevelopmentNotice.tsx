import { Warning } from "@/components/icons";

/** Site-wide strip shown above the header while the site is not final. */
export function DevelopmentNotice() {
  return (
    <div role="status" className="bg-[#ff7a00] text-white">
      <p className="mx-auto flex w-[min(1320px,calc(100%_-_40px))] items-center justify-center gap-3 py-2 text-center text-xs leading-snug sm:text-sm lg:gap-5 lg:text-base">
        <Warning className="max-[700px]:hidden" />
        <span>
          This website is currently under development. Please do not cite or use any content on
          this website as an academic reference until further notice.
        </span>
        <Warning className="max-[700px]:hidden" />
      </p>
    </div>
  );
}
