package com.example.orderservice.model;

public enum WorkflowStage {
    CREATED,
    INVENTORY_CHECK_STARTED,
    RESERVED,
    SHIPPING_PREPARATION_STARTED,
    RETRYING_SHIPPING,
    SHIPPING_PREPARED,
    FAILED,
    FAILURE_HANDLED,
    DEAD_LETTERED
}
