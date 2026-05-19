import { ChevronDown } from "lucide-react";

export function RuntimePill() {
  return (
    <div className="flex h-12 min-w-[214px] items-center justify-between rounded-lg border border-slate-700/60 bg-slate-950/40 px-4">
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.9)]" />
          Runtime Mode
        </div>
        <div className="mt-1 text-sm font-medium uppercase text-cyan-300">Apache Kafka</div>
      </div>
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </div>
  );
}
