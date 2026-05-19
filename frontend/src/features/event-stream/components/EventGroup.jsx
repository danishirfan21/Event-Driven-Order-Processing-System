import { ChevronUp } from "lucide-react";

const statusStyles = {
  green: "border-emerald-400/20 bg-emerald-500/10 text-emerald-400",
  amber: "border-amber-400/20 bg-amber-500/10 text-amber-400",
  red: "border-red-400/20 bg-red-500/10 text-red-400",
};

const severityStyles = {
  INFO: {
    dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]",
    text: "text-slate-300",
    stage: "text-sky-400",
  },
  WARN: {
    dot: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,.8)]",
    text: "text-amber-400",
    stage: "text-amber-400",
  },
  ERROR: {
    dot: "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,.8)]",
    text: "text-red-400",
    stage: "text-red-400",
  },
};

function AttemptCell({ value, severity }) {
  if (value === "-") {
    return <span className="text-slate-400">-</span>;
  }

  const tone = severity === "ERROR" ? "border-red-500/60 bg-red-500/10 text-red-400" : "border-amber-500/50 bg-amber-500/10 text-amber-400";

  return (
    <span className={`inline-grid h-6 min-w-7 place-items-center rounded border px-2 text-xs ${tone}`}>
      {value}
    </span>
  );
}

export function EventGroup({ order }) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-700/65 bg-[#071421]/82 shadow-[0_18px_55px_rgba(0,0,0,.2)]">
      <header className="flex h-12 items-center border-b border-slate-700/45 bg-slate-800/25 px-4">
        <div className="text-lg font-medium text-white">{order.orderId}</div>
        <span className="ml-4 rounded-md border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs text-slate-300">{order.eventCount}</span>
        <span className={`ml-3 rounded-md border px-3 py-1 text-xs font-semibold ${statusStyles[order.statusTone]}`}>{order.status}</span>
        <div className="ml-auto text-sm text-slate-400">
          {order.window} <span className="ml-2">({order.duration})</span>
        </div>
        <ChevronUp className="ml-6 h-5 w-5 text-slate-300" />
      </header>

      <div className="relative py-2">
        <div className="absolute bottom-5 left-[23px] top-5 w-px bg-cyan-400/45" />
        {order.events.map(([time, severity, eventName, stage, message, attempt, dlq]) => {
          const styles = severityStyles[severity];
          return (
            <div key={`${order.orderId}-${time}-${eventName}`} className="relative grid min-h-9 grid-cols-[32px_108px_72px_220px_1fr_265px_58px_46px] items-center px-4 text-sm">
              <span className={`relative z-10 h-2.5 w-2.5 rounded-full ${styles.dot}`} />
              <span className="text-slate-400">{time}</span>
              <span className={`flex items-center gap-2 ${styles.text}`}>
                {severity === "WARN" && <span className="text-amber-400">!</span>}
                {severity}
              </span>
              <span className="text-slate-200">{eventName}</span>
              <span className={`text-xs ${styles.stage}`}>{stage}</span>
              <span className="text-slate-400">{message}</span>
              <span className="text-center"><AttemptCell value={attempt} severity={severity} /></span>
              <span className={dlq === "Yes" ? "text-red-400" : "text-slate-300"}>{dlq}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
