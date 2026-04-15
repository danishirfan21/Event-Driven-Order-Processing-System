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

    public OrderCreatedEventConsumer(InventoryService inventoryService,
                                     OrderStatusService orderStatusService,
                                     OrderOutcomeEventPublisher orderOutcomeEventPublisher) {
        this.inventoryService = inventoryService;
        this.orderStatusService = orderStatusService;
        this.orderOutcomeEventPublisher = orderOutcomeEventPublisher;
    }

    public void handle(OrderCreatedEvent event) {
        try {
            inventoryService.reserveInventory(event.getProductId(), event.getQuantity());
            orderStatusService.markReserved(Long.valueOf(event.getOrderId()));
            orderOutcomeEventPublisher.publishReserved(new OrderReservedEvent(
                    event.getOrderId(),
                    event.getProductId(),
                    event.getQuantity(),
                    "RESERVED"
            ));
        } catch (Exception e) {
            orderStatusService.markFailed(Long.valueOf(event.getOrderId()));
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
