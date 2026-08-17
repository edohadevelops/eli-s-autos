// All data in this file is fake, for building the UI before Supabase is wired up.
// Each array below is shaped like a future database table, so migrating to real
// queries later means writing a fetch, not restructuring components.
//
// Future tables: vehicles, customers, financing_accounts, payments, rentals,
// repair_jobs, reviews, activity_log.

// marketPrice: a rough comparable-vehicle estimate, used to compute the
// "Great price" / "Fair price" badge on public listings (see DealBadge.jsx).
// condition: a short honest inspection summary per car, in the spirit of a
// Carvana-style condition report. "good" items build trust, "noted" items
// disclose real issues instead of hiding them.
export const VEHICLES = [
  { id: "V-1001", make: "Toyota", model: "Camry", year: 2019, vin: "4T1BF1FK5JU123456", mileage: 62000, color: "Silver", category: "sale", status: "sold_financed", price: 14500, marketPrice: 15800, photo: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80", customer: "Amara Nwosu",
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "No leaks, runs smooth" },
      { label: "Brakes", status: "good", note: "Replaced at 58,000 mi" },
      { label: "Tires", status: "good", note: "70% tread remaining" },
      { label: "Body & paint", status: "good", note: "No accident history" },
    ] },
  { id: "V-1002", make: "Honda", model: "Civic", year: 2020, vin: "2HGFC2F59LH123456", mileage: 41200, color: "Blue", category: "rental", status: "rented", price: 42, photo: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80", customer: "Diego Fernandez" },
  { id: "V-1003", make: "Chevrolet", model: "Malibu", year: 2018, vin: "1G1ZD5ST0JF123456", mileage: 78500, color: "Black", category: "sale", status: "for_sale", price: 11200, marketPrice: 12400, photo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80", customer: null,
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "No leaks, runs smooth" },
      { label: "Brakes", status: "noted", note: "Front pads at 30%, budget for replacement soon" },
      { label: "Tires", status: "good", note: "60% tread remaining" },
      { label: "Body & paint", status: "noted", note: "Small dent, rear passenger door" },
    ] },
  { id: "V-1004", make: "Nissan", model: "Altima", year: 2021, vin: "1N4BL4BV1MC123456", mileage: 22100, color: "White", category: "rental", status: "available_rent", price: 48, photo: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", customer: null },
  { id: "V-1005", make: "Ford", model: "Fusion", year: 2017, vin: "3FA6P0H70HR123456", mileage: 95300, color: "Gray", category: "repair", status: "in_repair", price: 0, photo: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=80", customer: "Priya Sharma" },
  { id: "V-1006", make: "Hyundai", model: "Elantra", year: 2019, vin: "5NPD84LF1KH123456", mileage: 58900, color: "Red", category: "sale", status: "sold_financed", price: 12800, marketPrice: 13100, photo: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=600&q=80", customer: "Kwame Boateng",
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "No leaks, runs smooth" },
      { label: "Brakes", status: "good", note: "Even wear, no issues" },
      { label: "Tires", status: "good", note: "65% tread remaining" },
      { label: "Body & paint", status: "good", note: "No accident history" },
    ] },
  { id: "V-1007", make: "Kia", model: "Optima", year: 2018, vin: "5XXGT4L37JG123456", mileage: 71000, color: "Silver", category: "sale", status: "sold_financed", price: 10500, marketPrice: 11000, photo: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80", customer: "Chidi Okafor",
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "No leaks, runs smooth" },
      { label: "Brakes", status: "good", note: "Even wear, no issues" },
      { label: "Tires", status: "noted", note: "35% tread, plan to replace within 6 months" },
      { label: "Body & paint", status: "good", note: "No accident history" },
    ] },
  { id: "V-1008", make: "Volkswagen", model: "Jetta", year: 2020, vin: "3VWC57BU1LM123456", mileage: 33400, color: "Blue", category: "rental", status: "rented", price: 45, photo: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80", customer: "Lin Wei" },
  { id: "V-1009", make: "Mazda", model: "6", year: 2019, vin: "JM1GL1VM4K1123456", mileage: 49200, color: "White", category: "sale", status: "sold_financed", price: 13100, marketPrice: 13400, photo: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&q=80", customer: "Amara Nwosu",
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "No leaks, runs smooth" },
      { label: "Brakes", status: "good", note: "Replaced at 44,000 mi" },
      { label: "Tires", status: "good", note: "80% tread remaining" },
      { label: "Body & paint", status: "good", note: "No accident history" },
    ] },
  { id: "V-1010", make: "Subaru", model: "Legacy", year: 2020, vin: "4S3BWAF60L3123456", mileage: 27800, color: "Black", category: "sale", status: "for_sale", price: 15900, marketPrice: 16200, photo: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", customer: null,
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "No leaks, runs smooth" },
      { label: "Brakes", status: "good", note: "Even wear, no issues" },
      { label: "Tires", status: "good", note: "85% tread remaining" },
      { label: "Body & paint", status: "good", note: "No accident history" },
    ] },
  { id: "V-1011", make: "Chevrolet", model: "Cruze", year: 2017, vin: "1G1BE5SM0H7123456", mileage: 88000, color: "Silver", category: "sale", status: "repossessed", price: 8900, marketPrice: 9600, photo: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=600&q=80", customer: "Marcus Webb",
    condition: [
      { label: "Engine & drivetrain", status: "good", note: "Inspected after repossession, runs smooth" },
      { label: "Brakes", status: "noted", note: "Rear pads due for replacement" },
      { label: "Tires", status: "good", note: "55% tread remaining" },
      { label: "Body & paint", status: "good", note: "No accident history" },
    ] },
  { id: "V-1012", make: "Toyota", model: "Corolla", year: 2021, vin: "5YFB4MDE1MP123456", mileage: 18300, color: "Gray", category: "rental", status: "available_rent", price: 40, photo: "https://images.unsplash.com/photo-1623869675184-06e1d7f8a9c9?w=600&q=80", customer: null },
];

export const CUSTOMERS = [
  { id: "C-01", name: "Amara Nwosu", country: "Nigeria", email: "amara.n@student.edu", phone: "(417) 555-0142", joined: "2024-03-12", reliability: 92, vehicles: ["V-1001", "V-1009"] },
  { id: "C-02", name: "Diego Fernandez", country: "Colombia", email: "diego.f@student.edu", phone: "(417) 555-0187", joined: "2025-01-08", reliability: 88, vehicles: ["V-1002"] },
  { id: "C-03", name: "Priya Sharma", country: "India", email: "priya.s@student.edu", phone: "(417) 555-0119", joined: "2023-09-22", reliability: 95, vehicles: ["V-1005"] },
  { id: "C-04", name: "Kwame Boateng", country: "Ghana", email: "kwame.b@student.edu", phone: "(417) 555-0163", joined: "2024-06-30", reliability: 41, vehicles: ["V-1006"] },
  { id: "C-05", name: "Chidi Okafor", country: "Nigeria", email: "chidi.o@student.edu", phone: "(417) 555-0155", joined: "2024-11-14", reliability: 58, vehicles: ["V-1007"] },
  { id: "C-06", name: "Lin Wei", country: "China", email: "lin.w@student.edu", phone: "(417) 555-0129", joined: "2025-02-19", reliability: 90, vehicles: ["V-1008"] },
  { id: "C-07", name: "Marcus Webb", country: "USA", email: "marcus.w@gmail.com", phone: "(417) 555-0171", joined: "2023-05-03", reliability: 12, vehicles: ["V-1011"] },
];

export const FINANCING = [
  { id: "F-501", customer: "Amara Nwosu", vehicle: "V-1001", vehicleLabel: "2019 Toyota Camry", total: 14500, down: 2000, monthly: 420, term: 30, paid: 18, balance: 5460, lastPayment: "2026-08-01", status: "current" },
  { id: "F-502", customer: "Kwame Boateng", vehicle: "V-1006", vehicleLabel: "2019 Hyundai Elantra", total: 12800, down: 1500, monthly: 380, term: 30, paid: 9, balance: 9380, lastPayment: "2026-06-02", status: "60", daysLate: 68 },
  { id: "F-503", customer: "Chidi Okafor", vehicle: "V-1007", vehicleLabel: "2018 Kia Optima", total: 10500, down: 1000, monthly: 320, term: 30, paid: 14, balance: 6020, lastPayment: "2026-07-12", status: "30", daysLate: 34 },
  { id: "F-504", customer: "Amara Nwosu", vehicle: "V-1009", vehicleLabel: "2019 Mazda 6", total: 13100, down: 1800, monthly: 395, term: 29, paid: 11, balance: 8755, lastPayment: "2026-08-04", status: "current" },
  { id: "F-505", customer: "Marcus Webb", vehicle: "V-1011", vehicleLabel: "2017 Chevrolet Cruze", total: 8900, down: 900, monthly: 275, term: 29, paid: 4, balance: 6800, lastPayment: "2026-04-20", status: "repossessed", daysLate: 117 },
];

export const REVENUE_MONTHLY = [
  { month: "Feb", revenue: 8200, target: 9000 },
  { month: "Mar", revenue: 9600, target: 9000 },
  { month: "Apr", revenue: 7100, target: 9500 },
  { month: "May", revenue: 10400, target: 9500 },
  { month: "Jun", revenue: 11200, target: 10000 },
  { month: "Jul", revenue: 9800, target: 10000 },
  { month: "Aug", revenue: 12600, target: 10500 },
];

export const REVENUE_SPLIT = [
  { name: "Financing", value: 52, color: "#C88A34" },
  { name: "Rentals", value: 28, color: "#3A6B82" },
  { name: "Repairs", value: 20, color: "#5C8A52" },
];

export const RECENT_ACTIVITY = [
  { id: 1, type: "payment", text: "Amara Nwosu made a payment of $420 on 2019 Toyota Camry", time: "2 hours ago" },
  { id: 2, type: "overdue", text: "Kwame Boateng crossed 60 days late. Repossession review triggered.", time: "5 hours ago" },
  { id: 3, type: "repair", text: "2017 Ford Fusion checked in for brake service", time: "1 day ago" },
  { id: 4, type: "rental", text: "2020 Volkswagen Jetta rented to Lin Wei through Aug 22", time: "1 day ago" },
  { id: 5, type: "repo", text: "2017 Chevrolet Cruze marked repossessed. Returned to inventory.", time: "3 days ago" },
];

// Placeholder tables for modules not yet built out (Phase 2/3), kept here
// so pages can import a real (if empty) shape instead of undefined.
// Rental bookings link to a vehicle in the VEHICLES fleet above (category
// "rental"). vehicleId ties the two together so a booking's status can
// keep the vehicle's own status (available_rent / rented) in sync.
export const RENTAL_BOOKINGS = [
  { id: "RB-01", vehicleId: "V-1002", vehicleLabel: "2020 Honda Civic", customer: "Diego Fernandez", startDate: "2026-08-10", endDate: "2026-08-22", dailyRate: 42, status: "active" },
  { id: "RB-02", vehicleId: "V-1008", vehicleLabel: "2020 Volkswagen Jetta", customer: "Lin Wei", startDate: "2026-08-15", endDate: "2026-08-22", dailyRate: 45, status: "active" },
  { id: "RB-03", vehicleId: "V-1004", vehicleLabel: "2021 Nissan Altima", customer: "Amara Nwosu", startDate: "2026-07-01", endDate: "2026-07-10", dailyRate: 48, status: "completed" },
  { id: "RB-04", vehicleId: "V-1012", vehicleLabel: "2021 Toyota Corolla", customer: "Chidi Okafor", startDate: "2026-08-25", endDate: "2026-08-30", dailyRate: 40, status: "upcoming" },
];

// Repair jobs are independent of the vehicle fleet above. Most repair
// customers bring their own car in for service, they aren't renting or
// buying from Eli, so vehicleDescription is just free text rather than a
// link to a VEHICLES entry.
export const REPAIR_JOBS = [
  { id: "RJ-01", customer: "Priya Sharma", vehicleDescription: "2017 Ford Fusion", issue: "Brake service, front pads and rotors", laborCost: 180, partsCost: 140, status: "in_progress", checkedIn: "2026-08-12", completed: null, notes: "Parts ordered, ETA Thursday" },
  { id: "RJ-02", customer: "Marcus Webb", vehicleDescription: "2016 Honda Accord", issue: "Check engine light, misfire cylinder 3", laborCost: 120, partsCost: 60, status: "completed", checkedIn: "2026-08-01", completed: "2026-08-03", notes: "Replaced spark plug and coil" },
  { id: "RJ-03", customer: "Kwame Boateng", vehicleDescription: "2019 Hyundai Elantra", issue: "Oil change and tire rotation", laborCost: 60, partsCost: 35, status: "requested", checkedIn: "2026-08-16", completed: null, notes: "" },
];

export const REVIEWS = [
  { id: 1, name: "Amara Nwosu", country: "Nigeria", rating: 5, car: "2019 Toyota Camry", quote: "Eli walked me through financing step by step when I had zero credit history in the US. Two years later my Camry still runs perfect." },
  { id: 2, name: "Diego Fernandez", country: "Colombia", rating: 5, car: "Rental · 2020 Honda Civic", quote: "Needed a car for a week while mine was in the shop. Eli had me driving within an hour, no paperwork headache." },
  { id: 3, name: "Priya Sharma", country: "India", rating: 5, car: "Brake service", quote: "Every other shop quoted me double. Eli explained exactly what needed fixing and what could wait. That honesty is rare." },
  { id: 4, name: "Lin Wei", country: "China", rating: 5, car: "Rental · 2020 VW Jetta", quote: "As an international student I didn't know who to trust with a car. The whole community sends people to Eli for a reason." },
  { id: 5, name: "Kwame Boateng", country: "Ghana", rating: 4, car: "2019 Hyundai Elantra", quote: "Bought my first car here. Fair price, no pressure, and Eli still remembers my name when I stop by." },
];

// Customer submitted photos for the public gallery. In the real app these
// come from a moderated upload flow (see PhotoUploadModal) into Supabase
// Storage; here they're fake so the gallery has something to show.
export const GALLERY = [
  { id: 1, name: "Amara Nwosu", car: "2019 Toyota Camry", caption: "Picked up my first car in the US today!", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" },
  { id: 2, name: "Kwame Boateng", car: "2019 Hyundai Elantra", caption: "Two years with this car and still going strong.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  { id: 3, name: "Lin Wei", car: "2020 Volkswagen Jetta", caption: "Rental for the week, drove it everywhere.", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&q=80" },
  { id: 4, name: "Chidi Okafor", car: "2018 Kia Optima", caption: "Thank you Eli for making this so easy.", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
  { id: 5, name: "Diego Fernandez", car: "2020 Honda Civic", caption: "Great little rental, will be back.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" },
  { id: 6, name: "Priya Sharma", car: "Brake service", caption: "Fixed same day, honest pricing.", photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80" },
];
