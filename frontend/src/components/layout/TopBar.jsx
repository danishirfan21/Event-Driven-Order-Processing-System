import { Bell } from "lucide-react";
import { RuntimePill } from "./RuntimePill.jsx";

export function TopBar({ title = "Orders" }) {
  const subtitles = {
    Topology: "Visualize how orders flow through services, topics, retries, and DLQ",
    "DLQ / Failure Center": "Inspect dead-lettered and retrying orders, understand failures, and review retry attempts.",
  };
  const subtitle = subtitles[title] || "";

  return (
    <header className="sticky top-0 z-10 flex h-[76px] items-center border-b border-slate-700/45 bg-[#06111d]/90 px-7 backdrop-blur">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-5">
        <RuntimePill />
        <Bell className="h-5 w-5 text-slate-400" />
        <div className="grid h-11 w-11 place-items-center rounded-full border border-slate-600 text-sm font-semibold text-white">
          OP
        </div>
      </div>
    </header>
  );
}
