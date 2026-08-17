import React from "react";
import { Car, Wallet, ShieldAlert, Calendar, Wrench, Camera, RotateCcw, ArrowRight } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import { COLORS } from "../../utils/constants.js";
import { ONBOARDING_KEY } from "../../components/admin/OnboardingTour.jsx";

const WORKFLOWS = [
  {
    icon: Car,
    title: "Selling a car with financing",
    steps: [
      "Add the car in Inventory with a price, market price, and condition report.",
      "Add the buyer in Customers if they're not already there.",
      "Create the financing account in Financing & collections with the sale terms.",
      "Mark the car's status as \"Sold \u00b7 financed\" in Inventory.",
      "Log payments as they come in. Balance and status update automatically.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "When a payment is missed",
    steps: [
      "The account automatically moves along the overdue ladder based on days since last payment.",
      "At 30 days, it's flagged \u201cat risk\u201d on the dashboard and the Financing badge in the sidebar.",
      "At 60 days, the system recommends repossession review, this is a judgment call, not automatic.",
      "If repossessed, mark the vehicle status back to \u201cFor sale\u201d in Inventory so it re-enters the sellable fleet.",
    ],
  },
  {
    icon: Calendar,
    title: "Renting a car",
    steps: [
      "The car must be Inventory category \u201crental\u201d and status \u201cAvailable to rent\u201d.",
      "Create a booking in Rentals, this automatically flips the car's status to \u201cRented\u201d.",
      "When the customer returns it, click \u201cMark returned\u201d, the car automatically becomes available again.",
    ],
  },
  {
    icon: Wrench,
    title: "A repair job, start to finish",
    steps: [
      "Customers can request a repair from the public Services page, it lands here as \u201cRequested\u201d automatically.",
      "Or add a job directly if they called or walked in.",
      "Move it through In progress / Waiting on parts as work happens, add a photo if useful.",
      "Click Complete when done. It's tracked in Analytics as completed revenue.",
    ],
  },
  {
    icon: Camera,
    title: "Customer photos and reviews",
    steps: [
      "A customer submits a photo from the public Gallery page, or you add a review directly in Reviews.",
      "New gallery photos wait in Gallery as \u201cPending\u201d, nothing shows publicly until approved.",
      "Reviews are live immediately when added, but can be unpublished anytime without deleting them.",
    ],
  },
  {
    icon: RotateCcw,
    title: "Changing what the public site says",
    steps: [
      "Go to Settings.",
      "Homepage headline, trust pillars, footer, contact info, social links, and the services menu are all editable there.",
      "Changes save immediately and appear on the public site right away, no code, no deploy.",
    ],
  },
];

export default function Workflow() {
  const replayTour = () => {
    try {
      window.localStorage.removeItem(ONBOARDING_KEY);
    } catch {
      // localStorage unavailable
    }
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>How it works</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
            The full workflow for each common task. Come back here anytime you need a refresher.
          </p>
        </div>
        <button
          onClick={replayTour}
          className="text-xs font-semibold px-3 py-2 rounded-lg shrink-0"
          style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
        >
          Replay the welcome tour
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {WORKFLOWS.map((w) => {
          const Icon = w.icon;
          return (
            <Card key={w.title} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${COLORS.brass}22` }}>
                  <Icon size={16} color={COLORS.brassLight} />
                </div>
                <h3 className="font-display text-base font-semibold" style={{ color: COLORS.text }}>{w.title}</h3>
              </div>
              <div className="flex flex-col gap-2.5 pl-1">
                {w.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 mt-0.5"
                      style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: COLORS.textDim }}>{s}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
