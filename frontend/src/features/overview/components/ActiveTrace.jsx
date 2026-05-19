import { ChevronRight, Copy, Truck } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

function TraceItem({ label, value, sub, large, copy, icon: Icon }) {
  return (
    <div>
      <div className="mb-2 text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`flex items-center gap-3 ${large ? "text-xl text-cyan-300" : "text-sm text-slate-200"}`}>
        {Icon && <Icon className="h-6 w-6 text-cyan-300" />}
        {value}
        {copy && <Copy className="h-4 w-4 text-slate-400" />}
      </div>
      {sub && <div className="mt-2 whitespace-pre-line pl-9 text-sm leading-6 text-slate-400">{sub}</div>}
    </div>
  );
}

export function ActiveTrace() {
  return (
    <Panel className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Active Trace</h3>
        <span className="flex items-center gap-2 text-xs uppercase text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live
        </span>
      </div>
      <div className="mt-8 space-y-6 border-b border-slate-700/50 pb-6">
        <TraceItem label="Order ID" value="ORD-8f3a7c2e" large copy />
        <TraceItem label="Current Stage" value="Shipping" sub={"OrderShipped\na few seconds ago"} icon={Truck} large />
        <TraceItem label="Started" value="2m 14s ago" />
        <TraceItem label="Triggered By" value="Order API" />
        <TraceItem label="Event ID" value="01HV9ZK8X4J8X7Y9T5N4" />
      </div>
      <button className="mt-4 flex h-11 w-full items-center justify-between rounded-md bg-slate-800/65 px-4 text-sm text-slate-200 hover:bg-slate-800">
        View Full Trace <ChevronRight className="h-4 w-4" />
      </button>
    </Panel>
  );
}
