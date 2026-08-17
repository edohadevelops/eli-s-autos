import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ContentProvider } from "./lib/contentStore.jsx";
import CarLoader from "./components/ui/CarLoader.jsx";
import { PUBLIC_COLORS } from "./utils/publicTheme.js";

import PublicLayout from "./components/layout/PublicLayout.jsx";
import Home from "./pages/public/Home.jsx";
import Cars from "./pages/public/Cars.jsx";
import CarDetail from "./pages/public/CarDetail.jsx";
import Services from "./pages/public/Services.jsx";
import PublicReviews from "./pages/public/Reviews.jsx";
import Gallery from "./pages/public/Gallery.jsx";
import Contact from "./pages/public/Contact.jsx";

import AdminLayout from "./components/layout/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Inventory from "./pages/admin/Inventory.jsx";
import Customers from "./pages/admin/Customers.jsx";
import Financing from "./pages/admin/Financing.jsx";
import Rentals from "./pages/admin/Rentals.jsx";
import Repairs from "./pages/admin/Repairs.jsx";
import AdminReviews from "./pages/admin/Reviews.jsx";
import GalleryAdmin from "./pages/admin/GalleryAdmin.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import Reports from "./pages/admin/Reports.jsx";
import Workflow from "./pages/admin/Workflow.jsx";
import Settings from "./pages/admin/Settings.jsx";

export default function App() {
  // Brief splash on first load, car-driving loader style. Purely cosmetic,
  // there's no real data fetch yet since everything is fake data.
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // At least 3 seconds so the loading animation is actually visible to
    // customers, rather than flashing past before it registers.
    const t = setTimeout(() => setBooting(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (booting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: PUBLIC_COLORS.base }}>
        <div className="font-display text-lg font-semibold mb-2" style={{ color: PUBLIC_COLORS.text }}>ELI'S AUTOS</div>
        <CarLoader colors={PUBLIC_COLORS} label="Starting up" />
      </div>
    );
  }

  return (
    <ContentProvider>
      <AuthProvider>
        <Routes>
          {/* Public marketing site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reviews" element={<PublicReviews />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin operations dashboard (Gloria + Ellud) */}
          {/* TODO: wrap in a route guard once real auth exists */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="customers" element={<Customers />} />
            <Route path="financing" element={<Financing />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="repairs" element={<Repairs />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="workflow" element={<Workflow />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ContentProvider>
  );
}
