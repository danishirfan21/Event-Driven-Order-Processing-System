import { ChevronDown, Filter, Search } from "lucide-react";
import { DetailPanel } from "./DetailPanel.jsx";
import { OrdersTable } from "./OrdersTable.jsx";

function FilterBox({ label, wide }) {
  return (
    <button className={`flex h-12 items-center justify-between rounded-md border border-slate-700/55 bg-[#071421]/85 px-4 text-left ${wide ? "w-[276px]" : "w-[136px]"}`}>
      <div>
        <div className="text-[10px] text-slate-400">{label}</div>
        <div className="mt-1 text-sm text-slate-200">All</div>
      </div>
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function Tab({ label, count, active, tone }) {
  const toneClass = {
    green: "text-emerald-400 bg-emerald-500/5",
    red: "text-red-400 bg-red-500/5",
    amber: "text-amber-400 bg-amber-500/5",
    purple: "text-purple-300 bg-purple-500/5",
  }[tone] || "text-white bg-cyan-500/10";

  return (
    <button className={`flex h-10 items-center gap-4 rounded-md border px-4 text-sm ${active ? "border-cyan-500/50 bg-cyan-500/10 text-white" : "border-slate-700/55 bg-[#071421]/80"}`}>
      <span className={tone ? toneClass : "text-white"}>{label}</span>
      <span className="rounded bg-slate-800/80 px-2 py-0.5 text-xs text-slate-400">{count}</span>
    </button>
  );
}

export function OrdersContent() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_390px]">
      <main className="min-w-0 p-7">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative h-12 w-[290px]">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input className="h-full w-full rounded-md border border-slate-700/55 bg-[#071421]/85 pl-11 pr-10 text-sm text-slate-200 outline-none placeholder:text-slate-500" placeholder="Search by Order ID" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-slate-400">/</span>
          </div>
          <FilterBox label="Business Status" />
          <FilterBox label="Workflow Stage" />
          <FilterBox label="DLQ Routed" />
          <button className="flex h-12 items-center gap-3 rounded-md border border-slate-700/55 bg-[#071421]/85 px-5 text-sm text-slate-300">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Tab label="All" count="1,248" active />
          <Tab label="Reserved" count="578" tone="green" />
          <Tab label="Failed" count="87" tone="red" />
          <Tab label="Retrying" count="23" tone="amber" />
          <Tab label="Dead Lettered" count="12" tone="purple" />
        </div>

        <OrdersTable />
      </main>
      <DetailPanel />
    </div>
  );
}
