import React from "react";
import { useLocation, Outlet } from "react-router-dom";

// Keying on the pathname forces React to remount the content on navigation,
// which restarts the fadeInUp animation, giving every route change a
// soft transition instead of an abrupt jump cut.
export default function PageTransition() {
  const location = useLocation();
  return (
    <div key={location.pathname} style={{ animation: "fadeInUp 0.4s ease-out" }}>
      <Outlet />
    </div>
  );
}
