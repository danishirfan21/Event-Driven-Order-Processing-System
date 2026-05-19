export const scenarioPresets = [
  {
    title: "Success Path",
    description: "Happy path from order to shipping prepared",
    active: true,
  },
  {
    title: "Inventory Failure",
    description: "Inventory check fails and handled",
  },
  {
    title: "Shipping DLQ",
    description: "Shipping fails and routed to DLQ after retries",
  },
];

export const legendItems = [
  ["Service", "box"],
  ["Kafka Topic", "topic"],
  ["Process / Step", "circle"],
  ["Active Path", "line-cyan"],
  ["Inactive Path", "line-dashed"],
  ["Retry Loop", "line-amber"],
  ["DLQ Path", "line-red"],
];

export const activeTrace = [
  ["Order Submitted", "10:14:22.013", "api"],
  ["CREATED", "10:14:22.135", "check"],
  ["INVENTORY_CHECK_STARTED", "10:14:22.532", "box"],
  ["RESERVED", "10:14:23.105", "check"],
  ["SHIPPING_PREPARATION_STARTED", "10:14:23.721", "box"],
  ["SHIPPING_PREPARED", "10:14:24.332", "truck"],
];
