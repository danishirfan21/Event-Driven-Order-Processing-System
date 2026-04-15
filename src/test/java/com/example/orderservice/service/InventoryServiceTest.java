package com.example.orderservice.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class InventoryServiceTest {

    private final InventoryService inventoryService = new InventoryService();

    @Test
    void shouldReserveInventoryWhenQuantityIsFiveOrLess() {
        assertDoesNotThrow(() -> inventoryService.reserveInventory("PROD-1", 5));
    }

    @Test
    void shouldThrowExceptionWhenQuantityIsGreaterThanFive() {
        assertThrows(RuntimeException.class, () -> inventoryService.reserveInventory("PROD-1", 6));
    }
}
