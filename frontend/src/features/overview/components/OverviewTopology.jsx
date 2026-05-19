import { Activity, Box, CheckCircle2, CircleAlert, Expand, LockKeyhole, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

function TopologyNode({ x, y, title, sub, icon: Icon, tone = "cyan", muted = false }) {
  const toneClass = {
    cyan: "border-cyan-400/90 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,.15)]",
    red: "border-slate-500/60 text-red-400",
    green: "border-slate-500/60 text-emerald-400",
    amber: "border-amber-400/90 text-amber-400 shadow-[0_0_22px_rgba(245,158,11,.15)]",
  }[tone];

  return (
    <div
      className={`absolute flex h-[62px] w-[180px] items-center gap-4 rounded-md border bg-[#071420]/95 px-4 ${toneClass} ${muted ? "opacity-75" : ""}`}
      style={{ left: x, top: y }}
    >
      <Icon className="h-8 w-8 shrink-0" />
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-xs text-slate-400">{sub}</div>
      </div>
    </div>
  );
}

export function OverviewTopology() {
  return (
    <Panel className="relative h-[462px] overflow-hidden p-5 lg:col-span-3">
      <div className="absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(56,189,248,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.09)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Workflow Topology</h2>
          <p className="mt-1 text-sm text-slate-400">Live workflow state</p>
        </div>
        <div className="flex items-center gap-7 text-sm text-slate-400">
          <span className="flex items-center gap-2"><span className="h-px w-7 bg-cyan-400" /> Active Path</span>
          <span className="flex items-center gap-2"><span className="h-px w-7 border-t border-dashed border-slate-400" /> Inactive Path</span>
          <Expand className="h-5 w-5" />
        </div>
      </div>

      <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 1110 468" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#22d3ee" /></marker>
          <marker id="arrow-dash" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" /></marker>
        </defs>
        <path d="M190 126 H270" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        <path d="M430 126 H506" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        <path d="M660 126 H735" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        <path d="M350 158 V205" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth="1.6" markerEnd="url(#arrow-dash)" />
        <path d="M350 267 V316" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth="1.6" markerEnd="url(#arrow-dash)" />
        <path d="M865 126 H980 Q1008 126 1008 154 V302" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth="1.6" fill="none" markerEnd="url(#arrow-dash)" />
        <path d="M860 185 V172 Q860 160 884 160 H918" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth="1.6" fill="none" markerEnd="url(#arrow-dash)" />
      </svg>

      <div className="relative z-10">
        <TopologyNode x={28} y={94} title="Order API" sub="Event: OrderCreated" icon={Activity} />
        <TopologyNode x={270} y={94} title="Inventory Check" sub="CheckAvailability" icon={Box} />
        <TopologyNode x={505} y={94} title="Reserved" sub="InventoryReserved" icon={LockKeyhole} />
        <TopologyNode x={735} y={94} title="Shipping" sub="OrderShipped" icon={Truck} />
        <TopologyNode x={270} y={202} title="Failed" sub="Event Processing Failed" icon={CircleAlert} tone="red" muted />
        <TopologyNode x={270} y={312} title="Failure Handled" sub="Compensation Complete" icon={CheckCircle2} tone="green" muted />
        <TopologyNode x={905} y={186} title="Retry Loop" sub="Retrying - Backoff" icon={RotateCcw} tone="amber" />
        <TopologyNode x={895} y={296} title="Dead Letter Queue" sub="Unrecoverable Events" icon={ShoppingBag} tone="red" />
      </div>
    </Panel>
  );
}
