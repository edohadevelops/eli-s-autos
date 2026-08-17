import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Wallet, Gauge, AlertTriangle, TrendingUp } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import { COLORS } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";

export default function Analytics() {
  const { vehicles, financing, rentals, repairs } = useContent();

  // Revenue collected to date, by line. Financing revenue is derived from
  // (total price - remaining balance) per account, which is exactly what's
  // been paid so far. Rental and repair revenue count completed and active
  // bookings/jobs. This is real, computed from live data, not fake numbers,
  // though it reflects everything collected to date rather than a specific
  // month, since payments aren't timestamped historically yet.
  const financingRevenue = financing.reduce((sum, f) => sum + (f.total - f.balance), 0);
  const rentalRevenue = rentals
    .filter((r) => r.status !== "upcoming")
    .reduce((sum, r) => {
      const days = Math.max(1, Math.round((new Date(r.endDate) - new Date(r.startDate)) / 86400000));
      return sum + days * r.dailyRate;
    }, 0);
  const repairRevenue = repairs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + j.laborCost + j.partsCost, 0);
  const totalRevenue = financingRevenue + rentalRevenue + repairRevenue;

  const revenueSplit = [
    { name: "Financing", value: financingRevenue, color: COLORS.brass },
    { name: "Rentals", value: rentalRevenue, color: COLORS.petrol },
    { name: "Repairs", value: repairRevenue, color: COLORS.success },
  ].filter((s) => s.value > 0);

  const totalReceivables = financing.filter((f) => f.status !== "repossessed").reduce((a, f) => a + f.balance, 0);
  const overdueCount = financing.filter((f) => ["late", "30", "60"].includes(f.status)).length;
  const repossessedCount = financing.filter((f) => f.status === "repossessed").length;

  const fleetByStatus = [
    { status: "For sale", count: vehicles.filter((v) => v.status === "for_sale").length },
    { status: "Sold", count: vehicles.filter((v) => v.status === "sold_financed").length },
    { status: "Rented", count: vehicles.filter((v) => v.status === "rented").length },
    { status: "Available rent", count: vehicles.filter((v) => v.status === "available_rent").length },
    { status: "In repair", count: vehicles.filter((v) => v.status === "in_repair").length },
    { status: "Repossessed", count: vehicles.filter((v) => v.status === "repossessed").length },
  ].filter((s) => s.count > 0);

  const fleetActive = vehicles.filter((v) => ["rented", "sold_financed", "for_sale"].includes(v.status)).length;
  const utilization = vehicles.length ? Math.round((fleetActive / vehicles.length) * 100) : 0;

  const repairsByStatus = ["requested", "in_progress", "waiting_parts", "completed"].map((status) => ({
    status: status.replace("_", " "),
    count: repairs.filter((j) => j.status === status).length,
  })).filter((s) => s.count > 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Analytics</h1>
        <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
          Computed live from your inventory, financing, rentals, and repairs data.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Revenue collected to date" value={money(totalRevenue)} icon={TrendingUp} accent={COLORS.brass} />
        <MetricCard label="Outstanding receivables" value={money(totalReceivables)} icon={Wallet} accent={COLORS.petrol} />
        <MetricCard label="Overdue accounts" value={overdueCount} icon={AlertTriangle} accent={COLORS.warn} />
        <MetricCard label="Fleet utilization" value={`${utilization}%`} icon={Gauge} accent={COLORS.success} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-4" style={{ color: COLORS.text }}>Revenue by line</h3>
          {revenueSplit.length === 0 ? (
            <p className="text-sm" style={{ color: COLORS.textFaint }}>No revenue recorded yet.</p>
          ) : (
            <>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueSplit} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                      {revenueSplit.map((s, i) => <Cell key={i} fill={s.color} stroke="none" />)}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }}
                      formatter={(v) => money(v)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {revenueSplit.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs" style={{ color: COLORS.textDim }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} /> {s.name}
                    </span>
                    <span className="font-mono text-xs" style={{ color: COLORS.text }}>{money(s.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-4" style={{ color: COLORS.text }}>Fleet by status</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetByStatus} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                <XAxis type="number" stroke={COLORS.textFaint} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="status" stroke={COLORS.textFaint} fontSize={11} tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill={COLORS.brass} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-1" style={{ color: COLORS.text }}>Financing health</h3>
          <p className="text-xs mb-3" style={{ color: COLORS.textFaint }}>{financing.length} accounts total</p>
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between"><span style={{ color: COLORS.textDim }}>Current</span><span style={{ color: COLORS.text }}>{financing.filter((f) => f.status === "current").length}</span></div>
            <div className="flex justify-between"><span style={{ color: COLORS.textDim }}>Overdue</span><span style={{ color: COLORS.warn }}>{overdueCount}</span></div>
            <div className="flex justify-between"><span style={{ color: COLORS.textDim }}>Repossessed</span><span style={{ color: COLORS.dangerLight }}>{repossessedCount}</span></div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-1" style={{ color: COLORS.text }}>Rentals</h3>
          <p className="text-xs mb-3" style={{ color: COLORS.textFaint }}>{rentals.length} bookings total</p>
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between"><span style={{ color: COLORS.textDim }}>Active</span><span style={{ color: COLORS.text }}>{rentals.filter((r) => r.status === "active").length}</span></div>
            <div className="flex justify-between"><span style={{ color: COLORS.textDim }}>Upcoming</span><span style={{ color: COLORS.text }}>{rentals.filter((r) => r.status === "upcoming").length}</span></div>
            <div className="flex justify-between"><span style={{ color: COLORS.textDim }}>Completed</span><span style={{ color: COLORS.text }}>{rentals.filter((r) => r.status === "completed").length}</span></div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-1" style={{ color: COLORS.text }}>Repairs</h3>
          <p className="text-xs mb-3" style={{ color: COLORS.textFaint }}>{repairs.length} jobs total</p>
          <div className="flex flex-col gap-1.5 text-xs">
            {repairsByStatus.map((r) => (
              <div key={r.status} className="flex justify-between capitalize">
                <span style={{ color: COLORS.textDim }}>{r.status}</span>
                <span style={{ color: COLORS.text }}>{r.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <p className="text-[11px]" style={{ color: COLORS.textFaint }}>
          This reflects everything recorded to date. Week-over-week and month-over-month trend lines need payment history
          with real timestamps, which arrives with the Supabase migration. Right now every number here is live and real,
          just not yet broken out by time period.
        </p>
      </Card>
    </div>
  );
}
