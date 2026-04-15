package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class OrderCreatedEventConsumerTest {

    @Mock
    private InventoryService inventoryService;

    @InjectMocks
    private OrderCreatedEventConsumer consumer;

    @Test
    void shouldCallInventoryServiceWhenOrderCreatedEventReceived() {
        OrderCreatedEvent event = new OrderCreatedEvent("ORD-1", "PROD-1", 3, "CREATED");

        consumer.handle(event);

        verify(inventoryService).reserveInventory("PROD-1", 3);
    }

    @Test
    void shouldPropagateExceptionWhenInventoryReservationFails() {
        OrderCreatedEvent event = new OrderCreatedEvent("ORD-1", "PROD-1", 10, "CREATED");
        doThrow(new RuntimeException("Inventory failure"))
                .when(inventoryService).reserveInventory("PROD-1", 10);

        assertThrows(RuntimeException.class, () -> consumer.handle(event));
    }
}
