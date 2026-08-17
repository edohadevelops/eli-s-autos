import { useState, useEffect, useRef } from "react";

// Returns { hidden, scrolled }. hidden becomes true when the user scrolls
// down past a small threshold, and false again as soon as they scroll up
// even slightly. scrolled is true once the page has moved off the top at
// all, used to add a shadow/background to an otherwise transparent header.
export function useScrollDirection(threshold = 8) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      setScrolled(y > 10);

      // Always show the header once you're near the very top or bottom of
      // the page, regardless of direction. Avoids it awkwardly hiding
      // right as someone reaches the footer.
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 40;

      if (y < 80 || atBottom) {
        setHidden(false);
      } else if (Math.abs(diff) > threshold) {
        setHidden(diff > 0);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hidden, scrolled };
}
