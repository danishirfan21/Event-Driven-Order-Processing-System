package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderEventPublisher orderEventPublisher;

    public OrderService(OrderRepository orderRepository, OrderEventPublisher orderEventPublisher) {
        this.orderRepository = orderRepository;
        this.orderEventPublisher = orderEventPublisher;
    }

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order(
                orderRequest.getProductId(),
                orderRequest.getQuantity(),
                "CREATED"
        );

        Order savedOrder = orderRepository.save(order);

        orderEventPublisher.publish(new OrderCreatedEvent(
                savedOrder.getId().toString(),
                savedOrder.getProductId(),
                savedOrder.getQuantity(),
                savedOrder.getStatus()
        ));

        return new OrderResponse(savedOrder.getId().toString(), savedOrder.getStatus());
    }
}
