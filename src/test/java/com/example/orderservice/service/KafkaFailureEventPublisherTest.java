package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailureHandledEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class KafkaFailureEventPublisherTest {

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private KafkaFailureEventPublisher publisher;

    @Test
    void shouldPublishHandledEventToCorrectTopic() {
        OrderFailureHandledEvent event = new OrderFailureHandledEvent("1", "PROD-1", 10, "FAILURE_HANDLED", "Out of stock");

        publisher.publishHandled(event);

        verify(kafkaTemplate).send("order.failure.handled", event);
    }
}
