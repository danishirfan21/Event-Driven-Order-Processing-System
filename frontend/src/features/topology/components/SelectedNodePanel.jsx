import { Box, ChevronRight } from "lucide-react";
import { Panel } from "../../../components/ui/Panel.jsx";

function DetailRow({ label, value, tone }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className={tone || "text-slate-200"}>{value}</span>
    </div>
  );
}

function ActionButton({ children }) {
  return (
    <button className="flex h-11 w-full items-center justify-between rounded-md border border-slate-700/60 bg-slate-800/35 px-4 text-sm text-slate-200 hover:bg-slate-800/60">
      {children}
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </button>
  );
}

export function SelectedNodePanel() {
  return (
    <aside className="sticky top-0 h-[calc(100vh-76px)] overflow-y-auto border-l border-slate-800/80 p-5">
      <Panel className="overflow-hidden">
        <div className="border-b border-slate-700/60 p-5">
          <h3 className="text-sm font-medium uppercase tracking-wide text-slate-300">Selected Node</h3>
          <div className="mt-5 flex items-center gap-4 rounded-md border border-slate-700/60 bg-[#071421]/80 p-4">
            <Box className="h-9 w-9 text-sky-400" />
            <div>
              <div className="font-medium text-white">Shipping Service</div>
              <div className="mt-1 text-sm text-slate-400">Service</div>
            </div>
          </div>
        </div>

        <div className="space-y-5 border-b border-slate-700/60 p-5">
          <h3 className="text-sm font-medium uppercase tracking-wide text-slate-300">Details</h3>
          <DetailRow label="Type" value="Service" />
          <DetailRow label="Description" value="Prepares order for shipping and publishes event." />
          <DetailRow label="Consumes" value="order.reserved" />
          <DetailRow label="Produces" value="shipping.prepared" />
          <DetailRow label="On Failure" value="Triggers retry with exponential backoff" />
          <DetailRow label="Max Retries" value="3" />
          <DetailRow label="Retry Backoff" value="2s, 5s, 15s" />
          <DetailRow label="DLQ Topic" value="order.dlq" />
        </div>

        <div className="space-y-5 border-b border-slate-700/60 p-5">
          <h3 className="text-sm font-medium uppercase tracking-wide text-slate-300">Real-Time Status</h3>
          <DetailRow label="Status" value="Healthy" tone="text-emerald-400" />
          <DetailRow label="Last Event" value="SHIPPING_PREPARED" tone="text-emerald-400" />
          <DetailRow label="Last Event Time" value="2025-05-20 10:14:32" />
          <DetailRow label="In-Flight Orders" value="7" />
        </div>

        <div className="space-y-2 p-5">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-300">Actions</h3>
          <ActionButton>View Events</ActionButton>
          <ActionButton>View Orders</ActionButton>
          <ActionButton>Simulate Failure</ActionButton>
        </div>
      </Panel>
    </aside>
  );
}
