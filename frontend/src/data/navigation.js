import {
  ClipboardList,
  GitBranch,
  Home,
  ListRestart,
  Settings,
  ShoppingBag,
  Workflow,
} from "lucide-react";

export const navItems = [
  { label: "Overview", icon: Home },
  { label: "Orders", icon: ClipboardList },
  { label: "Event Stream", icon: GitBranch },
  { label: "Topology", icon: GitBranch },
  { label: "Workflows", icon: Workflow },
  { label: "Retries", icon: ListRestart },
  { label: "DLQ / Failure Center", icon: ShoppingBag },
  { label: "Settings", icon: Settings },
];
