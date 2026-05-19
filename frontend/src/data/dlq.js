export const failureSummary = [
  {
    label: "Dead Lettered",
    value: "46",
    detail: "orders",
    sub: "(routed to DLQ)",
    tone: "red",
  },
  {
    label: "Retrying",
    value: "23",
    detail: "orders",
    sub: "(retry in progress)",
    tone: "amber",
  },
  {
    label: "Latest Error",
    value: "Shipping failed after max retries exhausted",
    sub: "10:14:32 ago",
    tone: "red",
    compact: true,
  },
  {
    label: "Recovery Status",
    value: "Manual replay not available",
    sub: "Orders require code/config fix and new deployment",
    tone: "slate",
    compact: true,
  },
];

export const failedOrders = [
  ["ORD-3a91d0f4", "PROD-fail-shipping-101", "2", "DEAD_LETTERED", "3 / 3", "Yes", "Shipping failed after max retries exhausted", "2025-05-20 10:14:32", true],
  ["ORD-5b2d9f66", "PROD-8821", "99", "DEAD_LETTERED", "3 / 3", "Yes", "Shipping failed after max retries exhausted", "2025-05-20 10:09:47"],
  ["ORD-9b7c1a55", "PROD-fail-shipping-202", "1", "DEAD_LETTERED", "3 / 3", "Yes", "Shipping service returned 5xx after max retries", "2025-05-20 09:58:21"],
  ["ORD-7c1b9e21", "PROD-4312", "99", "RETRYING_SHIPPING", "2 / 3", "No", "Shipping failed, will retry", "2025-05-20 10:16:02"],
  ["ORD-1e4f2a77", "PROD-fail-shipping-303", "3", "RETRYING_SHIPPING", "1 / 3", "No", "Shipping failed, will retry", "2025-05-20 10:15:33"],
  ["ORD-a07b6c11", "PROD-2178", "2", "RETRYING_SHIPPING", "2 / 3", "No", "Timeout calling shipping service", "2025-05-20 10:12:11"],
  ["ORD-6f5c3e99", "PROD-8821", "99", "DEAD_LETTERED", "3 / 3", "Yes", "Shipping failed after max retries exhausted", "2025-05-20 09:54:18"],
  ["ORD-4d8e2f33", "PROD-fail-shipping-404", "5", "DEAD_LETTERED", "3 / 3", "Yes", "Shipping service returned 5xx after max retries", "2025-05-20 09:48:02"],
  ["ORD-bc12d4e5", "PROD-1099", "99", "RETRYING_SHIPPING", "1 / 3", "No", "Shipping failed, will retry", "2025-05-20 10:17:05"],
  ["ORD-d2f4e6a7", "PROD-fail-shipping-505", "2", "DEAD_LETTERED", "3 / 3", "Yes", "Shipping failed after max retries exhausted", "2025-05-20 09:41:09"],
];

export const retryTimeline = [
  ["Attempt 3 / 3 (Final)", "RETRYING_SHIPPING", "2025-05-20 10:14:20", "Shipping service returned 500 INTERNAL_SERVER_ERROR", "FAILED", "red"],
  ["Attempt 2 / 3", "RETRYING_SHIPPING", "2025-05-20 10:13:52", "Timeout calling shipping service", "FAILED", "amber"],
  ["Attempt 1 / 3", "RETRYING_SHIPPING", "2025-05-20 10:13:24", "Connection reset by peer", "FAILED", "amber"],
  ["Original Attempt", "SHIPPING_PREPARATION_STARTED", "2025-05-20 10:12:11", "Shipping provider rejected order", "FAILED", "cyan"],
];
