import { CalendarDays, Filter, List, Search, Waves } from "lucide-react";
import { eventStats, severityBreakdown, streamOrders, topEvents } from "../../data/eventStream.js";
import { EventGroup } from "./components/EventGroup.jsx";
import { StreamSidebar } from "./components/StreamSidebar.jsx";

function StatTab({ label, count, tone, active }) {
  const colors = {
    cyan: active ? "border-cyan-500 bg-cyan-500/10 text-white" : "border-slate-700/60 text-slate-300",
    green: "border-slate-700/60 text-emerald-400",
    amber: "border-slate-700/60 text-amber-400",
    red: "border-slate-700/60 text-red-400",
    rose: "border-slate-700/60 text-rose-400",
  };

  return (
    <button className={`flex h-10 items-center gap-4 rounded-md border px-4 text-sm ${colors[tone]}`}>
      <span>{label}</span>
      <span className="rounded bg-slate-900/80 px-2 py-0.5 text-xs text-slate-400">{count}</span>
    </button>
  );
}

function ModeButton({ icon: Icon, label, active }) {
  return (
    <button className={`flex h-10 items-center gap-2 rounded-md border px-4 text-sm ${active ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-transparent text-slate-400"}`}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export function EventStreamScreen() {
  return (
    <div className="flex min-h-[calc(100vh-76px)] overflow-hidden">
      <main className="min-w-0 flex-1 overflow-y-auto border-r border-slate-800/80 p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {eventStats.map((stat) => (
              <StatTab key={stat.label} {...stat} />
            ))}
          </div>
          <div className="flex rounded-md border border-slate-700/60 bg-[#071421]/80 p-1">
            <ModeButton icon={Waves} label="Timeline" active />
            <ModeButton icon={List} label="List" />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <div className="relative h-11 flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className="h-full w-full rounded-md border border-slate-700/60 bg-[#071421]/85 pl-11 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-500"
              placeholder="Search by Order ID or Event Name (e.g., ORD-1a2b3c, OrderFailedEvent)"
            />
          </div>
          <button className="flex h-11 w-[190px] items-center justify-between rounded-md border border-slate-700/60 bg-[#071421]/85 px-4 text-left text-sm text-slate-300">
            Last 1 hour <CalendarDays className="h-4 w-4 text-slate-400" />
          </button>
          <button className="flex h-11 items-center gap-3 rounded-md border border-slate-700/60 bg-[#071421]/85 px-5 text-sm text-slate-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="space-y-3">
          {streamOrders.map((order) => (
            <EventGroup key={order.orderId} order={order} />
          ))}
        </div>
      </main>

      <div className="w-[390px] shrink-0">
        <StreamSidebar severityBreakdown={severityBreakdown} topEvents={topEvents} />
      </div>
    </div>
  );
}
