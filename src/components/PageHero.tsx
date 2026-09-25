import { Breadcrumb, type BreadcrumbItem } from "@/components/Breadcrumb";
import { shell } from "@/components/landing/styles";

/**
 * Tinted page header: breadcrumb, serif title and intro. `children` render under
 * the intro, e.g. a row of key facts. `className` extends the tinted band, e.g. a
 * minimum height for pages whose hero is their only content.
 */
export function PageHero({
  breadcrumb,
  title,
  description,
  children,
  className = "",
}: {
  breadcrumb: BreadcrumbItem[];
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-[linear-gradient(180deg,#eef3f5_0%,#f8fbfb_100%)] pt-8 pb-14 sm:pb-20 ${className}`}
    >
      <div className={shell}>
        <Breadcrumb items={breadcrumb} />

        <div className="mt-8 sm:mt-10 max-w-[1100px]" data-reveal>
          <h1 className="font-serif text-[32px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.15] text-[#0c0c0c]">
            {title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base leading-[26px] text-[#3f3f3f]">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
