import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import PageTransition from "./PageTransition.jsx";
import OnboardingTour, { ONBOARDING_KEY } from "../admin/OnboardingTour.jsx";
import { COLORS } from "../../utils/constants.js";

export default function AdminLayout() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(ONBOARDING_KEY);
      if (!seen) setShowTour(true);
    } catch {
      // localStorage unavailable, skip the auto-tour
    }
  }, []);

  return (
    <div
      className="flex w-full h-screen overflow-hidden"
      style={{
        background: `radial-gradient(1200px circle at 15% 0%, #1A1D2C 0%, ${COLORS.base} 45%), radial-gradient(900px circle at 100% 100%, #17202B 0%, ${COLORS.base} 55%)`,
      }}
    >
      <Sidebar />
      <div className="flex-1 h-full overflow-y-auto p-7">
        <PageTransition />
      </div>
      {showTour && <OnboardingTour onClose={() => setShowTour(false)} />}
    </div>
  );
}
