import { Info, Lightbulb, Monitor, Server, Workflow } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

const notes = [
  {
    icon: Server,
    title: "Runtime mode is read from backend environment",
    body: "The dashboard detects the active messaging mode, Kafka status, and active Spring profiles from the /system/runtime endpoint.",
    tone: "cyan",
  },
  {
    icon: Workflow,
    title: "Kafka mode requires Docker Compose stack",
    body: "Kafka, ZooKeeper, and supporting services must be running via Docker Compose for Apache Kafka mode to be active.",
    tone: "purple",
  },
  {
    icon: Lightbulb,
    title: "DLQ visibility comes from workflow telemetry",
    body: "Dead-lettered events and retry state are sourced from persisted workflow telemetry and event history APIs.",
    tone: "amber",
  },
  {
    icon: Monitor,
    title: "UI preferences only affect dashboard behavior",
    body: "Polling intervals, live indicators, and visual preferences control how the dashboard looks and refreshes data in your browser only.",
    tone: "green",
  },
];

function NoteCard({ note }) {
  const colors = {
    cyan: "border-cyan-500/60 bg-cyan-500/10 text-cyan-300",
    purple: "border-purple-500/45 bg-purple-500/10 text-purple-300",
    amber: "border-amber-500/45 bg-amber-500/10 text-amber-400",
    green: "border-emerald-500/45 bg-emerald-500/10 text-emerald-400",
  };
  const Icon = note.icon;

  return (
    <div className={`rounded-md border p-6 ${colors[note.tone]}`}>
      <div className="flex items-start gap-5">
        <Icon className="mt-1 h-9 w-9 shrink-0" />
        <div>
          <h3 className="text-lg font-medium">{note.title}</h3>
          <p className="mt-5 text-sm leading-7 text-slate-300">{note.body}</p>
        </div>
      </div>
    </div>
  );
}

export function ConfigurationNotes() {
  return (
    <aside>
      <Panel className="p-6">
        <div className="mb-7 flex items-center gap-4">
          <Lightbulb className="h-7 w-7 text-white" />
          <h2 className="text-lg font-semibold text-white">Configuration Notes</h2>
        </div>
        <div className="space-y-5">
          {notes.map((note) => (
            <NoteCard key={note.title} note={note} />
          ))}
          <div className="flex gap-4 rounded-md border border-slate-700/65 bg-slate-900/35 p-5">
            <Info className="h-5 w-5 shrink-0 text-slate-300" />
            <p className="text-sm leading-6 text-slate-300">
              All configuration values are informational or UI-specific. Changes here do not modify backend runtime or messaging behavior.
            </p>
          </div>
        </div>
      </Panel>
    </aside>
  );
}
