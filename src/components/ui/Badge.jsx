import React from "react";

export default function Badge({ color, children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium tracking-wide"
      style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}
    >
      {children}
    </span>
  );
}
