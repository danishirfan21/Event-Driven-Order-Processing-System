import { Bell } from "lucide-react";
import { RuntimePill } from "./RuntimePill.jsx";

export function TopBar({ title = "Orders" }) {
  return (
    <header className="sticky top-0 z-10 flex h-[76px] items-center border-b border-slate-700/45 bg-[#06111d]/90 px-7 backdrop-blur">
      <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
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
