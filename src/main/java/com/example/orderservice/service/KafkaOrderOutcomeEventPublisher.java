package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderReservedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaOrderOutcomeEventPublisher implements OrderOutcomeEventPublisher {

    public static final String ORDER_RESERVED_TOPIC = "order.reserved";
    public static final String ORDER_FAILED_TOPIC = "order.failed";

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaOrderOutcomeEventPublisher(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void publishReserved(OrderReservedEvent event) {
        kafkaTemplate.send(ORDER_RESERVED_TOPIC, event);
    }

    @Override
    public void publishFailed(OrderFailedEvent event) {
        kafkaTemplate.send(ORDER_FAILED_TOPIC, event);
    }
}
