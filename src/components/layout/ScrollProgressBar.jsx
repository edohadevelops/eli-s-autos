import React, { useState, useEffect } from "react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ background: "transparent" }}>
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, background: COLORS.brass }}
      />
    </div>
  );
}
