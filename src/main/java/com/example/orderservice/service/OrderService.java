package com.example.orderservice.service;

import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OrderService {
    public OrderResponse createOrder(OrderRequest orderRequest) {
        return new OrderResponse(UUID.randomUUID().toString(), "CREATED");
    }
}
