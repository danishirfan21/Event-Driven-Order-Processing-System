package com.example.orderservice.service;

import org.springframework.stereotype.Service;

@Service
public class FailureHandlingService {

    public void handleFailure(String productId, int quantity, String reason) {
        // Simulation: always succeeds for now
    }
}
