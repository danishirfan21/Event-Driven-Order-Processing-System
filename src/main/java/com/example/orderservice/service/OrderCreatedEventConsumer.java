package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import org.springframework.stereotype.Component;

@Component
public class OrderCreatedEventConsumer {

    private final InventoryService inventoryService;

    public OrderCreatedEventConsumer(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    public void handle(OrderCreatedEvent event) {
        inventoryService.reserveInventory(event.getProductId(), event.getQuantity());
    }
}
