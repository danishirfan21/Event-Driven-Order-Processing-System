import { Database } from "lucide-react";

export function ShellLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-xl" />
        <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-blue-400/30 bg-blue-500/10">
          <Database className="h-6 w-6 text-blue-400" />
        </div>
      </div>
      <div>
        <div className="text-xl font-semibold tracking-tight text-white">OrderFlow</div>
        <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Command Center</div>
      </div>
    </div>
  );
}
