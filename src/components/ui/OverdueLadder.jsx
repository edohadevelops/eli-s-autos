import React from "react";
import { PAYMENT_LADDER, LADDER_META, COLORS } from "../../utils/constants.js";

// The signature element of the app: every financed account sits somewhere
// on this track (current -> late -> 30 -> 60 -> repossessed). Used on the
// dashboard (compact) and the financing page (full, with labels).
export default function OverdueLadder({ status, compact }) {
  const idx = PAYMENT_LADDER.indexOf(status);
  return (
    <div className="flex items-center gap-0.5 w-full">
      {PAYMENT_LADDER.map((step, i) => {
        const active = i <= idx;
        const meta = LADDER_META[step];
        return (
          <div key={step} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-full"
              style={{
                height: compact ? 5 : 6,
                background: active ? meta.color : COLORS.border,
                opacity: active ? 1 : 0.5,
              }}
            />
            {!compact && (
              <span
                className="text-[10px] font-medium tracking-wide uppercase"
                style={{ color: active ? meta.color : COLORS.textFaint }}
              >
                {meta.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
