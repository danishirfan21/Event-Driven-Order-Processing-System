package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderReservedEvent;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "app.messaging.type", havingValue = "in-memory")
public class InMemoryOrderOutcomeEventPublisher implements OrderOutcomeEventPublisher {

    private final OrderReservedEventConsumer reservedConsumer;
    private final OrderFailedEventConsumer failedConsumer;

    public InMemoryOrderOutcomeEventPublisher(@Lazy OrderReservedEventConsumer reservedConsumer,
                                              @Lazy OrderFailedEventConsumer failedConsumer) {
        this.reservedConsumer = reservedConsumer;
        this.failedConsumer = failedConsumer;
    }

    @Override
    public void publishReserved(OrderReservedEvent event) {
        reservedConsumer.handle(event);
    }

    @Override
    public void publishFailed(OrderFailedEvent event) {
        failedConsumer.handle(event);
    }
}
