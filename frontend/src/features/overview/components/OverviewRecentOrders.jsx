import { Panel } from "../../../components/ui/Panel.jsx";

const rows = [
  ["ORD-8f3a7c2e", "In Progress", "Shipping", "a few seconds ago", "green"],
  ["ORD-7c1b9e21", "Failed", "Failure Handled", "2m ago", "red"],
  ["ORD-3a91d0f4", "In Progress", "Retrying", "3m ago", "green"],
  ["ORD-2d6e4b88", "Completed", "Completed", "5m ago", "green"],
  ["ORD-9b7c1a55", "In Progress", "Reserved", "6m ago", "green"],
];

export function OverviewRecentOrders() {
  return (
    <Panel className="p-5 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between border-b border-slate-700/40 pb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Recent Orders</h3>
        <span className="text-xs text-cyan-300">View all</span>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-400">
          <tr>
            <th className="py-2 font-medium">Order ID</th>
            <th className="font-medium">Status</th>
            <th className="font-medium">Current Stage</th>
            <th className="font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((order) => (
            <tr key={order[0]} className="border-t border-slate-700/35">
              <td className="py-4 font-medium text-cyan-300">{order[0]}</td>
              <td>
                <span className={`${order[4] === "red" ? "text-red-400" : "text-emerald-400"}`}>
                  {order[1] === "Failed" && <span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-400" />}
                  {order[1]}
                </span>
              </td>
              <td className="text-slate-300">{order[2]}</td>
              <td className="text-slate-400">{order[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
