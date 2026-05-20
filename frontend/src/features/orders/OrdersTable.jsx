import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { orders } from "../../data/orders.js";
import { StatusBadge } from "../../components/ui/StatusBadge.jsx";

function PageButton({ children, active }) {
  return (
    <button className={`grid h-9 min-w-9 place-items-center rounded-md border px-3 ${active ? "border-cyan-400 bg-cyan-500/10 text-cyan-300" : "border-slate-700/55 bg-slate-800/40 text-slate-400"}`}>
      {children}
    </button>
  );
}

export function OrdersTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-700/55 bg-[#071421]/80 shadow-[0_20px_60px_rgba(0,0,0,.22)]">
      <div className="overflow-x-auto">
        <table className="min-w-[1040px] w-full text-left text-sm">
          <thead className="border-b border-slate-700/55 text-[11px] uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-5 font-medium">Order ID</th>
              <th className="px-3 font-medium">Product</th>
              <th className="px-3 font-medium">Quantity</th>
              <th className="px-3 font-medium">Business Status</th>
              <th className="px-3 font-medium">Workflow Stage</th>
              <th className="px-3 font-medium">Retry</th>
              <th className="px-3 font-medium">DLQ</th>
              <th className="px-3 font-medium">Created</th>
              <th className="px-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order[0]} className={`border-b border-slate-700/35 last:border-b-0 ${order[9] ? "bg-cyan-500/[0.08] outline outline-1 outline-cyan-500/60" : "hover:bg-slate-800/25"}`}>
                <td className="px-4 py-4 font-medium text-white whitespace-nowrap">{order[0]}</td>
                <td className="px-3 text-slate-300">{order[1]}</td>
                <td className="px-3 text-slate-200">{order[2]}</td>
                <td className="px-3"><StatusBadge value={order[3]} /></td>
                <td className="px-3"><StatusBadge value={order[4]} variant="stage" /></td>
                <td className="px-3 text-slate-200">{order[5]}</td>
                <td className="px-3">
                  <span className={`flex items-center gap-2 ${order[6] === "Yes" ? "text-red-400" : "text-slate-300"}`}>
                    <span className={`h-2 w-2 rounded-full ${order[6] === "Yes" ? "bg-red-400" : "bg-emerald-400"}`} />
                    {order[6]}
                  </span>
                </td>
                <td className="px-3 text-xs text-slate-400 whitespace-nowrap">{order[7]}</td>
                <td className="px-3 text-xs text-slate-400 whitespace-nowrap">{order[8]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex h-20 items-center justify-between gap-4 px-4 text-sm text-slate-400">
        <span>Showing 1 to 10 of 1,248 orders</span>
        <div className="flex items-center gap-2">
          <PageButton><ChevronLeft className="h-4 w-4" /></PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>4</PageButton>
          <span className="px-4">...</span>
          <PageButton>125</PageButton>
          <PageButton><ChevronRight className="h-4 w-4" /></PageButton>
        </div>
        <button className="flex h-10 items-center gap-5 rounded-md border border-slate-700/55 bg-slate-950/35 px-4 text-slate-300">
          10 / page <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
