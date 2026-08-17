import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { COLORS } from "../../utils/constants.js";

// Honest disclosure, not a sales pitch: "good" items build trust, "noted"
// items say plainly what's wrong instead of hiding it until pickup.
export default function ConditionReport({ items, colors = COLORS }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-xl p-4" style={{ background: colors.card, border: `1px solid ${colors.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-sm font-semibold" style={{ color: colors.text }}>
          Condition report
        </h3>
        <span className="text-[11px]" style={{ color: colors.textFaint }}>Inspected by Eli</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => {
          const isGood = item.status === "good";
          const Icon = isGood ? CheckCircle2 : AlertCircle;
          const color = isGood ? colors.successLight : colors.warn;
          return (
            <div key={item.label} className="flex items-start gap-2.5">
              <Icon size={15} color={color} className="mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-medium" style={{ color: colors.text }}>{item.label}</span>
                <span className="text-xs" style={{ color: colors.textDim }}>: {item.note}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
