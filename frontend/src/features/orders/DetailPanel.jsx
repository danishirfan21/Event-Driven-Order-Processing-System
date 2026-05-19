import { Copy, X } from "lucide-react";
import { Panel } from "../../components/ui/Panel.jsx";
import { StatusBadge } from "../../components/ui/StatusBadge.jsx";
import { recentEvents } from "../../data/orders.js";

function InfoRow({ label, value }) {
  return (
    <div className="mb-4 grid grid-cols-[120px_1fr] items-center last:mb-0">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-sm text-slate-200">{value}</div>
    </div>
  );
}

export function DetailPanel() {
  return (
    <aside className="sticky top-[76px] h-[calc(100vh-76px)] w-full overflow-y-auto border-l border-slate-700/55 bg-[#071421]/95 p-5 shadow-[-18px_0_70px_rgba(0,0,0,.28)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-medium text-white">ORD-8f3a7c2e</h2>
          <Copy className="h-4 w-4 text-slate-400" />
        </div>
        <X className="h-5 w-5 text-slate-400" />
      </div>
      <div className="mt-7 flex gap-10 border-b border-slate-700/55">
        <button className="border-b border-cyan-400 pb-4 text-sm text-cyan-300">Summary</button>
        <button className="pb-4 text-sm text-slate-400">Events</button>
      </div>

      <Panel className="mt-5 p-4">
        <h3 className="mb-5 text-sm font-medium text-white">Order Summary</h3>
        <InfoRow label="Product ID" value="PROD-2178" />
        <InfoRow label="Quantity" value="2" />
        <InfoRow label="Business Status" value={<StatusBadge value="RESERVED" />} />
      </Panel>

      <Panel className="mt-3 p-4">
        <h3 className="mb-5 text-sm font-medium text-white">Workflow Details</h3>
        <InfoRow label="Current Stage" value={<StatusBadge value="SHIPPING_PREPARATION_STARTED" variant="stage" />} />
        <InfoRow label="Retry Count" value="0 / 3" />
        <InfoRow label="Max Retries" value="3" />
        <InfoRow label="DLQ Routed" value={<span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> No</span>} />
        <InfoRow label="Latest Error" value="-" />
        <InfoRow label="Latest Event" value="Shipping preparation started" />
      </Panel>

      <Panel className="mt-3 p-4">
        <h3 className="mb-5 text-sm font-medium text-white">Recent Events</h3>
        <div className="relative space-y-0">
          <div className="absolute left-[13px] top-8 h-[224px] w-px bg-slate-600/70" />
          {recentEvents.map(([title, body, time, Icon], idx) => (
            <div key={title} className="relative flex gap-4 pb-6 last:pb-0">
              <div className={`z-10 grid h-7 w-7 place-items-center rounded-full border bg-[#071421] ${idx === 1 ? "border-emerald-400 text-emerald-400" : "border-cyan-400 text-cyan-300"}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className={`text-xs font-semibold ${idx === 1 ? "text-emerald-400" : "text-cyan-300"}`}>{title}</div>
                <div className="mt-1 text-xs text-slate-300">{body}</div>
                <div className="mt-2 text-xs text-slate-400">{time}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </aside>
  );
}
