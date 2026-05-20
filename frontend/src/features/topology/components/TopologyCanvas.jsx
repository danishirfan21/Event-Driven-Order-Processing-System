import { Box, Globe2, RefreshCw, Shield, Share2, Truck } from "lucide-react";

const nodeBase = "absolute z-10 flex h-[66px] items-center gap-4 rounded-md border bg-[#071421]/95 px-4 shadow-[0_0_28px_rgba(14,165,233,.08)]";

function Node({ x, y, w = 154, title, sub, icon: Icon, tone = "cyan" }) {
  const colors = {
    cyan: "border-cyan-400/75 text-cyan-300",
    slate: "border-slate-600/80 text-slate-300",
    amber: "border-amber-400 text-amber-400 shadow-[0_0_24px_rgba(245,158,11,.12)]",
    red: "border-red-400 text-red-400 shadow-[0_0_24px_rgba(248,113,113,.13)]",
  };

  return (
    <div className={`${nodeBase} ${colors[tone]}`} style={{ left: x, top: y, width: w }}>
      <Icon className="h-8 w-8 shrink-0" />
      <div>
        <div className={`text-sm font-semibold ${tone === "red" ? "text-red-300" : "text-white"}`}>{title}</div>
        <div className="mt-1 text-xs text-slate-400">{sub}</div>
      </div>
    </div>
  );
}

function Topic({ x, y, title, sub, tone = "slate" }) {
  const colors = {
    slate: "border-slate-600/80 text-slate-300",
    red: "border-red-400 text-red-400",
  };

  return (
    <div className={`absolute z-10 flex h-[54px] w-[142px] items-center gap-3 rounded-md border bg-[#071421]/90 px-4 ${colors[tone]}`} style={{ left: x, top: y }}>
      <Share2 className="h-6 w-6 shrink-0" />
      <div>
        <div className="text-sm text-slate-300">{title}</div>
        <div className="text-xs text-slate-400">{sub}</div>
      </div>
    </div>
  );
}

function Label({ x, y, children, tone = "slate" }) {
  const color = {
    slate: "text-slate-400",
    green: "text-emerald-400",
    red: "text-red-400",
  }[tone];

  return <div className={`absolute z-20 text-xs font-medium uppercase ${color}`} style={{ left: x, top: y }}>{children}</div>;
}

export function TopologyCanvas() {
  return (
    <div className="absolute inset-0 overflow-auto [&::-webkit-scrollbar]:hidden">
      <div className="relative h-full w-full min-w-[1120px] min-h-[720px]">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(56,189,248,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.07)_1px,transparent_1px)] [background-size:28px_28px]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1120 720" preserveAspectRatio="none">
        <defs>
          <marker id="topology-cyan" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#22d3ee" /></marker>
          <marker id="topology-grey" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#94a3b8" /></marker>
          <marker id="topology-amber" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#f59e0b" /></marker>
          <marker id="topology-red" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#ef4444" /></marker>
        </defs>
        <path d="M168 170 H206" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#topology-cyan)" />
        <path d="M322 170 H360" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#topology-cyan)" />
        <path d="M474 170 H512" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#topology-cyan)" />
        <path d="M600 203 V244 Q600 260 620 260 H812" stroke="#22d3ee" strokeWidth="2" fill="none" markerEnd="url(#topology-cyan)" />
        <path d="M374 302 H552" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#topology-cyan)" />
        <path d="M686 302 H756" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#topology-cyan)" />
        <path d="M926 302 H1010" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#topology-cyan)" />
        <path d="M374 282 V392" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="7 7" markerEnd="url(#topology-grey)" />
        <path d="M448 424 H522" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="7 7" markerEnd="url(#topology-grey)" />
        <path d="M846 336 V430" stroke="#f59e0b" strokeWidth="2" strokeDasharray="7 7" markerEnd="url(#topology-amber)" />
        <path d="M884 430 Q990 430 990 370 V340" stroke="#f59e0b" strokeWidth="2" strokeDasharray="7 7" fill="none" markerEnd="url(#topology-amber)" />
        <path d="M846 486 V560" stroke="#ef4444" strokeWidth="2" strokeDasharray="7 7" markerEnd="url(#topology-red)" />
      </svg>

      <Label x={172} y={136}>1. Order Submitted</Label>
      <Label x={252} y={288}>2. Inventory Check</Label>
      <Label x={486} y={309} tone="green">Success</Label>
      <Label x={394} y={378} tone="red">Failure</Label>
      <Label x={940} y={306} tone="green">Success</Label>
      <Label x={790} y={396} tone="red">Failure</Label>
      <Label x={856} y={565} tone="red">Exhausted</Label>

      <Node x={26} y={158} title="Order API" sub="REST Endpoint" icon={Globe2} />
      <Node x={214} y={158} title="Order Service" sub="Orchestrator" icon={Box} w={166} />
      <Topic x={410} y={160} title="order.created" sub="topic" />
      <Node x={558} y={158} title="Inventory Check" sub="Service" icon={Box} w={166} />
      <Topic x={570} y={276} title="order.reserved" sub="topic" />
      <Node x={756} y={270} title="Shipping Service" sub="Service" icon={Truck} w={172} />
      <div className="absolute z-10 left-[996px] top-[280px] rounded-md border border-slate-600/80 bg-[#071421]/90 px-4 py-3 text-xs text-slate-300">
        <div>(end)</div>
        <div className="mt-1 text-emerald-400">SHIPPING_PREPARED</div>
      </div>
      <Topic x={390} y={408} title="order.failed" sub="topic" />
      <Node x={532} y={400} title="Failure Handler" sub="Service" icon={Shield} tone="slate" w={164} />
      <div className="absolute z-10 left-[536px] top-[504px] rounded-md border border-slate-600/80 bg-[#071421]/90 px-4 py-3 text-xs text-slate-300">
        <div>(end)</div>
        <div className="mt-1 text-slate-300">FAILURE_HANDLED</div>
      </div>
      <Node x={766} y={438} title="Retry Loop" sub="Exponential Backoff" icon={RefreshCw} tone="amber" w={184} />
      <Topic x={772} y={578} title="Dead Letter Topic" sub="order.dlq" tone="red" />
      <div className="absolute left-[972px] top-[438px] z-10 text-sm leading-5 text-slate-400">Retry up to<br />Max Attempts</div>
      </div>
    </div>
  );
}
