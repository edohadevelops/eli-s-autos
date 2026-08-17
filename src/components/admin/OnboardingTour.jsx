import React, { useState } from "react";
import {
  X, ArrowRight, ArrowLeft, LayoutDashboard, Car, Users, Wallet,
  Calendar, Wrench, Star, Camera, BarChart3, Settings,
} from "lucide-react";
import { COLORS } from "../../utils/constants.js";

export const ONBOARDING_KEY = "elis-autos:admin-onboarded";

const STEPS = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    text: "Your home base. Revenue, overdue accounts, and recent activity at a glance. Start here every day.",
  },
  {
    icon: Car,
    title: "Inventory",
    text: "Every vehicle Eli touches lives here, whether it's for sale, for rent, or in for repair. Add a car, edit its status, and set a price here first, everything else (public listings, rentals) reads from this.",
  },
  {
    icon: Users,
    title: "Customers",
    text: "The community's contact info and a reliability score. Add a customer here before financing them a car.",
  },
  {
    icon: Wallet,
    title: "Financing & collections",
    text: "The most important screen. Every financed sale, its payment ledger, and the overdue ladder (current \u2192 late \u2192 30 \u2192 60 days). Log payments here as they come in.",
  },
  {
    icon: Calendar,
    title: "Rentals",
    text: "Active bookings and pickups. Creating a booking here automatically marks the car as rented in Inventory, marking it returned frees it back up.",
  },
  {
    icon: Wrench,
    title: "Repairs",
    text: "Every job from intake to completion. Repair requests submitted from the public site land here automatically as \"Requested\".",
  },
  {
    icon: Star,
    title: "Reviews",
    text: "Manage testimonials shown on the homepage and public reviews page. Unpublish to hide one without deleting it.",
  },
  {
    icon: Camera,
    title: "Gallery",
    text: "Customer photo submissions wait here for approval before they go live on the public gallery. Nothing appears publicly without your OK.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    text: "Revenue by line, fleet utilization, and account health, computed from your real data.",
  },
  {
    icon: Settings,
    title: "Settings",
    text: "Everything on the public site (homepage headline, services menu, footer, social links) is editable here. No code required.",
  },
];

export default function OnboardingTour({ onClose }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  const finish = () => {
    try {
      window.localStorage.setItem(ONBOARDING_KEY, "true");
    } catch {
      // localStorage unavailable, tour will just show again next time
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.65)" }}>
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: COLORS.card, border: `1px solid ${COLORS.borderStrong}`, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${COLORS.brass}22` }}>
              <Icon size={20} color={COLORS.brassLight} />
            </div>
            <button onClick={finish} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Skip tour">
              <X size={15} color={COLORS.textDim} />
            </button>
          </div>

          <h3 className="font-display text-xl font-semibold" style={{ color: COLORS.text }}>{current.title}</h3>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: COLORS.textDim }}>{current.text}</p>

          <div className="flex items-center gap-1.5 mt-6 mb-5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{ height: 4, width: i === step ? 20 : 6, background: i === step ? COLORS.brass : COLORS.border }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg"
              style={{ color: step === 0 ? COLORS.textFaint : COLORS.textDim, opacity: step === 0 ? 0.4 : 1 }}
            >
              <ArrowLeft size={13} /> Back
            </button>
            <span className="text-[11px]" style={{ color: COLORS.textFaint }}>{step + 1} / {STEPS.length}</span>
            {isLast ? (
              <button
                onClick={finish}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg"
                style={{ background: COLORS.brass, color: COLORS.base }}
              >
                Get started
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg"
                style={{ background: COLORS.brass, color: COLORS.base }}
              >
                Next <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
