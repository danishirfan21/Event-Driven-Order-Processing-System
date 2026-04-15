package com.example.orderservice.service;

import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    public void reserveInventory(String productId, int quantity) {
        if (quantity > 5) {
            throw new RuntimeException("Inventory reservation failed for product: " + productId);
        }
    }
}
