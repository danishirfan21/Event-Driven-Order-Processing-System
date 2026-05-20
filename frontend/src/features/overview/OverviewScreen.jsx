import { Activity } from "lucide-react";
import { Panel } from "../../components/ui/Panel.jsx";
import { ActiveTrace } from "./components/ActiveTrace.jsx";
import { Attention } from "./components/Attention.jsx";
import { EventTimeline } from "./components/EventTimeline.jsx";
import { OverviewRecentOrders } from "./components/OverviewRecentOrders.jsx";
import { OverviewTopology } from "./components/OverviewTopology.jsx";

function HeroMetric({ label, value, detail, tone = "white" }) {
  const colors = {
    white: "text-white",
    cyan: "text-cyan-300",
    green: "text-emerald-400",
    red: "text-red-400",
    amber: "text-amber-400",
  };

  return (
    <div className="border-l border-slate-700/50 px-7 first:border-l-0">
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`mt-2 text-2xl font-medium ${colors[tone]}`}>{value}</div>
      {detail && <div className="mt-1 text-xs text-slate-400">{detail}</div>}
    </div>
  );
}

export function OverviewScreen() {
  return (
    <main className="p-5">
      <Panel className="mb-5 flex min-h-[100px] items-center overflow-hidden">
        <div className="flex min-w-0 flex-wrap items-center gap-6 px-7">
          <Activity className="h-9 w-9 text-cyan-300" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Overview</h1>
            <p className="mt-1 text-sm text-slate-400">Real-time pulse of your order workflow</p>
          </div>
        </div>
        <div className="ml-auto grid h-full flex-1 grid-cols-6 items-center">
          <HeroMetric label="Workflow Health" value="Healthy" tone="green" />
          <HeroMetric label="Throughput (1m)" value="1,248" detail="events/min" tone="cyan" />
          <HeroMetric label="In-flight Orders" value="312" />
          <HeroMetric label="Failed (1m)" value="7" tone="red" />
          <HeroMetric label="Retrying" value="23" tone="amber" />
          <HeroMetric label="DLQ" value="5" tone="red" />
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
        <OverviewTopology />
        <ActiveTrace />
        <EventTimeline />
        <Attention />
        <OverviewRecentOrders />
      </div>
    </main>
  );
}
