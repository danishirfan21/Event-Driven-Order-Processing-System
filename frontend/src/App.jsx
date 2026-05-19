import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar.jsx";
import { TopBar } from "./components/layout/TopBar.jsx";
import { EventStreamScreen } from "./features/event-stream/EventStreamScreen.jsx";
import { DlqFailureCenterScreen } from "./features/dlq/DlqFailureCenterScreen.jsx";
import { OrdersContent } from "./features/orders/OrdersContent.jsx";
import { OverviewScreen } from "./features/overview/OverviewScreen.jsx";
import { TopologyScreen } from "./features/topology/TopologyScreen.jsx";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("Orders");

  return (
    <div className="min-h-screen min-w-[1440px] bg-[#030b13] font-sans text-slate-200 selection:bg-cyan-500/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,.13),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(59,130,246,.1),transparent_28%),linear-gradient(180deg,#06111d_0%,#030b13_100%)]" />
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      <div className="relative z-10 ml-[222px] min-h-screen">
        <TopBar title={activeScreen} />
        {activeScreen === "Overview" && <OverviewScreen />}
        {activeScreen === "Event Stream" && <EventStreamScreen />}
        {activeScreen === "Topology" && <TopologyScreen />}
        {activeScreen === "DLQ / Failure Center" && <DlqFailureCenterScreen />}
        {!["Overview", "Event Stream", "Topology", "DLQ / Failure Center"].includes(activeScreen) && <OrdersContent />}
      </div>
    </div>
  );
}
