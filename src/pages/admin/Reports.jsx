import React, { useState, useMemo } from "react";
import { FileSpreadsheet, Printer, Download } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import { COLORS } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";
import { exportToExcel, exportMultiSheetExcel } from "../../utils/exportUtils.js";

// Default column shapes for each report. Once you hand over your own Excel
// template, these row-mapping functions are the only thing that needs to
// change, everything else (the table, the export button, print) stays the
// same.
function buildReports({ vehicles, customers, financing, rentals, repairs }) {
  return {
    inventory: {
      label: "Inventory",
      columns: ["ID", "Make", "Model", "Year", "VIN", "Mileage", "Color", "Category", "Status", "Price", "Customer"],
      rows: vehicles.map((v) => ({
        ID: v.id,
        Make: v.make,
        Model: v.model,
        Year: v.year,
        VIN: v.vin,
        Mileage: v.mileage,
        Color: v.color,
        Category: v.category,
        Status: v.status.replace(/_/g, " "),
        Price: v.price,
        Customer: v.customer || "",
      })),
    },
    customers: {
      label: "Customers",
      columns: ["ID", "Name", "Country", "Email", "Phone", "Vehicles", "Reliability", "Member Since"],
      rows: customers.map((c) => ({
        ID: c.id,
        Name: c.name,
        Country: c.country,
        Email: c.email,
        Phone: c.phone,
        Vehicles: c.vehicles?.length || 0,
        Reliability: c.reliability,
        "Member Since": c.joined,
      })),
    },
    financing: {
      label: "Financing",
      columns: ["ID", "Customer", "Vehicle", "Total", "Down", "Monthly", "Term", "Paid", "Balance", "Status", "Last Payment"],
      rows: financing.map((f) => ({
        ID: f.id,
        Customer: f.customer,
        Vehicle: f.vehicleLabel,
        Total: f.total,
        Down: f.down,
        Monthly: f.monthly,
        Term: f.term,
        Paid: f.paid,
        Balance: f.balance,
        Status: f.status,
        "Last Payment": f.lastPayment,
      })),
    },
    rentals: {
      label: "Rentals",
      columns: ["ID", "Vehicle", "Customer", "Start Date", "End Date", "Daily Rate", "Status"],
      rows: rentals.map((r) => ({
        ID: r.id,
        Vehicle: r.vehicleLabel,
        Customer: r.customer,
        "Start Date": r.startDate,
        "End Date": r.endDate,
        "Daily Rate": r.dailyRate,
        Status: r.status,
      })),
    },
    repairs: {
      label: "Repairs",
      columns: ["ID", "Customer", "Vehicle", "Issue", "Labor Cost", "Parts Cost", "Status", "Checked In", "Completed"],
      rows: repairs.map((j) => ({
        ID: j.id,
        Customer: j.customer,
        Vehicle: j.vehicleDescription,
        Issue: j.issue,
        "Labor Cost": j.laborCost,
        "Parts Cost": j.partsCost,
        Status: j.status.replace(/_/g, " "),
        "Checked In": j.checkedIn,
        Completed: j.completed || "",
      })),
    },
  };
}

export default function Reports() {
  const content = useContent();
  const [active, setActive] = useState("inventory");
  const reports = useMemo(() => buildReports(content), [content]);
  const report = reports[active];

  const handleExport = () => {
    exportToExcel(report.rows, `elis-autos-${active}-${new Date().toISOString().slice(0, 10)}`, report.label);
  };

  const handleExportAll = () => {
    const sheets = Object.values(reports).map((r) => ({ name: r.label, rows: r.rows }));
    exportMultiSheetExcel(sheets, `elis-autos-full-report-${new Date().toISOString().slice(0, 10)}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3 no-print">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
            Export any dataset to Excel, or print a clean paper copy.
          </p>
        </div>
        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
        >
          <Download size={15} /> Export everything (all sheets)
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-lg w-fit no-print" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        {Object.entries(reports).map(([key, r]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="px-3.5 py-1.5 rounded-md text-xs font-medium"
            style={{
              background: active === key ? COLORS.card : "transparent",
              color: active === key ? COLORS.text : COLORS.textDim,
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 no-print">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: COLORS.brass, color: COLORS.base }}
        >
          <FileSpreadsheet size={15} /> Export {report.label} to Excel
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
        >
          <Printer size={15} /> Print this report
        </button>
      </div>

      <Card className="overflow-hidden print-surface">
        <div className="p-5">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>Eli's Autos — {report.label}</h2>
            <span className="text-[11px]" style={{ color: COLORS.textFaint }}>Generated {new Date().toLocaleDateString()}</span>
          </div>
          <p className="text-xs" style={{ color: COLORS.textFaint }}>{report.rows.length} records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                {report.columns.map((col) => (
                  <th key={col} className="text-left px-4 py-2.5 text-[11px] font-semibold tracking-wide whitespace-nowrap" style={{ color: COLORS.textFaint }}>
                    {col.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {report.rows.length === 0 ? (
                <tr>
                  <td colSpan={report.columns.length} className="px-4 py-8 text-center text-sm" style={{ color: COLORS.textFaint }}>
                    No records yet.
                  </td>
                </tr>
              ) : (
                report.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < report.rows.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                    {report.columns.map((col) => (
                      <td key={col} className="px-4 py-2.5 text-xs whitespace-nowrap" style={{ color: COLORS.text }}>
                        {typeof row[col] === "number" && (col.toLowerCase().includes("price") || col.toLowerCase().includes("cost") || col.toLowerCase().includes("balance") || col.toLowerCase().includes("total") || col.toLowerCase().includes("down") || col.toLowerCase().includes("monthly") || col.toLowerCase().includes("rate"))
                          ? money(row[col])
                          : row[col]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
