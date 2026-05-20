import { ChevronDown, ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { failedOrders, failureSummary, retryTimeline } from "../../data/dlq.js";
import { FailureDetailsPanel } from "./components/FailureDetailsPanel.jsx";
import { FailureSummaryStrip } from "./components/FailureSummaryStrip.jsx";
import { FailureTable } from "./components/FailureTable.jsx";

function FilterTabs() {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="relative h-11 flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          className="h-full w-full rounded-md border border-slate-700/60 bg-[#071421]/85 pl-11 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-500"
          placeholder="Search by Order ID, Product ID, or Error..."
        />
      </div>
      <button className="h-11 rounded-md border border-slate-700/60 bg-[#071421]/85 px-5 text-sm text-slate-300">All <span className="text-slate-500">(69)</span></button>
      <button className="h-11 rounded-md border border-red-500/70 bg-red-500/10 px-5 text-sm text-red-400">Dead Lettered <span className="text-amber-400">(46)</span></button>
      <button className="h-11 rounded-md border border-amber-500/70 bg-amber-500/10 px-5 text-sm text-amber-400">Retrying <span className="text-amber-400">(23)</span></button>
      <button className="flex h-11 items-center gap-3 rounded-md border border-slate-700/60 bg-[#071421]/85 px-5 text-sm text-slate-300">
        <Filter className="h-4 w-4" /> Filters
      </button>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex h-20 items-center justify-between px-4 text-sm text-slate-400">
      <span>Showing 1 to 10 of 69 orders</span>
      <div className="flex items-center gap-2">
        <button className="grid h-9 w-9 place-items-center rounded-md bg-slate-800/60"><ChevronLeft className="h-4 w-4" /></button>
        <button className="grid h-9 w-9 place-items-center rounded-md border border-cyan-500 bg-cyan-500/10 text-cyan-300">1</button>
        <button className="grid h-9 w-9 place-items-center rounded-md bg-slate-800/60">2</button>
        <button className="grid h-9 w-9 place-items-center rounded-md bg-slate-800/60">3</button>
        <span className="px-3">...</span>
        <button className="grid h-9 w-9 place-items-center rounded-md bg-slate-800/60">7</button>
        <button className="grid h-9 w-9 place-items-center rounded-md bg-slate-800/60"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <button className="flex h-10 items-center gap-5 rounded-md border border-slate-700/55 bg-slate-950/35 px-4 text-slate-300">
        10 / page <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

export function DlqFailureCenterScreen() {
  return (
    <div className="flex min-h-[calc(100vh-76px)] overflow-hidden">
      <main className="min-w-0 flex-1 overflow-y-auto p-5">
        <FailureSummaryStrip items={failureSummary} />
        <FilterTabs />
        <section className="overflow-hidden rounded-lg border border-slate-700/65 bg-[#071421]/82 shadow-[0_18px_55px_rgba(0,0,0,.2)]">
          <FailureTable rows={failedOrders} />
          <Pagination />
        </section>
      </main>
      <div className="w-[540px] shrink-0">
        <FailureDetailsPanel timeline={retryTimeline} />
      </div>
    </div>
  );
}
