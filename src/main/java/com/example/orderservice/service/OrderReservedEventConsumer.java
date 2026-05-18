package com.example.orderservice.service;

import com.example.orderservice.dto.OrderReservedEvent;
import com.example.orderservice.dto.ShippingPreparedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.retry.annotation.Backoff;
import org.springframework.kafka.retrytopic.TopicSuffixingStrategy;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
public class OrderReservedEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(OrderReservedEventConsumer.class);

    private final ShippingService shippingService;
    private final ShippingEventPublisher shippingEventPublisher;

    public OrderReservedEventConsumer(ShippingService shippingService, ShippingEventPublisher shippingEventPublisher) {
        this.shippingService = shippingService;
        this.shippingEventPublisher = shippingEventPublisher;
    }

    public void handle(OrderReservedEvent event) {
        // Intentionally simulate downstream shipping failure under specific conditions
        if (event.getProductId() != null && (event.getProductId().contains("fail-shipping") || event.getQuantity() == 99)) {
            log.warn("[SHIPPING TRACE] Intentionally failing shipping preparation for Order ID: {}, Product: {}, Quantity: {}. Entering retry loop...",
                    event.getOrderId(), event.getProductId(), event.getQuantity());
            throw new RuntimeException("Simulated shipping service execution failure for product: " + event.getProductId());
        }

        shippingService.prepareShipping(event.getProductId(), event.getQuantity());
        shippingEventPublisher.publishPrepared(new ShippingPreparedEvent(
                event.getOrderId(),
                event.getProductId(),
                event.getQuantity(),
                "SHIPPING_PREPARED"
        ));
    }

    @RetryableTopic(
            attempts = "3",
            backoff = @Backoff(delay = 1000, multiplier = 2.0),
            topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_DELAY_VALUE,
            dltTopicSuffix = "-dlt"
    )
    @KafkaListener(topics = "order.reserved", groupId = "shipping-group")
    public void listen(OrderReservedEvent event) {
        log.info("[SHIPPING CONSUMER] Received reserved event for Order ID: {}", event.getOrderId());
        handle(event);
    }

    @DltHandler
    public void handleDlt(OrderReservedEvent event, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        log.error("[DLQ ALERT] Shipping failed permanently for Order ID: {} (Product: {}). Routed to dead letter topic: {}. Reason: Simulated shipping service exhaustion.",
                event.getOrderId(), event.getProductId(), topic);
    }
}
