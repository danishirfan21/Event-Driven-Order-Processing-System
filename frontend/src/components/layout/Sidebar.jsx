import { ChevronLeft } from "lucide-react";
import { navItems } from "../../data/navigation.js";
import { ShellLogo } from "./ShellLogo.jsx";

export function Sidebar({ activeScreen, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[222px] flex-col border-r border-slate-700/45 bg-[#06111d]/95 px-3 py-5 shadow-[18px_0_70px_rgba(0,0,0,.32)]">
      <div className="px-2">
        <ShellLogo />
      </div>
      <nav className="mt-10 space-y-2">
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
      <div className="mt-auto rounded-md border border-slate-700/55 bg-[#081827]/80 p-4">
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
      <div className="mt-5 border-t border-slate-700/45 pt-5">
        <div className="flex items-center gap-4 px-4 text-sm text-slate-400">
          <ChevronLeft className="h-5 w-5" /> Collapse
        </div>
      </div>
    </aside>
  );
}
