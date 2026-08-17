import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Gauge, Fuel, Calendar } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import { useContent } from "../../lib/contentStore.jsx";
import DealBadge from "../../components/ui/DealBadge.jsx";
import VehicleImage from "../../components/ui/VehicleImage.jsx";
import ConditionReport from "../../components/ui/ConditionReport.jsx";
import FinancingEstimator from "../../components/ui/FinancingEstimator.jsx";
import ScheduleModal from "../../components/ui/ScheduleModal.jsx";

export default function CarDetail() {
  const { id } = useParams();
  const { vehicles } = useContent();
  const vehicle = vehicles.find((v) => v.id === id);
  const [scheduling, setScheduling] = useState(false);

  if (!vehicle) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <p style={{ color: COLORS.textDim }}>Car not found.</p>
        <Link to="/cars" className="text-sm mt-3 inline-block" style={{ color: COLORS.brassLight }}>Back to cars</Link>
      </div>
    );
  }

  const isSale = vehicle.category === "sale";

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 px-8 py-10">
      <Link to="/cars" className="flex items-center gap-1.5 text-xs w-fit" style={{ color: COLORS.textDim }}>
        <ArrowLeft size={14} /> Back to cars
      </Link>

      <VehicleImage
        src={vehicle.photo}
        alt={`${vehicle.make} ${vehicle.model}`}
        className="w-full h-72 object-cover rounded-xl shadow-lg"
        colors={COLORS}
      />

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textFaint }}><Gauge size={13} /> {vehicle.mileage.toLocaleString()} mi</span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textFaint }}><Fuel size={13} /> {vehicle.color}</span>
          </div>
          {isSale && (
            <div className="mt-3">
              <DealBadge price={vehicle.price} marketPrice={vehicle.marketPrice} colors={COLORS} />
            </div>
          )}
        </div>
        <div className="font-mono text-xl font-medium text-right shrink-0" style={{ color: COLORS.brassLight }}>
          {vehicle.category === "rental" ? `$${vehicle.price}/day` : `$${vehicle.price.toLocaleString()}`}
        </div>
      </div>

      {isSale && vehicle.condition && <ConditionReport items={vehicle.condition} colors={COLORS} />}

      {isSale && <FinancingEstimator price={vehicle.price} colors={COLORS} />}

      <div className="flex gap-2">
        <button
          onClick={() => setScheduling(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold flex-1 hover-lift"
          style={{ background: COLORS.brassDim, color: "#FFFFFF" }}
        >
          <Calendar size={15} /> {isSale ? "Schedule a test drive" : "Schedule pickup"}
        </button>
        <Link
          to="/contact"
          className="flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold hover-lift"
          style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
        >
          Ask a question
        </Link>
      </div>

      {scheduling && (
        <ScheduleModal
          title={isSale ? "Schedule a test drive" : "Schedule pickup"}
          vehicleLabel={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          onClose={() => setScheduling(false)}
          colors={COLORS}
        />
      )}
    </div>
  );
}
