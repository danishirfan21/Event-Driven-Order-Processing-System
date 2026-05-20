import { ChevronLeft } from "lucide-react";
import { navItems } from "../../data/navigation.js";
import { legendItems, scenarioPresets } from "../../data/topology.js";
import { ShellLogo } from "./ShellLogo.jsx";

function TopologyPreset({ title, description, active }) {
  return (
    <button className={`flex w-full gap-3 rounded-md border p-3 text-left ${active ? "border-cyan-500 bg-cyan-500/10" : "border-slate-700/55 bg-slate-950/20"}`}>
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${active ? "border-cyan-400 text-cyan-300" : "border-slate-500 text-slate-400"}`}>
        {active ? "OK" : ""}
      </span>
      <span>
        <span className="block text-sm font-medium text-white">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span>
      </span>
    </button>
  );
}

function LegendGlyph({ type }) {
  if (type === "box") return <span className="h-3 w-6 rounded-sm border border-cyan-400" />;
  if (type === "topic") return <span className="h-px w-7 border-t border-dashed border-slate-400" />;
  if (type === "circle") return <span className="h-4 w-4 rounded-full border border-slate-400" />;
  if (type === "line-cyan") return <span className="h-px w-7 bg-cyan-400" />;
  if (type === "line-dashed") return <span className="h-px w-7 border-t border-dashed border-slate-400" />;
  if (type === "line-amber") return <span className="h-px w-7 border-t-2 border-dashed border-amber-400" />;
  if (type === "line-red") return <span className="h-px w-7 border-t-2 border-dashed border-red-400" />;
  return null;
}

function TopologySidebarExtras() {
  return (
    <div className="space-y-3 py-3">
      <div className="rounded-md border border-slate-700/55 bg-[#081827]/80 p-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-200">Scenario Presets</h3>
        <p className="mt-2 text-xs leading-5 text-slate-400">Choose a scenario to highlight the active path</p>
        <div className="mt-4 space-y-2">
          {scenarioPresets.map((preset) => (
            <TopologyPreset key={preset.title} {...preset} />
          ))}
        </div>
      </div>
      <div className="rounded-md border border-slate-700/55 bg-[#081827]/80 p-4">
        <h3 className="text-sm font-medium text-slate-200">Legend</h3>
        <div className="mt-4 space-y-4">
          {legendItems.map(([label, type]) => (
            <div key={label} className="flex items-center gap-4 text-sm text-slate-300">
              <LegendGlyph type={type} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HealthSidebarExtras() {
  return (
    <div className="rounded-md border border-slate-700/55 bg-[#081827]/80 p-4 my-3">
      <div className="text-xs text-slate-400">System Health</div>
      <div className="mt-2 flex items-center gap-2 text-sm text-emerald-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400" /> Healthy
      </div>
      <div className="mt-6 text-xs text-slate-400">Throughput (1m)</div>
      <div className="mt-1 text-xl text-cyan-300">
        1,248 <span className="text-xs text-slate-400">events/min</span>
      </div>
      <div className="mt-6 text-xs text-slate-400">In-flight Orders</div>
      <div className="mt-1 text-xl text-white">312</div>
    </div>
  );
}

export function Sidebar({ activeScreen, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[222px] flex-col border-r border-slate-700/45 bg-[#06111d]/95 px-3 py-5 shadow-[18px_0_70px_rgba(0,0,0,.32)] overflow-hidden">
      <div className="px-2">
        <ShellLogo />
      </div>
      <nav className="mt-10 space-y-2 shrink-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.label === activeScreen;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.label)}
              className={`relative flex h-12 w-full items-center gap-4 rounded-md px-3 text-left text-sm transition ${
                active ? "bg-slate-800/55 text-white" : "text-slate-400 hover:bg-slate-800/25 hover:text-slate-200"
              }`}
            >
              {active && <span className="absolute left-0 top-2 h-8 w-px bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,.85)]" />}
              <Icon className={`h-5 w-5 ${active ? "text-cyan-300" : "text-slate-400"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden">
        {activeScreen === "Topology" ? <TopologySidebarExtras /> : <HealthSidebarExtras />}
      </div>
      <div className="mt-5 shrink-0 border-t border-slate-700/45 pt-5">
        <div className="flex items-center gap-4 px-4 text-sm text-slate-400">
          <ChevronLeft className="h-5 w-5" /> Collapse
        </div>
      </div>
    </aside>
  );
}
