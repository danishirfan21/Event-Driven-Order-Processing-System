package com.example.orderservice.service;

import com.example.orderservice.dto.ShippingPreparedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaShippingEventPublisher implements ShippingEventPublisher {

    public static final String SHIPPING_PREPARED_TOPIC = "shipping.prepared";

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaShippingEventPublisher(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void publishPrepared(ShippingPreparedEvent event) {
        kafkaTemplate.send(SHIPPING_PREPARED_TOPIC, event);
    }
}
