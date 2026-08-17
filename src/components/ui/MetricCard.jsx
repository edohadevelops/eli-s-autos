import React from "react";
import Card from "./Card.jsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { COLORS } from "../../utils/constants.js";

export default function MetricCard({ label, value, delta, positive, icon: Icon, accent }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium" style={{ color: COLORS.textDim }}>
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center hover-lift"
          style={{ background: `${accent}22`, boxShadow: `0 4px 12px ${accent}33` }}
        >
          <Icon size={15} color={accent} strokeWidth={2} />
        </div>
      </div>
      <div className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>
        {value}
      </div>
      {delta && (
        <div className="flex items-center gap-1 mt-1.5">
          {positive ? (
            <ArrowUpRight size={13} color={COLORS.successLight} />
          ) : (
            <ArrowDownRight size={13} color={COLORS.dangerLight} />
          )}
          <span className="text-xs font-medium" style={{ color: positive ? COLORS.successLight : COLORS.dangerLight }}>
            {delta}
          </span>
          <span className="text-xs" style={{ color: COLORS.textFaint }}>
            vs last month
          </span>
        </div>
      )}
    </Card>
  );
}
