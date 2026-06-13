/**
 * Renders OJS-authored rich text (context/issue descriptions, abstracts). These
 * fields come back as HTML strings — `<p>`, `<strong>`, etc. — from trusted
 * journal editors, so we render them as markup rather than escaped text.
 *
 * Base paragraph/emphasis spacing is baked in; pass `className` for layout
 * (margins, max-width, color) at the call site.
 */
export function RichText({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`[&_a]:underline [&_li]:mb-1 [&_p]:mb-3 last:[&_p]:mb-0 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
