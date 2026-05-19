import { ChevronRight, RotateCcw, ShoppingBag } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

function AttentionItem({ icon: Icon, title, value, sub, tone, link }) {
  const color = tone === "red" ? "text-red-400 border-red-400" : "text-amber-400 border-amber-400";

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className={`grid h-9 w-9 place-items-center rounded-full border ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className={`text-xs font-semibold uppercase ${tone === "red" ? "text-red-400" : "text-amber-400"}`}>{title}</div>
          <div className={`mt-1 text-3xl font-semibold ${tone === "red" ? "text-red-400" : "text-amber-400"}`}>{value}</div>
          <div className="text-xs text-slate-400">{sub}</div>
        </div>
      </div>
      <button className="mt-5 flex w-full items-center justify-between text-sm text-cyan-300">
        {link}<ChevronRight className="h-4 w-4 text-slate-400" />
      </button>
    </div>
  );
}

export function Attention() {
  return (
    <Panel className="p-5">
      <h3 className="border-b border-slate-700/45 pb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">Attention</h3>
      <div className="space-y-6 pt-5">
        <AttentionItem icon={RotateCcw} title="Retries" value="23" sub="Orders in retry" tone="amber" link="View Retries" />
        <div className="h-px bg-slate-700/45" />
        <AttentionItem icon={ShoppingBag} title="Dead Letter Queue" value="5" sub="Unprocessed events" tone="red" link="View DLQ" />
      </div>
    </Panel>
  );
}
