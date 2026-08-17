import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Car } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import { useScrollDirection } from "../../hooks/useScrollDirection.js";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/cars", label: "Cars" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function PublicHeader() {
  const { hidden, scrolled } = useScrollDirection();

  return (
    <header
      className="w-full flex items-center justify-between px-8 py-4 sticky top-0 z-40 backdrop-blur transition-all duration-300 ease-out"
      style={{
        background: "rgba(255,255,255,0.85)",
        borderBottom: `1px solid ${COLORS.border}`,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        boxShadow: scrolled ? "0 4px 20px rgba(16,24,40,0.06)" : "none",
      }}
    >
      <Link to="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-105" style={{ background: COLORS.brass }}>
          <Car size={16} color="#FFFFFF" strokeWidth={2.5} />
        </div>
        <span className="font-display font-semibold text-base tracking-wide" style={{ color: COLORS.text }}>
          ELI'S AUTOS
        </span>
      </Link>

      <nav className="flex items-center gap-6">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className="relative text-sm font-medium py-1 group"
            style={({ isActive }) => ({ color: isActive ? COLORS.brassLight : COLORS.textDim })}
          >
            {({ isActive }) => (
              <>
                {l.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  style={{ background: COLORS.brass }}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
