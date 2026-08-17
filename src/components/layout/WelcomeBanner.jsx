import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";

const SEEN_KEY = "elis-autos:public-onboarded";

// A single, quiet banner shown once ever, on first visit. Not a tour, not a
// modal blocking the page, just a couple of pointers to the two things a
// new visitor most likely wants: browse cars, or ask a question.
export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(SEEN_KEY);
      if (!seen) setVisible(true);
    } catch {
      // localStorage unavailable, just skip it
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "true");
    } catch {
      // fine, it'll show again next visit, not a big deal
    }
  };

  if (!visible) return null;

  return (
    <div
      className="w-full flex items-center justify-center gap-4 px-4 py-2.5 text-xs flex-wrap"
      style={{ background: `${COLORS.brass}14`, borderBottom: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
    >
      <span>New here? Browse the fleet, or reach out if you've got questions.</span>
      <div className="flex items-center gap-3">
        <Link to="/cars" onClick={dismiss} className="font-semibold" style={{ color: COLORS.brassLight }}>
          Browse cars
        </Link>
        <Link to="/contact" onClick={dismiss} className="font-semibold" style={{ color: COLORS.brassLight }}>
          Contact us
        </Link>
        <button onClick={dismiss} aria-label="Dismiss" className="flex items-center">
          <X size={13} color={COLORS.textFaint} />
        </button>
      </div>
    </div>
  );
}
