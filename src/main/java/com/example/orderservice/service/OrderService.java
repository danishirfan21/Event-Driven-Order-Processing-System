package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;

    public OrderService(OrderRepository orderRepository, KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order(
                orderRequest.getProductId(),
                orderRequest.getQuantity(),
                "CREATED"
        );

        Order savedOrder = orderRepository.save(order);

        kafkaTemplate.send("order.created", new OrderCreatedEvent(
                savedOrder.getId().toString(),
                savedOrder.getProductId(),
                savedOrder.getQuantity(),
                savedOrder.getStatus()
        ));

        return new OrderResponse(savedOrder.getId().toString(), savedOrder.getStatus());
    }
}
