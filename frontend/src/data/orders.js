import { Box, CheckCircle2, ClipboardList, PlayCircle } from "lucide-react";

export const orders = [
  ["ORD-8f3a7c2e", "PROD-2178", 2, "RESERVED", "SHIPPING_PREPARATION_STARTED", "0 / 3", "No", "2025-05-20 10:14:32", "2025-05-20 10:16:05", "selected"],
  ["ORD-7c1b9e21", "PROD-4312", 1, "FAILED", "FAILED", "0 / 3", "No", "2025-05-20 09:58:11", "2025-05-20 10:02:41"],
  ["ORD-3a91d0f4", "PROD-2178", 3, "RESERVED", "RETRYING_SHIPPING", "2 / 3", "No", "2025-05-20 09:45:07", "2025-05-20 10:16:18"],
  ["ORD-2d6e4b88", "PROD-7821", 5, "RESERVED", "SHIPPING_PREPARED", "0 / 3", "No", "2025-05-20 09:43:52", "2025-05-20 10:15:02"],
  ["ORD-9b7c1a55", "PROD-9912", 1, "RESERVED", "RESERVED", "0 / 3", "No", "2025-05-20 09:31:18", "2025-05-20 09:31:19"],
  ["ORD-1e4f2a77", "PROD-2178", 2, "FAILED", "FAILURE_HANDLED", "1 / 3", "No", "2025-05-20 09:28:04", "2025-05-20 09:40:11"],
  ["ORD-5b2d9f66", "PROD-4312", 4, "FAILED", "DEAD_LETTERED", "3 / 3", "Yes", "2025-05-20 09:19:33", "2025-05-20 09:29:47"],
  ["ORD-6f5c3e99", "PROD-7821", 1, "RESERVED", "RETRYING_SHIPPING", "1 / 3", "No", "2025-05-20 09:12:21", "2025-05-20 09:15:33"],
  ["ORD-0a7b6c11", "PROD-2178", 2, "RESERVED", "INVENTORY_CHECK_STARTED", "0 / 3", "No", "2025-05-20 09:05:09", "2025-05-20 09:05:10"],
  ["ORD-4d8e2f33", "PROD-9912", 6, "FAILED", "FAILED", "3 / 3", "Yes", "2025-05-20 08:55:14", "2025-05-20 09:03:28"],
];

export const recentEvents = [
  ["SHIPPING_PREPARATION_STARTED", "Shipping preparation started", "2025-05-20 10:16:05", PlayCircle],
  ["RESERVED", "Inventory successfully reserved", "2025-05-20 10:15:54", CheckCircle2],
  ["INVENTORY_CHECK_STARTED", "Inventory check started", "2025-05-20 10:15:45", Box],
  ["CREATED", "Order created", "2025-05-20 10:14:32", ClipboardList],
];
