import React, { useState, useMemo } from "react";
import { COLORS } from "../../utils/constants.js";
import { money } from "../../utils/format.js";

// A simple estimate, not a real quote: monthly = (price - down) / term,
// plus a flat rate assumption. Good enough for someone browsing to get a
// feel for affordability before they talk to Gloria about real terms.
export default function FinancingEstimator({ price, colors = COLORS }) {
  const [down, setDown] = useState(Math.round(price * 0.15));
  const [term, setTerm] = useState(30);

  const monthly = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const rate = 0.07 / 12; // flat estimate rate
    if (rate === 0) return principal / term;
    const payment = (principal * rate) / (1 - Math.pow(1 + rate, -term));
    return Math.round(payment);
  }, [price, down, term]);

  return (
    <div className="rounded-xl p-4" style={{ background: colors.card, border: `1px solid ${colors.border}` }}>
      <h3 className="font-display text-sm font-semibold mb-3" style={{ color: colors.text }}>
        Estimate your payment
      </h3>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs" style={{ color: colors.textDim }}>Down payment</label>
            <span className="font-mono text-xs" style={{ color: colors.text }}>{money(down)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.round(price * 0.5)}
            step={100}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs" style={{ color: colors.textDim }}>Term</label>
            <span className="font-mono text-xs" style={{ color: colors.text }}>{term} months</span>
          </div>
          <input
            type="range"
            min={12}
            max={48}
            step={6}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-4 pt-4 flex items-baseline justify-between" style={{ borderTop: `1px solid ${colors.border}` }}>
        <span className="text-xs" style={{ color: colors.textDim }}>Estimated monthly</span>
        <span className="font-display text-xl font-semibold" style={{ color: colors.brassLight }}>
          {money(monthly)}<span className="text-xs font-normal" style={{ color: colors.textFaint }}>/mo</span>
        </span>
      </div>
      <p className="text-[10.5px] mt-2" style={{ color: colors.textFaint }}>
        Estimate only. Real terms are set with Gloria based on your application.
      </p>
    </div>
  );
}
