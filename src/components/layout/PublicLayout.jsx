import React from "react";
import PublicHeader from "./PublicHeader.jsx";
import PublicFooter from "./PublicFooter.jsx";
import PageTransition from "./PageTransition.jsx";
import ScrollProgressBar from "./ScrollProgressBar.jsx";
import WelcomeBanner from "./WelcomeBanner.jsx";
import EngagementPrompt from "../ui/EngagementPrompt.jsx";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: COLORS.base }}>
      <ScrollProgressBar />
      <WelcomeBanner />
      <PublicHeader />
      <main className="flex-1">
        <PageTransition />
      </main>
      <PublicFooter />
      <EngagementPrompt />
    </div>
  );
}
