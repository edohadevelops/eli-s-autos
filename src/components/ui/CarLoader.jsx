import React from "react";
import { Car } from "lucide-react";
import { COLORS as DEFAULT_COLORS } from "../../utils/constants.js";

export default function CarLoader({ label = "Loading", colors = DEFAULT_COLORS }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="relative w-48 h-14 overflow-hidden">
        <div
          className="absolute inset-x-0 bottom-3 h-[2px]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${colors.textFaint} 0 10px, transparent 10px 20px)`,
            animation: "roadDash 0.5s linear infinite",
          }}
        />
        <div className="absolute bottom-4" style={{ animation: "carDrive 1.6s ease-in-out infinite" }}>
          <div style={{ animation: "carBounce 0.3s ease-in-out infinite" }}>
            <Car size={30} color={colors.brass} strokeWidth={2} />
          </div>
        </div>
      </div>
      {label && (
        <span className="text-xs" style={{ color: colors.textFaint }}>
          {`${label}…`}
        </span>
      )}
    </div>
  );
}
