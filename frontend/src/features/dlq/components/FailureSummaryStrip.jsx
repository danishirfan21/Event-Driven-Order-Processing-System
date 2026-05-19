import { AlertTriangle, Gauge } from "lucide-react";

function SummaryItem({ item }) {
  const colors = {
    red: "text-red-400",
    amber: "text-amber-400",
    slate: "text-slate-300",
  };

  if (item.compact) {
    const Icon = item.tone === "red" ? AlertTriangle : Gauge;
    return (
      <div className="flex min-h-[112px] gap-4 border-l border-slate-700/60 px-8 first:border-l-0">
        <Icon className={`mt-8 h-7 w-7 ${colors[item.tone]}`} />
        <div className="py-6">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{item.label}</div>
          <div className="mt-4 max-w-[240px] text-sm leading-6 text-white">{item.value}</div>
          <div className="mt-3 text-sm text-slate-400">{item.sub}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[112px] border-l border-slate-700/60 px-8 py-6 first:border-l-0">
      <div className={`text-xs font-medium uppercase tracking-wide ${colors[item.tone]}`}>{item.label}</div>
      <div className={`mt-4 text-3xl font-semibold ${colors[item.tone]}`}>{item.value}</div>
      <div className="mt-2 text-sm text-slate-300">{item.detail}</div>
      <div className="mt-1 text-sm text-slate-400">{item.sub}</div>
    </div>
  );
}

export function FailureSummaryStrip({ items }) {
  return (
    <section className="mb-5 grid grid-cols-4 overflow-hidden rounded-lg border border-slate-700/65 bg-[#071421]/82">
      {items.map((item) => (
        <SummaryItem key={item.label} item={item} />
      ))}
    </section>
  );
}
