package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderReservedEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class KafkaOrderOutcomeEventPublisherTest {

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private KafkaOrderOutcomeEventPublisher publisher;

    @Test
    void shouldPublishReservedEventToCorrectTopic() {
        OrderReservedEvent event = new OrderReservedEvent("1", "PROD-1", 3, "RESERVED");

        publisher.publishReserved(event);

        verify(kafkaTemplate).send("order.reserved", event);
    }

    @Test
    void shouldPublishFailedEventToCorrectTopic() {
        OrderFailedEvent event = new OrderFailedEvent("1", "PROD-1", 10, "FAILED", "Out of stock");

        publisher.publishFailed(event);

        verify(kafkaTemplate).send("order.failed", event);
    }
}
