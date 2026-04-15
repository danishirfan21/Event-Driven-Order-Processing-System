package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderFailureHandledEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.annotation.KafkaListener;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class OrderFailedEventConsumerTest {

    @Mock
    private FailureHandlingService failureHandlingService;

    @Mock
    private FailureEventPublisher failureEventPublisher;

    @InjectMocks
    private OrderFailedEventConsumer consumer;

    @Test
    void shouldHandleFailureAndPublishEventWhenFailedEventReceived() {
        OrderFailedEvent event = new OrderFailedEvent("1", "PROD-1", 10, "FAILED", "Out of stock");

        consumer.handle(event);

        verify(failureHandlingService).handleFailure("PROD-1", 10, "Out of stock");

        ArgumentCaptor<OrderFailureHandledEvent> eventCaptor = ArgumentCaptor.forClass(OrderFailureHandledEvent.class);
        verify(failureEventPublisher).publishHandled(eventCaptor.capture());

        OrderFailureHandledEvent publishedEvent = eventCaptor.getValue();
        assertEquals("1", publishedEvent.getOrderId());
        assertEquals("PROD-1", publishedEvent.getProductId());
        assertEquals(10, publishedEvent.getQuantity());
        assertEquals("FAILURE_HANDLED", publishedEvent.getStatus());
        assertEquals("Out of stock", publishedEvent.getReason());
    }

    @Test
    void shouldDelegateToHandleWhenListenIsCalled() {
        OrderFailedEvent event = new OrderFailedEvent("1", "PROD-1", 10, "FAILED", "Out of stock");
        OrderFailedEventConsumer spyConsumer = spy(consumer);

        spyConsumer.listen(event);

        verify(spyConsumer).handle(event);
    }

    @Test
    void listenMethodShouldHaveKafkaListenerAnnotation() throws NoSuchMethodException {
        Method method = OrderFailedEventConsumer.class.getMethod("listen", OrderFailedEvent.class);
        KafkaListener annotation = method.getAnnotation(KafkaListener.class);

        assertNotNull(annotation, "@KafkaListener annotation should be present on listen method");
        assertEquals("order.failed", annotation.topics()[0]);
        assertEquals("failure-group", annotation.groupId());
    }
}
