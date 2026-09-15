import type { GuideNode } from "@/components/landing/content";

const textSizes = {
  /** Accordion panels. */
  sm: { text: "text-sm leading-relaxed", gap: "mb-3", items: "space-y-1 pl-5", item: "" },
  /** Full-width policy pages. */
  base: {
    text: "text-base leading-[26px]",
    gap: "mb-4",
    items: "space-y-2 pl-6 marker:text-[#5c6b73]",
    item: "pl-1",
  },
};

/** Renders `**spans**` as bold, e.g. to set a name apart inside a sentence. */
function withStrong(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-bold text-[#0c0c0c]">
          {part}
        </strong>
      ) : (
        part
      ),
    );
}

/** Renders one node of rich copy: a paragraph, a bulleted or numbered list, or term/description pairs. */
export function GuideNodeView({ node, size = "sm" }: { node: GuideNode; size?: keyof typeof textSizes }) {
  const { text, gap, items, item } = textSizes[size];
  const bodyTextClass = `${text} text-[#3f3f3f]`;

  if (typeof node === "string") {
    return <p className={`${gap} last:mb-0 ${bodyTextClass}`}>{withStrong(node)}</p>;
  }

  if ("terms" in node) {
    return (
      <dl className={`${gap} last:mb-0`}>
        {node.terms.map((entry) => (
          <div key={entry.term}>
            <dt className={`${text} font-bold text-[#0c0c0c]`}>{entry.term}</dt>
            <dd className={bodyTextClass}>{withStrong(entry.description)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  const listClass = `${gap} ${items} last:mb-0 ${bodyTextClass} ${
    node.ordered ? "list-decimal" : "list-disc"
  }`;
  const listItems = node.list.map((entry) => (
    <li key={entry} className={item}>
      {withStrong(entry)}
    </li>
  ));

  return node.ordered ? (
    <ol className={listClass}>{listItems}</ol>
  ) : (
    <ul className={listClass}>{listItems}</ul>
  );
}
