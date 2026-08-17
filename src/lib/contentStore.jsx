import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  VEHICLES as DEFAULT_VEHICLES,
  CUSTOMERS as DEFAULT_CUSTOMERS,
  FINANCING as DEFAULT_FINANCING,
  REVIEWS as DEFAULT_REVIEWS,
  GALLERY as DEFAULT_GALLERY,
  RENTAL_BOOKINGS as DEFAULT_RENTALS,
  REPAIR_JOBS as DEFAULT_REPAIRS,
} from "../data/fakeData.js";

// ---------------------------------------------------------------------------
// This is the single source of truth for every editable piece of content in
// the app. Every page (public and admin) reads through useContent() instead
// of importing fakeData.js directly, so an edit made in the admin dashboard
// shows up everywhere immediately.
//
// Persistence is localStorage for now, good enough to prove the UX works,
// but it's per-browser: Gloria's edits on her laptop won't appear on
// Ellud's phone. See README "Moving to a real backend" for the Supabase
// migration path, which is a drop-in replacement for the load()/save()
// functions below.
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = "elis-autos:";

const seedReviews = DEFAULT_REVIEWS.map((r) => ({ ...r, published: true }));
const seedGallery = DEFAULT_GALLERY.map((g) => ({ ...g, status: "approved" }));

const DEFAULT_SERVICES = [
  { title: "Oil change", priceRange: "$40 \u2013 $60", description: "Full synthetic or conventional, includes filter." },
  { title: "Brake service", priceRange: "$150 \u2013 $300", description: "Pads, rotors, and inspection." },
  { title: "Check engine diagnostic", priceRange: "$80", description: "Full scan and a plain-language explanation of what it means." },
  { title: "Tire rotation", priceRange: "$25 \u2013 $40", description: "Extends tire life and keeps wear even." },
  { title: "General repair", priceRange: "Varies", description: "Bring it in, Eli will diagnose and give you a real quote first." },
];

const DEFAULT_SITE_SETTINGS = {
  heroHeadline: "Cars, care, and a community you can count on.",
  heroSubhead:
    "Eli's Autos sells, rents, and repairs cars for Springfield's international student community. Honest work, fair terms.",
  pillars: [
    { title: "Buy or rent", text: "Financed sales and daily rentals from a fleet Eli inspects and services himself." },
    { title: "Repairs done right", text: "The same hands-on mechanic work Eli's been trusted for since day one." },
    { title: "Built on trust", text: "A community of international students who've relied on Eli for years." },
  ],
  footerLine: "Eli's Autos \u00b7 Springfield, MO \u00b7 Sales, rentals, and repairs",
  contactEmail: "hello@elisautos.com",
  contactPhone: "(417) 555-0100",
  address: "901 N Prospect Ave, Springfield, MO 65802",
  hours: "Mon\u2013Fri 9am\u20136pm, Sat 10am\u20132pm",
  socials: {
    instagram: "",
    facebook: "",
    twitter: "",
  },
  services: DEFAULT_SERVICES,
};

function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    // Most likely cause: storage quota exceeded from large base64 gallery
    // photos. Real image storage (Supabase Storage) removes this ceiling.
    console.warn("Could not save content. Browser storage may be full.", err);
  }
}

function genId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [vehicles, setVehicles] = useState(() => load("vehicles", DEFAULT_VEHICLES));
  const [customers, setCustomers] = useState(() => load("customers", DEFAULT_CUSTOMERS));
  const [financing, setFinancing] = useState(() => load("financing", DEFAULT_FINANCING));
  const [reviews, setReviews] = useState(() => load("reviews", seedReviews));
  const [gallery, setGallery] = useState(() => load("gallery", seedGallery));
  const [rentals, setRentals] = useState(() => load("rentals", DEFAULT_RENTALS));
  const [repairs, setRepairs] = useState(() => load("repairs", DEFAULT_REPAIRS));
  const [siteSettings, setSiteSettings] = useState(() => load("siteSettings", DEFAULT_SITE_SETTINGS));

  useEffect(() => save("vehicles", vehicles), [vehicles]);
  useEffect(() => save("customers", customers), [customers]);
  useEffect(() => save("financing", financing), [financing]);
  useEffect(() => save("reviews", reviews), [reviews]);
  useEffect(() => save("gallery", gallery), [gallery]);
  useEffect(() => save("rentals", rentals), [rentals]);
  useEffect(() => save("repairs", repairs), [repairs]);
  useEffect(() => save("siteSettings", siteSettings), [siteSettings]);

  // ---- Vehicles ----
  const addVehicle = useCallback((v) => setVehicles((prev) => [...prev, { ...v, id: genId("V") }]), []);
  const updateVehicle = useCallback(
    (id, patch) => setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v))),
    []
  );
  const deleteVehicle = useCallback((id) => setVehicles((prev) => prev.filter((v) => v.id !== id)), []);

  // ---- Customers ----
  const addCustomer = useCallback(
    (c) => setCustomers((prev) => [...prev, { ...c, id: genId("C"), vehicles: [] }]),
    []
  );
  const updateCustomer = useCallback(
    (id, patch) => setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))),
    []
  );
  const deleteCustomer = useCallback((id) => setCustomers((prev) => prev.filter((c) => c.id !== id)), []);

  // ---- Financing ----
  // amount defaults to the account's fixed monthly payment, but callers can
  // pass a custom amount for partial payments or payoffs.
  const logPayment = useCallback((id, amount) => {
    setFinancing((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const paymentAmount = amount != null && amount > 0 ? amount : f.monthly;
        const newBalance = Math.max(f.balance - paymentAmount, 0);
        return {
          ...f,
          balance: newBalance,
          paid: f.paid + 1,
          lastPayment: new Date().toISOString().slice(0, 10),
          status: "current",
          daysLate: 0,
        };
      })
    );
  }, []);
  const updateFinancingStatus = useCallback(
    (id, status) => setFinancing((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f))),
    []
  );

  // ---- Reviews ----
  const addReview = useCallback(
    (r) => setReviews((prev) => [{ ...r, id: genId("R") }, ...prev]),
    []
  );
  const updateReview = useCallback(
    (id, patch) => setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r))),
    []
  );
  const deleteReview = useCallback((id) => setReviews((prev) => prev.filter((r) => r.id !== id)), []);

  // ---- Gallery ----
  const submitGalleryPhoto = useCallback(
    (g) =>
      setGallery((prev) => [
        { ...g, id: genId("G"), status: "pending", submittedAt: new Date().toISOString() },
        ...prev,
      ]),
    []
  );
  const approveGalleryPhoto = useCallback(
    (id) => setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, status: "approved" } : g))),
    []
  );
  const rejectGalleryPhoto = useCallback(
    (id) => setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, status: "rejected" } : g))),
    []
  );
  const deleteGalleryPhoto = useCallback((id) => setGallery((prev) => prev.filter((g) => g.id !== id)), []);

  // ---- Rentals ----
  // Booking status and the linked vehicle's status are kept in sync here so
  // there's one place that owns that relationship, rather than every screen
  // having to remember to update both.
  const addRentalBooking = useCallback(
    (r) => {
      setRentals((prev) => [{ ...r, id: genId("RB") }, ...prev]);
      if (r.status === "active") {
        setVehicles((prev) => prev.map((v) => (v.id === r.vehicleId ? { ...v, status: "rented", customer: r.customer } : v)));
      }
    },
    []
  );
  const updateRentalBooking = useCallback(
    (id, patch) => setRentals((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r))),
    []
  );
  const completeRentalBooking = useCallback((id) => {
    setRentals((prev) => {
      const booking = prev.find((r) => r.id === id);
      if (booking) {
        setVehicles((vPrev) =>
          vPrev.map((v) => (v.id === booking.vehicleId ? { ...v, status: "available_rent", customer: null } : v))
        );
      }
      return prev.map((r) => (r.id === id ? { ...r, status: "completed" } : r));
    });
  }, []);
  const deleteRentalBooking = useCallback((id) => setRentals((prev) => prev.filter((r) => r.id !== id)), []);

  // ---- Repairs ----
  const addRepairJob = useCallback(
    (j) => setRepairs((prev) => [{ ...j, id: genId("RJ"), checkedIn: j.checkedIn || new Date().toISOString().slice(0, 10), completed: null }, ...prev]),
    []
  );
  const updateRepairJob = useCallback(
    (id, patch) => setRepairs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j))),
    []
  );
  const completeRepairJob = useCallback(
    (id) => setRepairs((prev) => prev.map((j) => (j.id === id ? { ...j, status: "completed", completed: new Date().toISOString().slice(0, 10) } : j))),
    []
  );
  const deleteRepairJob = useCallback((id) => setRepairs((prev) => prev.filter((j) => j.id !== id)), []);
  // Public-facing: someone requesting a repair from the Services page lands
  // here as a new job with status "requested", same intake queue Ellud and
  // Gloria work from in the admin Repairs page.
  const submitRepairRequest = useCallback(
    (j) =>
      setRepairs((prev) => [
        { ...j, id: genId("RJ"), status: "requested", checkedIn: new Date().toISOString().slice(0, 10), completed: null, laborCost: 0, partsCost: 0 },
        ...prev,
      ]),
    []
  );

  // ---- Site settings ----
  const updateSiteSettings = useCallback((patch) => setSiteSettings((prev) => ({ ...prev, ...patch })), []);

  const value = {
    vehicles,
    customers,
    financing,
    reviews,
    gallery,
    rentals,
    repairs,
    siteSettings,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    logPayment,
    updateFinancingStatus,
    addReview,
    updateReview,
    deleteReview,
    submitGalleryPhoto,
    approveGalleryPhoto,
    rejectGalleryPhoto,
    deleteGalleryPhoto,
    addRentalBooking,
    updateRentalBooking,
    completeRentalBooking,
    deleteRentalBooking,
    addRepairJob,
    updateRepairJob,
    completeRepairJob,
    deleteRepairJob,
    submitRepairRequest,
    updateSiteSettings,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
