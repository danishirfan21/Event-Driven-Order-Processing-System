import {
  ClipboardList,
  GitBranch,
  Home,
  Settings,
  ShoppingBag,
} from "lucide-react";

export const navItems = [
  { label: "Overview", icon: Home },
  { label: "Orders", icon: ClipboardList },
  { label: "Event Stream", icon: GitBranch },
  { label: "Topology", icon: GitBranch },
  { label: "DLQ / Failure Center", icon: ShoppingBag },
  { label: "Settings", icon: Settings },
];
