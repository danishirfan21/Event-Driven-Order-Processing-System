import { ExternalLink, RotateCcw, X } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

function InfoRow({ label, value, danger }) {
  return (
    <div className="grid grid-cols-[105px_1fr] gap-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className={danger ? "text-red-400" : "text-slate-200"}>{value}</span>
    </div>
  );
}

function TimelineItem({ item, last }) {
  const [title, stage, time, message, badge, tone] = item;
  const colors = {
    red: "border-red-400 text-red-400 bg-red-500/10",
    amber: "border-amber-400 text-amber-400 bg-amber-500/10",
    cyan: "border-sky-400 text-sky-400 bg-sky-500/10",
  };

  return (
    <div className="relative flex gap-4 pb-7 last:pb-0">
      {!last && <div className="absolute left-[11px] top-7 h-full w-px bg-slate-600" />}
      <div className={`z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${colors[tone]}`}>{tone === "red" ? "x" : tone === "amber" ? "!" : "o"}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-4">
          <div className="font-medium text-white">{title}</div>
          <div className="h-px flex-1 bg-slate-700" />
          <span className={`rounded border px-3 py-1 text-xs ${colors[tone]}`}>{badge}</span>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          <span className={tone === "cyan" ? "text-sky-400" : "text-slate-400"}>{stage}</span>
          <span className="mx-3">-</span>
          {time}
        </div>
        <div className="mt-3 text-sm text-slate-300">{message}</div>
      </div>
    </div>
  );
}

export function FailureDetailsPanel({ timeline }) {
  return (
    <aside className="space-y-3 border-l border-slate-800/80 p-5">
      <Panel className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-medium text-white">ORD-3a91d0f4</h2>
            <span className="rounded border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">DEAD_LETTERED</span>
          </div>
          <X className="h-5 w-5 text-slate-400" />
        </div>
        <div className="rounded-md border border-slate-700/60 bg-[#071421]/80 p-4">
          <h3 className="mb-5 font-medium text-white">Summary</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <InfoRow label="Product ID" value="PROD-fail-shipping-101" />
            <InfoRow label="Max Retries" value="3" />
            <InfoRow label="Quantity" value="2" />
            <InfoRow label="DLQ Routed" value="Yes" danger />
            <InfoRow label="Current Stage" value="DEAD_LETTERED" danger />
            <InfoRow label="Last Event" value="DeadLetteredEvent" />
            <InfoRow label="Retry Count" value="3 / 3" />
            <InfoRow label="Updated At" value="2025-05-20 10:14:32" />
          </div>
        </div>
      </Panel>

      <Panel className="border-red-500/80 bg-red-950/10 p-5">
        <div className="flex items-start gap-4">
          <RotateCcw className="mt-1 h-6 w-6 text-red-400" />
          <div className="flex-1">
            <h3 className="font-medium text-white">Shipping failed after max retries exhausted</h3>
            <div className="mt-5 text-sm text-slate-400">Last Error Message</div>
            <pre className="mt-2 whitespace-pre-wrap rounded-md border border-slate-700/70 bg-slate-950/35 p-4 font-mono text-xs leading-5 text-slate-300">Shipping service returned 500 INTERNAL_SERVER_ERROR after 3 retry attempts for order ORD-3a91d0f4. Product: PROD-fail-shipping-101, Quantity: 2</pre>
            <div className="mt-4 text-sm text-slate-400">Last Event Name</div>
            <div className="mt-2 text-sm text-white">DeadLetteredEvent</div>
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <h3 className="mb-6 font-medium text-white">Retry Timeline</h3>
        {timeline.map((item, index) => (
          <TimelineItem key={item[0]} item={item} last={index === timeline.length - 1} />
        ))}
      </Panel>

      <Panel className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">Related</h3>
            <p className="mt-2 text-sm text-slate-400">View full event history for this order</p>
          </div>
          <button className="flex h-10 items-center gap-3 rounded-md bg-slate-800/60 px-4 text-sm text-cyan-300">
            Open Event History <ExternalLink className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </Panel>
    </aside>
  );
}
