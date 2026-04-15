package com.example.orderservice.service;

import com.example.orderservice.dto.ShippingPreparedEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class KafkaShippingEventPublisherTest {

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private KafkaShippingEventPublisher publisher;

    @Test
    void shouldPublishPreparedEventToCorrectTopic() {
        ShippingPreparedEvent event = new ShippingPreparedEvent("1", "PROD-1", 3, "SHIPPING_PREPARED");

        publisher.publishPrepared(event);

        verify(kafkaTemplate).send("shipping.prepared", event);
    }
}
