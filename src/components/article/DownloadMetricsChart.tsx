"use client";

import { useState, type KeyboardEvent, type PointerEvent } from "react";
import type { MonthlyDownloads } from "./content";

/** Brand teal nudged to clear the data-colour chroma floor (validated against white). */
const SERIES_COLOR = "#009099";

/** Whole-number ticks from zero to a clean top, about five intervals. */
function axisTicks(max: number): number[] {
  const ceiling = Math.max(max, 1);
  const rough = ceiling / 5;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const nice = [1, 2, 5, 10].map((m) => m * magnitude).find((step) => step >= rough) ?? rough;
  const step = Math.max(1, nice);
  const top = Math.ceil(ceiling / step) * step;
  return Array.from({ length: top / step + 1 }, (_, index) => index * step);
}

/**
 * Single-series area chart of monthly downloads. The plot is an SVG stretched to
 * its box (strokes stay 2px/1px via non-scaling-stroke); axis labels, markers and
 * the tooltip are HTML so text never scales. Hover, tap, or focus + arrow keys
 * move a crosshair; a visually hidden table carries every value.
 */
export function DownloadMetricsChart({
  data,
  unit,
  caption,
}: {
  data: MonthlyDownloads[];
  unit: { one: string; other: string };
  caption: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const ticks = axisTicks(Math.max(...data.map((point) => point.value)));
  const top = ticks[ticks.length - 1];
  const last = data.length - 1;
  const x = (index: number) => (last === 0 ? 50 : (index / last) * 100);
  const y = (value: number) => 100 - (value / top) * 100;

  const line = data.map((point, index) => `${index ? "L" : "M"}${x(index)} ${y(point.value)}`).join(" ");
  const area = `${line} L${x(last)} 100 L${x(0)} 100 Z`;

  const format = (value: number) =>
    `${value.toLocaleString("en-US")} ${value === 1 ? unit.one : unit.other}`;

  const clamp = (index: number) => Math.min(last, Math.max(0, index));

  const indexAtPointer = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    return clamp(Math.round(((event.clientX - box.left) / box.width) * last));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
    if (event.key in steps) {
      setActive((index) => clamp((index ?? last) + steps[event.key]));
    } else if (event.key === "Home") {
      setActive(0);
    } else if (event.key === "End") {
      setActive(last);
    } else if (event.key === "Escape") {
      setActive(null);
    } else {
      return;
    }
    event.preventDefault();
  };

  const shown = active === null ? undefined : data[active];
  const marked = active ?? last;
  const plotHeight = "h-[240px] sm:h-[320px]";

  return (
    <figure className="mt-6 sm:mt-8">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 pr-4">
        <div
          className={`relative ${plotHeight} min-w-5 text-right text-xs tabular-nums text-[#5c6b73]`}
          aria-hidden
        >
          {ticks.map((tick) => (
            <span
              key={tick}
              className="absolute right-0 -translate-y-1/2 leading-none"
              style={{ top: `${y(tick)}%` }}
            >
              {tick}
            </span>
          ))}
        </div>

        <div
          className={`relative ${plotHeight} cursor-crosshair touch-pan-y rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07868f] focus-visible:ring-offset-4`}
          role="group"
          aria-label={`${caption}. Use the left and right arrow keys to read each month.`}
          tabIndex={0}
          onPointerMove={(event) => setActive(indexAtPointer(event))}
          onPointerDown={(event) => setActive(indexAtPointer(event))}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setActive(null);
          }}
          onFocus={() => setActive((index) => index ?? last)}
          onBlur={() => setActive(null)}
          onKeyDown={onKeyDown}
        >
          <svg
            className="absolute inset-0 size-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {ticks.map((tick) => (
              <line
                key={tick}
                x1="0"
                x2="100"
                y1={y(tick)}
                y2={y(tick)}
                stroke={tick === 0 ? "#c9d3d7" : "#e6edef"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={area} fill={SERIES_COLOR} fillOpacity="0.12" />
            <path
              d={line}
              fill="none"
              stroke={SERIES_COLOR}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {shown && (
            <span
              className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-[#9aa8ae]"
              style={{ left: `${x(marked)}%` }}
              aria-hidden
            />
          )}

          <span
            className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
            style={{
              left: `${x(marked)}%`,
              top: `${y(data[marked].value)}%`,
              backgroundColor: SERIES_COLOR,
            }}
            aria-hidden
          />

          {/* Direct label on the latest month; the tooltip takes over while exploring. */}
          {!shown && (
            <span
              className={`pointer-events-none absolute -translate-x-[calc(100%_+_8px)] text-sm font-semibold tabular-nums text-[#0c0c0c] ${
                // Beside the dot when it tops the axis, so the label stays inside the plot.
                y(data[last].value) < 12 ? "-translate-y-1/2" : "-translate-y-[calc(100%_+_4px)]"
              }`}
              style={{ left: `${x(last)}%`, top: `${y(data[last].value)}%` }}
              aria-hidden
            >
              {data[last].value.toLocaleString("en-US")}
            </span>
          )}

          {shown && (
            <div
              className={`pointer-events-none absolute top-2 z-10 whitespace-nowrap rounded-md border border-[#d5e0e2] bg-white px-3 py-2 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)] ${
                x(marked) > 60 ? "-translate-x-[calc(100%_+_10px)]" : "translate-x-2.5"
              }`}
              style={{ left: `${x(marked)}%` }}
              aria-hidden
            >
              <p className="flex items-center gap-2 text-sm font-semibold tabular-nums text-[#0c0c0c]">
                <span className="h-0.5 w-3 rounded-full" style={{ backgroundColor: SERIES_COLOR }} />
                {format(shown.value)}
              </p>
              <p className="mt-0.5 text-xs text-[#5c6b73]">{shown.label}</p>
            </div>
          )}
        </div>

        <span aria-hidden />
        <div className="relative mt-2 h-5 text-xs text-[#5c6b73]" aria-hidden>
          {data.map((point, index) => (
            <span
              key={point.label}
              className={`absolute top-0 -translate-x-1/2 whitespace-nowrap transition-colors duration-150 ${
                // Narrow screens label every other month, always keeping the latest.
                (last - index) % 2 === 1 ? "max-[700px]:hidden" : ""
              } ${active === index ? "font-semibold text-[#0c0c0c]" : ""}`}
              style={{ left: `${x(index)}%` }}
            >
              {point.month}
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown ? `${shown.label}: ${format(shown.value)}` : ""}
      </p>

      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Downloads</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.label}>
              <th scope="row">{point.label}</th>
              <td>{point.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
