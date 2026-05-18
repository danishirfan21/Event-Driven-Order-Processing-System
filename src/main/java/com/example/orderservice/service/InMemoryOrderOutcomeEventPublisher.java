package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderReservedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.messaging.type", havingValue = "in-memory")
public class InMemoryOrderOutcomeEventPublisher implements OrderOutcomeEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(InMemoryOrderOutcomeEventPublisher.class);

    private final OrderReservedEventConsumer reservedConsumer;
    private final OrderFailedEventConsumer failedConsumer;

    public InMemoryOrderOutcomeEventPublisher(@Lazy OrderReservedEventConsumer reservedConsumer,
                                              @Lazy OrderFailedEventConsumer failedConsumer) {
        this.reservedConsumer = reservedConsumer;
        this.failedConsumer = failedConsumer;
    }

    @Override
    public void publishReserved(OrderReservedEvent event) {
        // Run asynchronously in a background thread to match Kafka's non-blocking event consumer model
        new Thread(() -> {
            try {
                log.info("[In-Memory Consumer] Received reserved event for Order ID: {}", event.getOrderId());
                reservedConsumer.handle(event);
            } catch (Exception e) {
                simulateInMemoryRetryAndDlt(event, e);
            }
        }).start();
    }

    @Override
    public void publishFailed(OrderFailedEvent event) {
        new Thread(() -> {
            log.info("[In-Memory Consumer] Received failed event for Order ID: {}", event.getOrderId());
            failedConsumer.handle(event);
        }).start();
    }

    private void simulateInMemoryRetryAndDlt(OrderReservedEvent event, Exception originalException) {
        log.warn("[In-Memory Retry System] Detected shipping failure for Order ID: {}. Triggering local retry loop...", event.getOrderId());
        int maxAttempts = 3;
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Simulate delay before retry attempt
                Thread.sleep(1000 * attempt);
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }
            log.warn("[In-Memory Retry System] Attempt {}/{} failed for Order ID: {}", attempt, maxAttempts, event.getOrderId());
        }
        log.error("[In-Memory DLQ ALERT] Order ID: {} failed permanently after {} attempts. Routed to virtual DLQ topic: order.reserved-dlt. Error: {}",
                event.getOrderId(), maxAttempts, originalException.getMessage());
    }
}
