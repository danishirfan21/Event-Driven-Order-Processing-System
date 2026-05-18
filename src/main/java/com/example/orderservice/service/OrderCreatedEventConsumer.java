package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderReservedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedEventConsumer {

    private final InventoryService inventoryService;
    private final OrderStatusService orderStatusService;
    private final OrderOutcomeEventPublisher orderOutcomeEventPublisher;
    private final OrderWorkflowStateService orderWorkflowStateService;

    public OrderCreatedEventConsumer(InventoryService inventoryService,
                                     OrderStatusService orderStatusService,
                                     OrderOutcomeEventPublisher orderOutcomeEventPublisher,
                                     OrderWorkflowStateService orderWorkflowStateService) {
        this.inventoryService = inventoryService;
        this.orderStatusService = orderStatusService;
        this.orderOutcomeEventPublisher = orderOutcomeEventPublisher;
        this.orderWorkflowStateService = orderWorkflowStateService;
    }

    public void handle(OrderCreatedEvent event) {
        Long orderId = Long.valueOf(event.getOrderId());
        try {
            orderWorkflowStateService.recordInventoryCheckStarted(orderId);
            inventoryService.reserveInventory(event.getProductId(), event.getQuantity());
            orderStatusService.markReserved(orderId);
            orderWorkflowStateService.recordReserved(orderId);
            orderOutcomeEventPublisher.publishReserved(new OrderReservedEvent(
                    event.getOrderId(),
                    event.getProductId(),
                    event.getQuantity(),
                    "RESERVED"
            ));
        } catch (Exception e) {
            orderStatusService.markFailed(orderId);
            orderWorkflowStateService.recordInventoryFailed(orderId, e.getMessage());
            orderOutcomeEventPublisher.publishFailed(new OrderFailedEvent(
                    event.getOrderId(),
                    event.getProductId(),
                    event.getQuantity(),
                    "FAILED",
                    e.getMessage()
            ));
            throw e;
        }
    }

    @KafkaListener(topics = "order.created", groupId = "inventory-group")
    public void listen(OrderCreatedEvent event) {
        handle(event);
    }
}
