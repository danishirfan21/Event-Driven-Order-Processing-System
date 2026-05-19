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
  { label: "Workflows", icon: Workflow },
  { label: "Events", icon: GitBranch },
  { label: "Retries", icon: ListRestart },
  { label: "DLQ", icon: ShoppingBag },
  { label: "Settings", icon: Settings },
];
