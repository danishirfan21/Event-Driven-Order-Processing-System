import { ExternalLink, RotateCcw, ShieldAlert } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

const severityColors = {
  green: "bg-emerald-400 text-emerald-400",
  amber: "bg-amber-400 text-amber-400",
  red: "bg-red-400 text-red-400",
  rose: "bg-rose-400 text-rose-400",
};

function SummaryMetric({ value, label, tone = "white" }) {
  const colors = {
    white: "text-white",
    amber: "text-amber-400",
    red: "text-red-400",
    rose: "text-rose-400",
  };

  return (
    <div>
      <div className={`text-2xl font-medium ${colors[tone]}`}>{value}</div>
      <div className="mt-2 text-xs text-slate-400">{label}</div>
    </div>
  );
}

function SidebarCard({ title, children, action }) {
  return (
    <Panel className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-200">{title}</h3>
        {action}
      </div>
      {children}
    </Panel>
  );
}

function SidebarAction({ children }) {
  return (
    <button className="mt-4 flex h-10 w-full items-center justify-between rounded-md bg-slate-800/55 px-4 text-sm text-slate-300 hover:bg-slate-800">
      {children}
      <ExternalLink className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function SidebarIconBadge({ icon: Icon, tone }) {
  const color = tone === "red" ? "border-red-400 text-red-400" : "border-amber-400 text-amber-400";

  return (
    <div className={`grid h-8 w-8 place-items-center rounded-full border ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
}

export function StreamSidebar({ severityBreakdown, topEvents }) {
  return (
    <aside className="sticky top-0 h-[calc(100vh-76px)] overflow-y-auto space-y-3 p-5">
      <SidebarCard title="Stream Summary" action={<span className="text-xs text-slate-400">Last 1 hour</span>}>
        <div className="grid grid-cols-4 gap-4">
          <SummaryMetric value="1,842" label="Total Events" />
          <SummaryMetric value="312" label="Warnings" tone="amber" />
          <SummaryMetric value="132" label="Errors" tone="red" />
          <SummaryMetric value="46" label="DLQ Events" tone="rose" />
        </div>
      </SidebarCard>

      <SidebarCard title="Latest DLQ Event">
        <div className="flex items-start gap-4">
          <SidebarIconBadge icon={ShieldAlert} tone="red" />
          <div>
            <div className="font-medium text-white">ORD-3a91d0f4</div>
            <div className="mt-3 text-sm text-slate-200">DeadLetteredEvent</div>
            <div className="text-sm text-slate-300">10:10:47.558 (2m ago)</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-400">Reason</div>
        <div className="mt-1 text-sm text-slate-300">Max retries exceeded, routed to DLQ</div>
        <SidebarAction>View in DLQ</SidebarAction>
      </SidebarCard>

      <SidebarCard title="Latest Retrying Order">
        <div className="flex items-start gap-4">
          <SidebarIconBadge icon={RotateCcw} tone="amber" />
          <div>
            <div className="font-medium text-white">ORD-7c1b9e21</div>
            <div className="mt-4 grid grid-cols-[78px_1fr] gap-y-2 text-xs">
              <span className="text-slate-400">Stage</span>
              <span className="text-amber-400">RETRYING_SHIPPING</span>
              <span className="text-slate-400">Retry Attempt</span>
              <span className="text-amber-400">4 / 5</span>
              <span className="text-slate-400">Last Attempt</span>
              <span className="text-slate-300">10:16:02.312 (just now)</span>
            </div>
          </div>
        </div>
        <SidebarAction>View Order</SidebarAction>
      </SidebarCard>

      <SidebarCard title="Event Severity (1h)">
        <div className="space-y-4">
          {severityBreakdown.map((item) => (
            <div key={item.label} className="grid grid-cols-[70px_1fr_82px] items-center gap-3 text-xs">
              <span className="flex items-center gap-2 text-slate-300">
                <span className={`h-2 w-2 rounded-full ${severityColors[item.tone]}`} />
                {item.label}
              </span>
              <div className="h-1 rounded bg-slate-700/70">
                <div className={`h-1 rounded ${severityColors[item.tone]}`} style={{ width: item.width }} />
              </div>
              <span className="text-right text-slate-300">{item.value} <span className="text-slate-400">({item.percent})</span></span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-700/50 pt-4 text-sm">
          <span className="text-slate-400">Total</span>
          <span className="text-slate-200">1,842</span>
        </div>
      </SidebarCard>

      <SidebarCard title="Top Events (1h)">
        <div className="space-y-3">
          {topEvents.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{label}</span>
              <span className="text-slate-400">{value}</span>
            </div>
          ))}
        </div>
      </SidebarCard>
    </aside>
  );
}
