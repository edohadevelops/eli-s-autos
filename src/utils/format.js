export const money = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");
