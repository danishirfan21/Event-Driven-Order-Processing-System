import React from "react";
import { Activity, Box, CheckCircle2, CircleAlert, Filter, LockKeyhole, RotateCcw, Truck } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

function MiniStepIcon({ type, color }) {
  const map = { globe: Activity, box: Box, lock: LockKeyhole, truck: Truck, alert: CircleAlert, check: CheckCircle2, retry: RotateCcw };
  const Icon = map[type] || Activity;
  const tone = {
    cyan: "border-cyan-400 text-cyan-300",
    green: "border-emerald-400 text-emerald-400",
    red: "border-red-400 text-red-400",
    amber: "border-amber-400 text-amber-400",
  }[color];

  return (
    <div className={`grid h-7 w-7 place-items-center rounded-full border ${tone} bg-slate-950 shadow-lg`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

const rows = [
  { id: "ORD-8f3a7c2e", events: "6 events", steps: [["OrderCreated", "2m 14s", "globe", "cyan"], ["InventoryChecked", "2m 13s", "box", "cyan"], ["InventoryReserved", "2m 12s", "lock", "green"], ["OrderShipped", "2m 11s", "truck", "green"]] },
  { id: "ORD-7c1b9e21", events: "5 events", steps: [["OrderCreated", "5m 32s", "globe", "cyan"], ["InventoryChecked", "5m 31s", "box", "cyan"], ["InventoryReserved", "5m 30s", "lock", "green"], ["Failed", "5m 29s", "alert", "red"], ["FailureHandled", "5m 27s", "check", "green"]] },
  { id: "ORD-3a91d0f4", events: "7 events", steps: [["OrderCreated", "7m 48s", "globe", "cyan"], ["InventoryChecked", "7m 47s", "box", "cyan"], ["InventoryReserved", "7m 46s", "lock", "green"], ["OrderShipped", "7m 45s", "truck", "green"], ["Retrying", "7m 43s", "retry", "amber"], ["OrderShipped", "7m 41s", "truck", "green"]] },
];

export function EventTimeline() {
  return (
    <Panel className="p-5 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between border-b border-slate-700/40 pb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Event Timeline</h3>
          <span className="text-xs text-slate-400">Grouped by Order ID</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Live</span>
          <Filter className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-[120px_1fr] items-center border-b border-slate-700/35 pb-5 last:border-b-0 last:pb-0">
            <div>
              <div className="font-medium text-cyan-300">{row.id}</div>
              <div className="mt-2 text-xs text-slate-400">{row.events}</div>
            </div>
            <div className="flex flex-1 items-center overflow-x-auto pb-2 scrollbar-thin">
              {row.steps.map((step, index) => (
                <React.Fragment key={`${row.id}-${step[0]}-${index}`}>
                  <div className="w-[110px] shrink-0 text-center">
                    <div className="mx-auto w-fit"><MiniStepIcon type={step[2]} color={step[3]} /></div>
                    <div className={`mt-2 text-[10px] whitespace-nowrap ${step[3] === "red" ? "text-red-400" : step[3] === "amber" ? "text-amber-400" : "text-slate-300"}`}>{step[0]}</div>
                    <div className="mt-1 text-[10px] text-slate-400">{step[1]}</div>
                  </div>
                  {index < row.steps.length - 1 && <div className="h-px min-w-[24px] flex-1 bg-slate-500/70" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
