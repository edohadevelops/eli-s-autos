import React from "react";
import { TrendingDown } from "lucide-react";
import { COLORS } from "../../utils/constants.js";

// Only shows a badge when the price is at or below market. We don't
// advertise our own inventory as overpriced. If there's no favorable
// comparison, the badge simply doesn't render.
export default function DealBadge({ price, marketPrice, colors = COLORS }) {
  if (!marketPrice) return null;
  const ratio = price / marketPrice;
  if (ratio > 1) return null;

  const isGreat = ratio <= 0.93;
  const color = isGreat ? colors.successLight : colors.brassLight;
  const label = isGreat ? "Great price" : "Fair price";
  const savings = marketPrice - price;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
      style={{ background: `${color}1A`, color, border: `1px solid ${color}55` }}
    >
      <TrendingDown size={12} />
      {label}
      {savings > 100 && <span className="opacity-80">{`· $${savings.toLocaleString()} under market`}</span>}
    </span>
  );
}
