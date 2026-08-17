import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Car, Users, Wallet, Calendar, Wrench, Star, Camera,
  BarChart3, FileSpreadsheet, Settings, ShieldAlert, HelpCircle,
} from "lucide-react";
import { COLORS } from "../../utils/constants.js";
import { useContent } from "../../lib/contentStore.jsx";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/inventory", label: "Inventory", icon: Car },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/financing", label: "Financing & collections", icon: Wallet, flag: "overdue" },
  { to: "/admin/rentals", label: "Rentals", icon: Calendar },
  { to: "/admin/repairs", label: "Repairs", icon: Wrench, flag: "repairs" },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/gallery", label: "Gallery", icon: Camera, flag: "gallery" },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/reports", label: "Reports", icon: FileSpreadsheet },
  { to: "/admin/workflow", label: "How it works", icon: HelpCircle },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { financing, gallery, repairs } = useContent();
  const overdueCount = financing.filter((f) => ["late", "30", "60"].includes(f.status)).length;
  const pendingGalleryCount = gallery.filter((g) => g.status === "pending").length;
  const requestedRepairsCount = repairs.filter((j) => j.status === "requested").length;
  const flagCounts = { overdue: overdueCount, gallery: pendingGalleryCount, repairs: requestedRepairsCount };

  return (
    <div
      className="w-60 shrink-0 h-full flex flex-col p-4 no-print"
      style={{
        background: `linear-gradient(180deg, #171923 0%, ${COLORS.surface} 100%)`,
        borderRight: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="flex items-center gap-2.5 px-2 mb-8 mt-1">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `linear-gradient(135deg, ${COLORS.brassLight} 0%, ${COLORS.brass} 100%)`, boxShadow: `0 4px 14px ${COLORS.brass}44` }}
        >
          <Car size={18} color={COLORS.base} strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-display font-semibold text-base tracking-wide" style={{ color: COLORS.text }}>
            ELI'S AUTOS
          </div>
          <div className="text-[10.5px] tracking-wide" style={{ color: COLORS.textFaint }}>
            OPERATIONS
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {NAV.map((n) => {
          const Icon = n.icon;
          return (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors overflow-hidden ${
                  isActive ? "border border-border" : "border border-transparent"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: `linear-gradient(90deg, ${COLORS.brass}1F 0%, ${COLORS.cardHover} 100%)` }
                  : {}
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r" style={{ background: COLORS.brass }} />
                  )}
                  <Icon size={17} color={isActive ? COLORS.brassLight : COLORS.textDim} strokeWidth={2} />
                  <span
                    className="text-[13.5px]"
                    style={{ fontWeight: isActive ? 600 : 500, color: isActive ? COLORS.text : COLORS.textDim }}
                  >
                    {n.label}
                  </span>
                  {n.flag && flagCounts[n.flag] > 0 && (
                    <span
                      className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${COLORS.danger}33`, color: COLORS.dangerLight }}
                    >
                      {flagCounts[n.flag]}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto">
        <div
          className="rounded-xl p-3.5"
          style={{ background: `linear-gradient(180deg, #20222E 0%, ${COLORS.card} 100%)`, border: `1px solid ${COLORS.border}` }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldAlert size={14} color={COLORS.brassLight} />
            <span className="text-xs font-semibold" style={{ color: COLORS.text }}>
              Demo mode
            </span>
          </div>
          <p className="text-[11.5px] leading-relaxed" style={{ color: COLORS.textFaint }}>
            Content edits save to this browser only. Auth, payments, and shared storage move to a real backend next phase.
          </p>
        </div>
      </div>
    </div>
  );
}
