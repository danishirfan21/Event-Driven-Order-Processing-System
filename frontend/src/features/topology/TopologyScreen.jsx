import { Maximize2, Minus, Plus, SlidersHorizontal } from "lucide-react";
import { activeTrace } from "../../data/topology.js";
import { ActivePathTrace } from "./components/ActivePathTrace.jsx";
import { SelectedNodePanel } from "./components/SelectedNodePanel.jsx";
import { TopologyCanvas } from "./components/TopologyCanvas.jsx";

function CanvasToolbar() {
  return (
    <div className="absolute left-6 top-6 z-20 flex items-center gap-3">
      <button className="grid h-10 w-10 place-items-center rounded-md border border-slate-700/65 bg-[#071421]/85 text-slate-300">
        <SlidersHorizontal className="h-4 w-4" />
      </button>
      <div className="flex h-10 items-center rounded-md border border-slate-700/65 bg-[#071421]/85 text-sm text-slate-300">
        <button className="grid h-10 w-10 place-items-center border-r border-slate-700/65"><Minus className="h-4 w-4" /></button>
        <span className="px-4">100%</span>
        <button className="grid h-10 w-10 place-items-center border-l border-slate-700/65"><Plus className="h-4 w-4" /></button>
      </div>
      <button className="grid h-10 w-10 place-items-center rounded-md border border-slate-700/65 bg-[#071421]/85 text-slate-300">
        <Maximize2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function TopologyScreen() {
  return (
    <div className="flex min-h-[calc(100vh-76px)] overflow-hidden">
      <main className="min-w-0 flex-1 overflow-y-auto">
        <section className="p-5">
          <div className="relative h-[calc(100vh-245px)] min-h-[640px] overflow-hidden rounded-lg border border-slate-700/65 bg-[#06111d]/82">
            <CanvasToolbar />
            <div className="absolute right-6 top-6 z-20 flex h-10 items-center gap-4 rounded-md border border-slate-700/65 bg-[#071421]/85 px-4 text-sm text-slate-300">
              Show Inactive
              <span className="relative h-5 w-9 rounded-full bg-slate-700">
                <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-slate-400" />
              </span>
            </div>
            <TopologyCanvas />
          </div>
        </section>
        <ActivePathTrace items={activeTrace} />
      </main>
      <div className="w-[390px] shrink-0">
        <SelectedNodePanel />
      </div>
    </div>
  );
}
