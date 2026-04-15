package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailureHandledEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaFailureEventPublisher implements FailureEventPublisher {

    public static final String ORDER_FAILURE_HANDLED_TOPIC = "order.failure.handled";

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaFailureEventPublisher(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void publishHandled(OrderFailureHandledEvent event) {
        kafkaTemplate.send(ORDER_FAILURE_HANDLED_TOPIC, event);
    }
}
