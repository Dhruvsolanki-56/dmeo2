import React from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * Ink credential panel listing genuine highlights for the section it
 * sits beside.
 */
export default function HighlightPanel({ icon: Icon, title, items = [], className = "" }) {
  return (
    <div className={`relative flex flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-950 via-primary-900 to-primary-700 p-8 sm:p-10 ${className}`}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-500/30 blur-2xl" aria-hidden="true" />
      <div className="relative">
        {Icon && (
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
            <Icon size={24} />
          </div>
        )}
        {title && <h3 className="mb-5 font-display text-2xl font-normal text-white">{title}</h3>}
        <ul className="space-y-3.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.95rem] text-white/90">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
