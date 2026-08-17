import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Wallet, AlertTriangle, Gauge, ChevronRight, ShieldAlert,
  Wrench, Car, Flag, DollarSign,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import Card from "../../components/ui/Card.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import OverdueLadder from "../../components/ui/OverdueLadder.jsx";
import { COLORS } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { REVENUE_MONTHLY, REVENUE_SPLIT, RECENT_ACTIVITY } from "../../data/fakeData.js";
import { useContent } from "../../lib/contentStore.jsx";

const ACTIVITY_ICON = { payment: Wallet, overdue: ShieldAlert, repair: Wrench, rental: Car, repo: Flag };
const ACTIVITY_COLOR = {
  payment: COLORS.success,
  overdue: COLORS.danger,
  repair: COLORS.petrol,
  rental: COLORS.brass,
  repo: COLORS.danger,
};

export default function Dashboard() {
  const { vehicles, financing } = useContent();
  const totalReceivables = financing.filter((f) => f.status !== "repossessed").reduce((a, f) => a + f.balance, 0);
  const overdue = financing.filter((f) => ["late", "30", "60"].includes(f.status));
  const fleetTotal = vehicles.length;
  const fleetActive = vehicles.filter((v) => ["rented", "sold_financed", "for_sale"].includes(v.status)).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>Overview across sales, rentals, and repairs</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Revenue this month" value={money(12600)} delta="+28.6%" positive icon={TrendingUp} accent={COLORS.brass} />
        <MetricCard label="Outstanding receivables" value={money(totalReceivables)} delta="3 accounts overdue" positive={false} icon={Wallet} accent={COLORS.petrol} />
        <MetricCard label="Overdue accounts" value={overdue.length} delta="1 at 60+ days" positive={false} icon={AlertTriangle} accent={COLORS.danger} />
        <MetricCard label="Fleet utilization" value={`${Math.round((fleetActive / fleetTotal) * 100)}%`} delta="+4pts" positive icon={Gauge} accent={COLORS.success} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Revenue trend</h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textDim }}>
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS.brass }} /> Actual
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textDim }}>
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS.textFaint }} /> Target
              </span>
            </div>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_MONTHLY}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.brass} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={COLORS.brass} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                <XAxis dataKey="month" stroke={COLORS.textFaint} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={COLORS.textFaint} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: COLORS.text }}
                  formatter={(v) => money(v)}
                />
                <Line type="monotone" dataKey="target" stroke={COLORS.textFaint} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Area type="monotone" dataKey="revenue" stroke={COLORS.brass} strokeWidth={2.5} fill="url(#rev)" dot={{ r: 3, fill: COLORS.brass }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-4" style={{ color: COLORS.text }}>Revenue by line</h3>
          <div style={{ height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={REVENUE_SPLIT} dataKey="value" innerRadius={45} outerRadius={65} paddingAngle={3}>
                  {REVENUE_SPLIT.map((s, i) => <Cell key={i} fill={s.color} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {REVENUE_SPLIT.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs" style={{ color: COLORS.textDim }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} /> {s.name}
                </span>
                <span className="font-mono text-xs" style={{ color: COLORS.text }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Accounts needing attention</h3>
            <Link to="/admin/financing" className="flex items-center gap-1 text-xs" style={{ color: COLORS.brassLight }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {overdue.map((f) => (
              <div key={f.id} className="flex items-center gap-4 p-3 rounded-lg" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>{f.customer}</span>
                    <span className="text-xs" style={{ color: COLORS.textFaint }}>{f.vehicleLabel}</span>
                  </div>
                  <div className="mt-2 max-w-xs">
                    <OverdueLadder status={f.status} compact />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-[13.5px] font-medium" style={{ color: COLORS.dangerLight }}>{money(f.balance)}</div>
                  <div className="text-[11.5px]" style={{ color: COLORS.textFaint }}>{f.daysLate} days late</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-[15px] font-semibold mb-4" style={{ color: COLORS.text }}>Recent activity</h3>
          <div className="flex flex-col gap-4">
            {RECENT_ACTIVITY.map((a) => {
              const Icon = ACTIVITY_ICON[a.type] || DollarSign;
              const color = ACTIVITY_COLOR[a.type] || COLORS.brass;
              return (
                <div key={a.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
                    <Icon size={13} color={color} />
                  </div>
                  <div>
                    <p className="text-xs leading-relaxed" style={{ color: COLORS.text }}>{a.text}</p>
                    <span className="text-[11px]" style={{ color: COLORS.textFaint }}>{a.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
