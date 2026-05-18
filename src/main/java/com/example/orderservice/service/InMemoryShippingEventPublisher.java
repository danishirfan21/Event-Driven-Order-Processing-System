package com.example.orderservice.service;

import com.example.orderservice.dto.ShippingPreparedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.messaging.type", havingValue = "in-memory")
public class InMemoryShippingEventPublisher implements ShippingEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(InMemoryShippingEventPublisher.class);

    @Override
    public void publishPrepared(ShippingPreparedEvent event) {
        log.info("InMemoryShippingEventPublisher: Shipping prepared successfully for order: {}", event.getOrderId());
    }
}
