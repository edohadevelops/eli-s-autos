import React from "react";
import { Car } from "lucide-react";

// Drop-in replacement for a primary <button>. Pass `loading` to show a small
// car driving across the button instead of its label. This is the app's
// standard "working on it" indicator for any form submit or async action.
// The car uses currentColor, so it automatically matches the button's text
// color whether it's a brass CTA, an outline button, or anything else.
export default function LoadingButton({ loading, children, className = "", disabled, ...props }) {
  return (
    <button disabled={loading || disabled} className={`relative overflow-hidden ${className}`} {...props}>
      <span style={{ opacity: loading ? 0 : 1, transition: "opacity 0.15s ease" }}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-live="polite" aria-label="Loading">
          <Car size={16} color="currentColor" style={{ animation: "buttonCarDrive 1s linear infinite" }} />
        </span>
      )}
    </button>
  );
}
