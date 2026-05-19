import { Panel } from "../../../components/ui/Panel.jsx";

export function SettingCard({ number, title, children }) {
  return (
    <Panel className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <span className="grid h-6 w-6 place-items-center rounded-full border border-cyan-400 text-xs text-cyan-300">
          {number}
        </span>
        <h2 className="font-semibold text-white">{title}</h2>
      </div>
      {children}
    </Panel>
  );
}
