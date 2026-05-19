import { AlertTriangle, Box, Check, Code2, Copy, ExternalLink, Info, Link2, RefreshCw, Server, Trash2, Workflow } from "lucide-react";
import { Panel } from "../../components/ui/Panel.jsx";
import { ConfigurationNotes } from "./components/ConfigurationNotes.jsx";
import { SettingCard } from "./components/SettingCard.jsx";

function SectionNumber({ children }) {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full border border-cyan-400 text-xs text-cyan-300">
      {children}
    </span>
  );
}

function RuntimeItem({ icon: Icon, label, value, endpoint }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-1 h-7 w-7 text-sky-400" />
      <div>
        <div className="text-sm text-slate-400">{label}</div>
        <div className={endpoint ? "mt-1 flex w-fit items-center gap-3 rounded-md border border-slate-700 bg-slate-950/40 px-3 py-1 font-mono text-sm text-cyan-300" : "mt-1 text-lg text-white"}>
          {value}
          {endpoint && <Copy className="h-4 w-4 text-slate-400" />}
        </div>
      </div>
    </div>
  );
}

function RuntimeConfiguration() {
  return (
    <Panel className="p-6">
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SectionNumber>1</SectionNumber>
          <h2 className="font-semibold text-white">Runtime Configuration</h2>
        </div>
        <div className="flex items-center gap-3 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          <Check className="h-4 w-4" />
          Configuration detected from backend runtime
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-10 gap-y-7">
        <RuntimeItem icon={Box} label="Messaging Mode" value="APACHE KAFKA" />
        <RuntimeItem icon={Check} label="Kafka Enabled" value="true" />
        <RuntimeItem icon={Code2} label="Active Profiles" value="kafka" />
        <RuntimeItem icon={Server} label="Environment" value="Local Docker Compose" />
        <RuntimeItem icon={Link2} label="Runtime Endpoint" value="/system/runtime" endpoint />
      </div>
    </Panel>
  );
}

function ModeOption({ active, icon: Icon, title, badge, children, note }) {
  return (
    <div className={`flex gap-5 rounded-md border p-5 ${active ? "border-cyan-500 bg-cyan-500/10" : "border-slate-700/65 bg-slate-950/20"}`}>
      <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${active ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" : "border-slate-400 text-slate-400"}`} />
      <Icon className={`mt-2 h-14 w-14 shrink-0 ${active ? "text-sky-400" : "text-slate-500"}`} />
      <div>
        <div className="flex items-center gap-4">
          <h3 className={active ? "text-lg font-medium text-cyan-300" : "text-lg font-medium text-white"}>{title}</h3>
          <span className={`rounded border px-3 py-1 text-xs ${active ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-slate-600 bg-slate-800/40 text-slate-300"}`}>{badge}</span>
        </div>
        <p className="mt-4 max-w-[330px] text-sm leading-6 text-slate-300">{children}</p>
        <span className="mt-3 inline-flex rounded-md border border-slate-700 bg-slate-950/30 px-3 py-1 text-sm text-slate-300">{note}</span>
      </div>
    </div>
  );
}

function MessagingMode() {
  return (
    <Panel className="p-6">
      <div className="mb-5 flex items-start gap-4">
        <SectionNumber>2</SectionNumber>
        <div>
          <h2 className="font-semibold text-white">Messaging Mode</h2>
          <p className="mt-2 text-sm text-slate-400">Current messaging runtime mode detected from the backend.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ModeOption icon={Box} title="Local In-Memory" badge="INACTIVE" note="No external dependencies">
          Uses in-memory router for event delivery. Designed for local development and testing.
        </ModeOption>
        <ModeOption active icon={Workflow} title="Apache Kafka" badge="ACTIVE" note="Requires Kafka stack">
          Uses Apache Kafka as the messaging backbone for durable, asynchronous event streaming.
        </ModeOption>
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
        <Info className="h-4 w-4 text-cyan-300" />
        This is a runtime indicator. Mode is determined by the backend environment.
      </div>
    </Panel>
  );
}

function KafkaTools() {
  return (
    <SettingCard number="3" title="Kafka Tools">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-500 text-2xl font-bold text-slate-950">K</div>
        <div>
          <div className="text-lg text-sky-300">Kafdrop</div>
          <div className="text-sm text-cyan-300">http://localhost:9000</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">Inspect topics, partitions, consumer groups, and DLT messages.</p>
      <button className="mt-6 flex h-11 w-[210px] items-center justify-between rounded-md border border-slate-700/65 bg-slate-800/35 px-4 text-sm text-cyan-300">
        Open Kafdrop <ExternalLink className="h-4 w-4 text-slate-400" />
      </button>
    </SettingCard>
  );
}

function DashboardRefresh() {
  const rows = [
    ["Orders polling interval", "3 seconds"],
    ["Events polling interval", "3 seconds"],
    ["Auto refresh", "Enabled"],
    ["Live indicators", "Enabled"],
  ];

  return (
    <SettingCard number="4" title="Dashboard Refresh">
      <div className="space-y-4">
        {rows.map(([label, value], index) => (
          <div key={label} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">{label}</span>
            {index < 2 ? (
              <button className="rounded-md border border-slate-700 bg-slate-950/35 px-3 py-1 text-slate-300">{value}</button>
            ) : (
              <span className="flex items-center gap-3 text-slate-300"><span className="relative h-5 w-10 rounded-full bg-emerald-500"><span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white" /></span>{value}</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-700/55 pt-4 text-xs leading-5 text-slate-400">
        These intervals control how frequently data is refreshed in the dashboard.
      </div>
    </SettingCard>
  );
}

function VisualPreferences() {
  const rows = [
    ["Compact tables", "Enabled", true],
    ["Show workflow animations", "Enabled", true],
    ["Highlight DLQ events", "Enabled", true],
    ["Reduce motion", "Disabled", false],
  ];

  return (
    <SettingCard number="5" title="Visual Preferences">
      <div className="space-y-4">
        {rows.map(([label, value, enabled]) => (
          <div key={label} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-300">{label}</span>
            <span className="flex items-center gap-3 text-slate-300">
              <span className={`relative h-5 w-10 rounded-full ${enabled ? "bg-emerald-500" : "bg-slate-600"}`}>
                <span className={`absolute top-1 h-3 w-3 rounded-full bg-white ${enabled ? "right-1" : "left-1"}`} />
              </span>
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-700/55 pt-4 text-xs leading-5 text-slate-400">
        These preferences only affect how the dashboard looks and behaves.
      </div>
    </SettingCard>
  );
}

function DangerZone() {
  return (
    <Panel className="p-6">
      <div className="mb-5 flex items-center gap-4">
        <AlertTriangle className="h-6 w-6 text-red-400" />
        <h2 className="text-lg font-semibold text-white">Danger Zone / Reset</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4 rounded-md border border-red-500/45 bg-red-950/10 p-4">
          <Trash2 className="h-7 w-7 text-red-400" />
          <div className="flex-1">
            <div className="font-medium text-red-400">Clear local dashboard cache</div>
            <div className="mt-1 text-xs text-slate-400">Remove cached data stored in this browser.</div>
          </div>
          <button className="rounded-md border border-red-500/50 px-4 py-2 text-sm text-red-400">Clear Cache</button>
        </div>
        <div className="flex items-center gap-4 rounded-md border border-red-500/45 bg-red-950/10 p-4">
          <RefreshCw className="h-7 w-7 text-red-400" />
          <div className="flex-1">
            <div className="font-medium text-red-400">Reset UI preferences</div>
            <div className="mt-1 text-xs text-slate-400">Revert all dashboard preferences to defaults.</div>
          </div>
          <button className="rounded-md border border-red-500/50 px-4 py-2 text-sm text-red-400">Reset</button>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm text-red-400">
        <Info className="h-4 w-4" />
        These actions only affect your local browser and UI settings. No backend data is modified.
      </div>
    </Panel>
  );
}

export function SettingsScreen() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_470px] gap-6 p-6">
      <main className="space-y-4">
        <RuntimeConfiguration />
        <MessagingMode />
        <div className="grid grid-cols-3 gap-4">
          <KafkaTools />
          <DashboardRefresh />
          <VisualPreferences />
        </div>
        <DangerZone />
      </main>
      <ConfigurationNotes />
    </div>
  );
}
