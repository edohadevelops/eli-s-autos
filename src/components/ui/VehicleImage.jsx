import React from "react";
import { Car } from "lucide-react";
import { COLORS as DEFAULT_COLORS } from "../../utils/constants.js";

// Renders the vehicle photo, or a placeholder if one hasn't been added yet
// (photo isn't a required field on the vehicle form). Prevents broken-image
// icons from showing up across inventory cards, listings, and detail pages.
export default function VehicleImage({ src, alt, className = "", colors = DEFAULT_COLORS }) {
  if (!src) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ background: colors.surface }}>
        <Car size={28} color={colors.textFaint} strokeWidth={1.5} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} />;
}
