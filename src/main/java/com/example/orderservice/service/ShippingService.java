package com.example.orderservice.service;

import org.springframework.stereotype.Service;

@Service
public class ShippingService {

    public void prepareShipping(String productId, int quantity) {
        // Simulation: always succeeds for now
    }
}
