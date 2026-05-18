package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderFailureHandledEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderFailedEventConsumer {

    private final FailureHandlingService failureHandlingService;
    private final FailureEventPublisher failureEventPublisher;
    private final OrderWorkflowStateService orderWorkflowStateService;

    public OrderFailedEventConsumer(FailureHandlingService failureHandlingService,
                                    FailureEventPublisher failureEventPublisher,
                                    OrderWorkflowStateService orderWorkflowStateService) {
        this.failureHandlingService = failureHandlingService;
        this.failureEventPublisher = failureEventPublisher;
        this.orderWorkflowStateService = orderWorkflowStateService;
    }

    public void handle(OrderFailedEvent event) {
        failureHandlingService.handleFailure(event.getProductId(), event.getQuantity(), event.getReason());
        orderWorkflowStateService.recordFailureHandled(Long.valueOf(event.getOrderId()));
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
