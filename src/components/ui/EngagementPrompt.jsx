import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { X, MessageCircle } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";

// Contextual message per page: what someone browsing that page probably
// needs help with. "/contact" is intentionally excluded: if they're
// already there, they're taking action, not stuck.
const PROMPTS = {
  "/": { message: "Still exploring? I can help you find the right car.", cta: "Browse cars", to: "/cars" },
  "/cars": { message: "Need help narrowing things down? We're happy to help.", cta: "Contact us", to: "/contact" },
  "/services": { message: "Got a repair question? Let's get you scheduled.", cta: "Contact us", to: "/contact" },
  "/reviews": { message: "Ready to see what's available? Take a look at our cars.", cta: "Browse cars", to: "/cars" },
  "/gallery": { message: "Ready to find your own car? Take a look at what's available.", cta: "Browse cars", to: "/cars" },
};

const DEFAULT_PROMPT = { message: "Still here? Happy to answer any questions about this car.", cta: "Contact us", to: "/contact" };

const SHOW_AFTER_MS = 25000; // dwell time before the nudge appears
const AUTO_DISMISS_MS = 12000; // hides itself if ignored
const MAX_PER_SESSION = 3; // never shows more than this many times total
const SESSION_KEY = "elis-autos:engagement-shown-paths";

function getShownPaths() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");
  } catch {
    return [];
  }
}

function markShown(path) {
  try {
    const shown = getShownPaths();
    if (!shown.includes(path)) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify([...shown, path]));
    }
  } catch {
    // sessionStorage unavailable, fine, the nudge just won't be capped
  }
}

export default function EngagementPrompt() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const path = location.pathname;

    if (path === "/contact") return; // already taking action, don't interrupt
    if (getShownPaths().length >= MAX_PER_SESSION) return; // seen enough this session
    if (getShownPaths().includes(path)) return; // already nudged on this page this session

    const t = setTimeout(() => {
      setVisible(true);
      markShown(path);
    }, SHOW_AFTER_MS);

    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  const prompt = PROMPTS[location.pathname] || DEFAULT_PROMPT;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-w-xs rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 12px 32px rgba(16,24,40,0.15)",
        animation: "fadeInUp 0.4s ease-out",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${COLORS.brass}22` }}>
            <MessageCircle size={15} color={COLORS.brassLight} />
          </div>
          <span className="text-sm font-semibold" style={{ color: COLORS.text }}>Still there?</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{ background: COLORS.surface }}
          aria-label="Dismiss"
        >
          <X size={12} color={COLORS.textDim} />
        </button>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: COLORS.textDim }}>{prompt.message}</p>
      <Link
        to={prompt.to}
        onClick={() => setVisible(false)}
        className="text-xs font-semibold px-3 py-2 rounded-lg text-center hover-lift"
        style={{ background: COLORS.brassDim, color: "#FFFFFF" }}
      >
        {prompt.cta}
      </Link>
    </div>
  );
}
