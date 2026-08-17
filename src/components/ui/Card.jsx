import React from "react";

export default function Card({ children, className = "", style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-border relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(180deg, #21232F 0%, #191B26 100%)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
