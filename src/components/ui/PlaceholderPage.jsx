import React from "react";
import { COLORS } from "../../utils/constants.js";

// Used for modules mapped out in the brainstorm but not yet built.
// Swap this out page by page as each module gets built for real.
// Accepts an optional colors override so it works on both the dark admin
// theme and the light public theme.
export default function PlaceholderPage({ title, description, phase, colors = COLORS }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-semibold" style={{ color: colors.text }}>{title}</h1>
        {phase && (
          <span className="text-[11px] font-semibold px-2 py-1 rounded" style={{ background: `${colors.petrol}1A`, color: colors.petrolLight }}>
            {phase}
          </span>
        )}
      </div>
      <p className="text-sm max-w-md" style={{ color: colors.textDim }}>{description}</p>
      <div
        className="mt-4 rounded-xl p-10 flex items-center justify-center text-sm"
        style={{ background: colors.card, border: `1px dashed ${colors.border}`, color: colors.textFaint, minHeight: 240 }}
      >
        Built next. This module isn't scaffolded yet.
      </div>
    </div>
  );
}
