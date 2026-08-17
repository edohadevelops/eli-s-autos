import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

// Wrap any section or card in <Reveal> to have it fade up into view as the
// user scrolls to it. delay staggers multiple items in a grid.
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "in-view" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
