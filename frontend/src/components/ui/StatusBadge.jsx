const statusStyles = {
  RESERVED: "border-emerald-400/20 bg-emerald-500/10 text-emerald-400",
  FAILED: "border-red-400/20 bg-red-500/10 text-red-400",
  SHIPPING_PREPARATION_STARTED: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  SHIPPING_PREPARED: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  INVENTORY_CHECK_STARTED: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  RETRYING_SHIPPING: "border-amber-400/20 bg-amber-500/10 text-amber-400",
  FAILURE_HANDLED: "border-red-400/20 bg-red-500/10 text-red-400",
  DEAD_LETTERED: "border-purple-400/20 bg-purple-500/10 text-purple-300",
};

export function StatusBadge({ value, variant = "status" }) {
  const stageReserved = "border-cyan-400/20 bg-cyan-500/10 text-cyan-300";
  const className = value === "RESERVED" && variant === "stage" ? stageReserved : statusStyles[value] || statusStyles.RESERVED;

  return (
    <span className={`inline-flex rounded px-3 py-1 text-xs font-semibold tracking-wide ${className}`}>
      {value}
    </span>
  );
}
