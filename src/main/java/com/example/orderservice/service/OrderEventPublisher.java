package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;

public interface OrderEventPublisher {
    void publish(OrderCreatedEvent event);
}
