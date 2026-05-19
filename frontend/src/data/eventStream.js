export const eventStats = [
  { label: "All", count: "1,842", tone: "cyan", active: true },
  { label: "Info", count: "1,352", tone: "green" },
  { label: "Warning", count: "312", tone: "amber" },
  { label: "Error", count: "132", tone: "red" },
  { label: "DLQ", count: "46", tone: "rose" },
];

export const streamOrders = [
  {
    orderId: "ORD-8f3a7c2e",
    eventCount: "7 events",
    status: "COMPLETED",
    statusTone: "green",
    window: "10:09:12 - 10:14:32",
    duration: "5m 20s",
    events: [
      ["10:09:12.113", "INFO", "OrderCreatedEvent", "CREATED", "Order created successfully", "-", "No"],
      ["10:09:12.221", "INFO", "InventoryCheckStarted", "INVENTORY_CHECK_STARTED", "Inventory check initiated", "-", "No"],
      ["10:09:12.842", "INFO", "OrderReservedEvent", "RESERVED", "Inventory reserved for order", "-", "No"],
      ["10:09:13.105", "INFO", "ShippingPreparationStarted", "SHIPPING_PREPARATION_STARTED", "Shipping preparation started", "-", "No"],
      ["10:09:13.932", "INFO", "ShippingPreparedEvent", "SHIPPING_PREPARED", "Shipping preparation completed", "-", "No"],
      ["10:14:01.201", "INFO", "OrderFailureHandledEvent", "FAILURE_HANDLED", "Failure handled and compensated", "-", "No"],
      ["10:14:32.441", "INFO", "WorkflowCompleted", "FAILURE_HANDLED", "Workflow completed", "-", "No"],
    ],
  },
  {
    orderId: "ORD-7c1b9e21",
    eventCount: "9 events",
    status: "RETRYING",
    statusTone: "amber",
    window: "10:08:21 - 10:16:02",
    duration: "7m 41s",
    events: [
      ["10:08:21.031", "INFO", "OrderCreatedEvent", "CREATED", "Order created successfully", "-", "No"],
      ["10:08:21.144", "INFO", "InventoryCheckStarted", "INVENTORY_CHECK_STARTED", "Inventory check initiated", "-", "No"],
      ["10:08:21.741", "INFO", "OrderReservedEvent", "RESERVED", "Inventory reserved for order", "-", "No"],
      ["10:08:22.019", "INFO", "ShippingPreparationStarted", "SHIPPING_PREPARATION_STARTED", "Shipping preparation started", "-", "No"],
      ["10:08:27.512", "WARN", "ShippingRetryAttempt", "RETRYING_SHIPPING", "Shipping attempt failed, will retry", "1", "No"],
      ["10:08:37.884", "WARN", "ShippingRetryAttempt", "RETRYING_SHIPPING", "Shipping attempt failed, will retry", "2", "No"],
      ["10:08:48.201", "WARN", "ShippingRetryAttempt", "RETRYING_SHIPPING", "Shipping attempt failed, will retry", "3", "No"],
      ["10:16:02.312", "WARN", "ShippingRetryAttempt", "RETRYING_SHIPPING", "Shipping attempt failed, will retry", "4", "No"],
      ["10:16:02.315", "INFO", "MarkedForRetry", "RETRYING_SHIPPING", "Order will continue retrying", "4", "No"],
    ],
  },
  {
    orderId: "ORD-3a91d0f4",
    eventCount: "6 events",
    status: "DEAD LETTERED",
    statusTone: "red",
    window: "10:03:54 - 10:10:47",
    duration: "6m 53s",
    events: [
      ["10:03:54.884", "INFO", "OrderCreatedEvent", "CREATED", "Order created successfully", "-", "No"],
      ["10:03:54.991", "INFO", "InventoryCheckStarted", "INVENTORY_CHECK_STARTED", "Inventory check initiated", "-", "No"],
      ["10:03:55.612", "INFO", "OrderReservedEvent", "RESERVED", "Inventory reserved for order", "-", "No"],
      ["10:03:55.981", "INFO", "ShippingPreparationStarted", "SHIPPING_PREPARATION_STARTED", "Shipping preparation started", "-", "No"],
      ["10:04:01.222", "ERROR", "OrderFailedEvent", "FAILED", "Shipping provider unavailable", "-", "No"],
      ["10:10:47.558", "ERROR", "DeadLetteredEvent", "DEAD_LETTERED", "Max retries exceeded, routed to DLQ", "5", "Yes"],
    ],
  },
];

export const severityBreakdown = [
  { label: "INFO", value: "1,352", percent: "73.4%", width: "72%", tone: "green" },
  { label: "WARN", value: "312", percent: "17.0%", width: "24%", tone: "amber" },
  { label: "ERROR", value: "132", percent: "7.2%", width: "12%", tone: "red" },
  { label: "DLQ", value: "46", percent: "2.4%", width: "5%", tone: "rose" },
];

export const topEvents = [
  ["ShippingRetryAttempt", "356"],
  ["OrderCreatedEvent", "312"],
  ["InventoryCheckStarted", "312"],
  ["OrderReservedEvent", "312"],
  ["Others", "550"],
];
