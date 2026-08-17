import React from "react";
import { COLORS } from "../../utils/constants.js";

export default function Modal({ children, onClose, maxWidth = "max-w-lg", colors = COLORS }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${maxWidth} rounded-xl overflow-hidden shadow-2xl`}
        style={{ background: colors.card, border: `1px solid ${colors.borderStrong}` }}
      >
        {children}
      </div>
    </div>
  );
}
