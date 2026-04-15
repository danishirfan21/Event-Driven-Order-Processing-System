package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedEventConsumer {

    private final InventoryService inventoryService;
    private final OrderStatusService orderStatusService;

    public OrderCreatedEventConsumer(InventoryService inventoryService, OrderStatusService orderStatusService) {
        this.inventoryService = inventoryService;
        this.orderStatusService = orderStatusService;
    }

    public void handle(OrderCreatedEvent event) {
        try {
            inventoryService.reserveInventory(event.getProductId(), event.getQuantity());
            orderStatusService.markReserved(Long.valueOf(event.getOrderId()));
        } catch (Exception e) {
            orderStatusService.markFailed(Long.valueOf(event.getOrderId()));
            throw e;
        }
    }

    @KafkaListener(topics = "order.created", groupId = "inventory-group")
    public void listen(OrderCreatedEvent event) {
        handle(event);
    }
}
