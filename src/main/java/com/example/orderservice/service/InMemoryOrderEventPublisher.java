package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.messaging.type", havingValue = "in-memory")
public class InMemoryOrderEventPublisher implements OrderEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(InMemoryOrderEventPublisher.class);
    private final OrderCreatedEventConsumer consumer;

    public InMemoryOrderEventPublisher(@Lazy OrderCreatedEventConsumer consumer) {
        this.consumer = consumer;
    }

    @Override
    public void publish(OrderCreatedEvent event) {
        // Run asynchronously in a background thread to fully align with the non-blocking Kafka routing model
        new Thread(() -> {
            try {
                log.info("[In-Memory Publisher] Asynchronously dispatching OrderCreatedEvent for ID: {}", event.getOrderId());
                consumer.handle(event);
            } catch (Exception e) {
                log.error("[In-Memory Publisher] Error during asynchronous execution of OrderCreatedEvent: {}", e.getMessage());
            }
        }).start();
    }
}
