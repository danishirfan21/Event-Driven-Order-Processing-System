package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.messaging.type", havingValue = "in-memory")
public class InMemoryOrderEventPublisher implements OrderEventPublisher {

    private final OrderCreatedEventConsumer consumer;

    public InMemoryOrderEventPublisher(@Lazy OrderCreatedEventConsumer consumer) {
        this.consumer = consumer;
    }

    @Override
    public void publish(OrderCreatedEvent event) {
        consumer.handle(event);
    }
}
