package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderFailureHandledEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderFailedEventConsumer {

    private final FailureHandlingService failureHandlingService;
    private final FailureEventPublisher failureEventPublisher;

    public OrderFailedEventConsumer(FailureHandlingService failureHandlingService, FailureEventPublisher failureEventPublisher) {
        this.failureHandlingService = failureHandlingService;
        this.failureEventPublisher = failureEventPublisher;
    }

    public void handle(OrderFailedEvent event) {
        failureHandlingService.handleFailure(event.getProductId(), event.getQuantity(), event.getReason());
        failureEventPublisher.publishHandled(new OrderFailureHandledEvent(
                event.getOrderId(),
                event.getProductId(),
                event.getQuantity(),
                "FAILURE_HANDLED",
                event.getReason()
        ));
    }

    @KafkaListener(topics = "order.failed", groupId = "failure-group")
    public void listen(OrderFailedEvent event) {
        handle(event);
    }
}
