import { Box, Check, Globe2, Truck } from "lucide-react";

function TraceIcon({ type, index }) {
  const Icon = type === "api" ? Globe2 : type === "truck" ? Truck : type === "box" ? Box : Check;
  const active = index === 0 || type === "truck" || type === "box";

  return (
    <div className={`grid h-8 w-8 place-items-center rounded-full border bg-[#071421] ${active ? "border-cyan-400 text-cyan-300" : "border-emerald-400 text-emerald-400"}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
}

export function ActivePathTrace({ items }) {
  return (
    <section className="mx-5 mb-5 rounded-lg border border-slate-700/65 bg-[#071421]/82 p-5">
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium uppercase tracking-wide text-slate-200">Active Path Trace</h3>
          <span className="text-xs text-slate-400">Real-time flow of the last order through the selected scenario</span>
        </div>
        <button className="text-xs uppercase tracking-wide text-slate-400">View Full Events</button>
      </div>

      <div className="relative grid grid-cols-6">
        <div className="absolute left-[52px] right-[52px] top-3 h-px bg-cyan-400" />
        {items.map(([title, time, type], index) => (
          <div key={title} className="relative z-10 flex flex-col items-center">
            <TraceIcon type={type} index={index} />
            <div className="mt-3 rounded-md border border-slate-700/60 bg-[#071421]/90 px-3 py-2 text-center">
              <div className="text-xs font-medium text-slate-200">{title}</div>
              <div className="mt-1 text-xs text-slate-400">{time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
