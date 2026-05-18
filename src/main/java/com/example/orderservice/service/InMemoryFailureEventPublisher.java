package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailureHandledEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.messaging.type", havingValue = "in-memory")
public class InMemoryFailureEventPublisher implements FailureEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(InMemoryFailureEventPublisher.class);

    @Override
    public void publishHandled(OrderFailureHandledEvent event) {
        log.info("InMemoryFailureEventPublisher: Failure handled successfully for order: {}. Reason: {}", event.getOrderId(), event.getReason());
    }
}
