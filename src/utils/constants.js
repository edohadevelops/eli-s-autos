// Admin theme: a cooler, richer charcoal-navy rather than a flat
// brownish-black, aiming for a "silky/glossy" premium feel while staying
// dark enough for extended daily use. Same brand family (brass accent,
// petrol/danger/success) as the public site, just the dark variant.
export const COLORS = {
  base: "#0D0E14",
  surface: "#15161F",
  card: "#1B1D29",
  cardHover: "#232534",
  border: "#2A2C3A",
  borderStrong: "#383B4E",
  text: "#F1F2F6",
  textDim: "#A2A5B8",
  textFaint: "#676A82",
  brass: "#CC9A44",
  brassLight: "#E8B968",
  brassDim: "#9C7530",
  petrol: "#3F82A0",
  petrolLight: "#63AFC9",
  danger: "#DC5B52",
  dangerLight: "#F17F76",
  success: "#4CA35C",
  successLight: "#74C685",
  warn: "#E0A83E",
};

export const STATUS_META = {
  available_rent: { label: "Available to rent", color: COLORS.success },
  rented: { label: "Rented", color: COLORS.petrol },
  for_sale: { label: "For sale", color: COLORS.brass },
  sold_financed: { label: "Sold · financed", color: COLORS.brassDim },
  in_repair: { label: "In repair", color: COLORS.warn },
  repossessed: { label: "Repossessed", color: COLORS.danger },
};

export const PAYMENT_LADDER = ["current", "late", "30", "60", "repossessed"];

export const LADDER_META = {
  current: { label: "Current", color: COLORS.success },
  late: { label: "Late", color: COLORS.warn },
  "30": { label: "30 days", color: COLORS.brassLight },
  "60": { label: "60 days", color: COLORS.dangerLight },
  repossessed: { label: "Repossessed", color: COLORS.danger },
};

// Repossession policy: how many days since last payment before an account
// crosses into each stage of the ladder above. Centralized here so the
// dashboard, financing page, and any future automated-notice logic all
// agree on the same thresholds.
export const REPO_THRESHOLDS = {
  late: 1,
  "30": 30,
  "60": 60, // crossing this triggers repossession review, per the brainstorm
};
