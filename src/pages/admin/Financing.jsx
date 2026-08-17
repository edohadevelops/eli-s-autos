import React, { useState } from "react";
import { Wallet, AlertTriangle, Flag, ChevronRight, X, ShieldAlert } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import OverdueLadder from "../../components/ui/OverdueLadder.jsx";
import Modal from "../../components/ui/Modal.jsx";
import LoadingButton from "../../components/ui/LoadingButton.jsx";
import { COLORS, PAYMENT_LADDER, LADDER_META } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";

export default function Financing() {
  const { financing, logPayment } = useContent();
  const [selectedId, setSelectedId] = useState(null);
  const selected = financing.find((f) => f.id === selectedId) || null;

  const totalReceivables = financing.filter((f) => f.status !== "repossessed").reduce((a, f) => a + f.balance, 0);
  const atRisk = financing.filter((f) => ["30", "60"].includes(f.status)).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Financing & collections</h1>
        <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
          Every financed sale, its payment ledger, and where it sits on the overdue ladder
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Total receivables" value={money(totalReceivables)} icon={Wallet} accent={COLORS.petrol} />
        <MetricCard label="Accounts at risk" value={atRisk} delta="30+ days late" positive={false} icon={AlertTriangle} accent={COLORS.warn} />
        <MetricCard label="Repossessed this year" value={financing.filter((f) => f.status === "repossessed").length} icon={Flag} accent={COLORS.danger} />
      </div>

      <Card className="p-5">
        <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Repossession policy</h3>
        <p className="text-xs mb-4 mt-1" style={{ color: COLORS.textDim }}>
          Accounts move automatically along this track based on days since last payment.
        </p>
        <div className="flex items-center gap-2">
          {PAYMENT_LADDER.map((step, i) => {
            const meta = LADDER_META[step];
            const days = ["0", "1–14", "15–29", "30–59", "60+"][i];
            return (
              <div key={step} className="flex-1 flex flex-col items-center gap-2 p-3 rounded-lg" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
                <span className="text-xs font-semibold" style={{ color: COLORS.text }}>{meta.label}</span>
                <span className="font-mono text-[10.5px]" style={{ color: COLORS.textFaint }}>{days} days</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-5 pb-0">
          <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>All financing accounts</h3>
        </div>
        <div className="flex flex-col gap-3 p-5">
          {financing.map((f) => (
            <div
              key={f.id}
              onClick={() => setSelectedId(f.id)}
              className="flex items-center gap-5 p-4 rounded-lg cursor-pointer hover:opacity-95"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
            >
              <div className="w-40 shrink-0">
                <div className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>{f.customer}</div>
                <div className="text-[11.5px]" style={{ color: COLORS.textFaint }}>{f.vehicleLabel}</div>
              </div>
              <div className="flex-1">
                <OverdueLadder status={f.status} />
              </div>
              <div className="w-24 text-right shrink-0">
                <div className="font-mono text-[13px] font-medium" style={{ color: COLORS.text }}>{money(f.balance)}</div>
                <div className="text-[11px]" style={{ color: COLORS.textFaint }}>owed</div>
              </div>
              <div className="w-20 text-right shrink-0">
                <div className="font-mono text-[13px]" style={{ color: COLORS.textDim }}>{f.paid}/{f.term}</div>
                <div className="text-[11px]" style={{ color: COLORS.textFaint }}>payments</div>
              </div>
              <ChevronRight size={16} color={COLORS.textFaint} />
            </div>
          ))}
        </div>
      </Card>

      {selected && (
        <FinancingModal record={selected} onClose={() => setSelectedId(null)} onLogPayment={(amount) => logPayment(selected.id, amount)} />
      )}
    </div>
  );
}

function FinancingModal({ record, onClose, onLogPayment }) {
  const isRisk = ["30", "60"].includes(record.status);
  const isRepo = record.status === "repossessed";
  const [loggingPayment, setLoggingPayment] = useState(false);
  const [sendingNotice, setSendingNotice] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(record.monthly);
  const [amountError, setAmountError] = useState("");

  const handleLogPayment = () => {
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) {
      setAmountError("Enter a payment amount greater than $0.");
      return;
    }
    setAmountError("");
    setLoggingPayment(true);
    setTimeout(() => {
      onLogPayment(amount);
      setLoggingPayment(false);
      setConfirmation(`Payment of ${money(amount)} logged. Balance updated.`);
    }, 900);
  };

  const handleSendNotice = () => {
    setSendingNotice(true);
    // TODO: replace with a real email/SMS send once the backend exists
    setTimeout(() => {
      setSendingNotice(false);
      setConfirmation("Notice sent to the customer.");
    }, 900);
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>{record.customer}</div>
            <div className="text-xs" style={{ color: COLORS.textFaint }}>{record.vehicleLabel}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>

        <div className="my-5">
          <OverdueLadder status={record.status} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg" style={{ background: COLORS.surface }}>
            <div className="text-[11px]" style={{ color: COLORS.textFaint }}>Balance owed</div>
            <div className="font-mono text-[15px] font-medium" style={{ color: COLORS.dangerLight }}>{money(record.balance)}</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: COLORS.surface }}>
            <div className="text-[11px]" style={{ color: COLORS.textFaint }}>Monthly</div>
            <div className="font-mono text-[15px] font-medium" style={{ color: COLORS.text }}>{money(record.monthly)}</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: COLORS.surface }}>
            <div className="text-[11px]" style={{ color: COLORS.textFaint }}>Last payment</div>
            <div className="text-[13px] font-medium" style={{ color: COLORS.text }}>{record.lastPayment}</div>
          </div>
        </div>

        {isRisk && (
          <div className="mt-4 p-3.5 rounded-lg flex items-start gap-3" style={{ background: `${COLORS.warn}18`, border: `1px solid ${COLORS.warn}55` }}>
            <ShieldAlert size={16} color={COLORS.warn} className="mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold" style={{ color: COLORS.text }}>{record.daysLate} days since last payment</div>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: COLORS.textDim }}>
                {record.status === "60"
                  ? "Past the 60-day threshold. Repossession review is required before further action."
                  : "Approaching the 60-day repossession threshold. A notice is recommended now."}
              </p>
            </div>
          </div>
        )}

        {isRepo && (
          <div className="mt-4 p-3.5 rounded-lg flex items-start gap-3" style={{ background: `${COLORS.danger}18`, border: `1px solid ${COLORS.danger}55` }}>
            <Flag size={16} color={COLORS.danger} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed" style={{ color: COLORS.text }}>
              Vehicle repossessed after {record.daysLate} days of non-payment. Returned to inventory as available for resale.
            </p>
          </div>
        )}

        {confirmation && (
          <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: `${COLORS.success}18`, border: `1px solid ${COLORS.success}55`, color: COLORS.text }}>
            {confirmation}
          </div>
        )}

        {!isRepo && (
          <div className="mt-4">
            <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>Payment amount</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
              />
              <button
                type="button"
                onClick={() => setPaymentAmount(record.monthly)}
                className="px-3 py-2 rounded-lg text-xs font-medium shrink-0"
                style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
              >
                Full monthly
              </button>
              <button
                type="button"
                onClick={() => setPaymentAmount(record.balance)}
                className="px-3 py-2 rounded-lg text-xs font-medium shrink-0"
                style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
              >
                Pay off balance
              </button>
            </div>
            {amountError && <span className="text-xs mt-1 block" style={{ color: COLORS.dangerLight }}>{amountError}</span>}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <LoadingButton
            loading={loggingPayment}
            onClick={handleLogPayment}
            disabled={isRepo}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold"
            style={{ background: COLORS.brass, color: COLORS.base, opacity: isRepo ? 0.5 : 1 }}
          >
            Log payment
          </LoadingButton>
          <LoadingButton
            loading={sendingNotice}
            onClick={handleSendNotice}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          >
            Send notice
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
