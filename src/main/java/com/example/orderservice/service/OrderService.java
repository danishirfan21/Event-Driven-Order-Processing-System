package com.example.orderservice.service;

import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order(
                orderRequest.getProductId(),
                orderRequest.getQuantity(),
                "CREATED"
        );

        Order savedOrder = orderRepository.save(order);

        return new OrderResponse(savedOrder.getId().toString(), savedOrder.getStatus());
    }
}
