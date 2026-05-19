const stageStyles = {
  DEAD_LETTERED: "border-red-500/25 bg-red-500/10 text-red-400",
  RETRYING_SHIPPING: "border-amber-500/25 bg-amber-500/10 text-amber-400",
};

export function FailureTable({ rows }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-slate-700/55 text-[11px] uppercase tracking-wide text-slate-400">
        <tr>
          <th className="px-4 py-5 font-medium">Order ID</th>
          <th className="px-3 font-medium">Product ID</th>
          <th className="px-3 font-medium">Quantity</th>
          <th className="px-3 font-medium">Current Stage</th>
          <th className="px-3 font-medium">Retry</th>
          <th className="px-3 font-medium">DLQ Routed</th>
          <th className="px-3 font-medium">Last Error</th>
          <th className="px-3 font-medium">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className={`border-b border-slate-700/35 last:border-b-0 ${row[8] ? "bg-red-500/[0.08] outline outline-1 outline-red-500/75" : "hover:bg-slate-800/25"}`}>
            <td className="px-4 py-4 font-medium text-white">{row[0]}</td>
            <td className="px-3 text-slate-400">{row[1]}</td>
            <td className="px-3 text-slate-200">{row[2]}</td>
            <td className="px-3"><span className={`rounded px-3 py-1 text-xs font-semibold ${stageStyles[row[3]]}`}>{row[3]}</span></td>
            <td className="px-3 text-slate-200">{row[4]}</td>
            <td className="px-3">
              <span className="flex items-center gap-2 text-slate-300">
                <span className={`h-2 w-2 rounded-full ${row[5] === "Yes" ? "bg-red-400" : "bg-slate-500"}`} />
                {row[5]}
              </span>
            </td>
            <td className="max-w-[210px] px-3 text-slate-400">{row[6]}</td>
            <td className="px-3 text-slate-400">{row[7]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
