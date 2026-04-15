package com.example.orderservice.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class FailureHandlingServiceTest {

    private final FailureHandlingService failureHandlingService = new FailureHandlingService();

    @Test
    void shouldHandleFailureSuccessfully() {
        assertDoesNotThrow(() -> failureHandlingService.handleFailure("PROD-1", 10, "Out of stock"));
    }
}
