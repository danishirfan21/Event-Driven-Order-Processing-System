package com.example.orderservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class OrderRequest {
    @NotBlank(message = "Product ID is required")
    private String productId;

    @Positive(message = "Quantity must be greater than zero")
    private int quantity;

    public OrderRequest() {}

    public OrderRequest(String productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
