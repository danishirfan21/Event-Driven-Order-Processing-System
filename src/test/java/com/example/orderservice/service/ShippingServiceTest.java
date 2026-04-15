package com.example.orderservice.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class ShippingServiceTest {

    private final ShippingService shippingService = new ShippingService();

    @Test
    void shouldPrepareShippingSuccessfully() {
        assertDoesNotThrow(() -> shippingService.prepareShipping("PROD-1", 3));
    }
}
