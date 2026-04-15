package com.example.orderservice.service;

import com.example.orderservice.dto.OrderReservedEvent;
import com.example.orderservice.dto.ShippingPreparedEvent;
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
class OrderReservedEventConsumerTest {

    @Mock
    private ShippingService shippingService;

    @Mock
    private ShippingEventPublisher shippingEventPublisher;

    @InjectMocks
    private OrderReservedEventConsumer consumer;

    @Test
    void shouldPrepareShippingAndPublishEventWhenReservedEventReceived() {
        OrderReservedEvent event = new OrderReservedEvent("1", "PROD-1", 3, "RESERVED");

        consumer.handle(event);

        verify(shippingService).prepareShipping("PROD-1", 3);

        ArgumentCaptor<ShippingPreparedEvent> eventCaptor = ArgumentCaptor.forClass(ShippingPreparedEvent.class);
        verify(shippingEventPublisher).publishPrepared(eventCaptor.capture());

        ShippingPreparedEvent publishedEvent = eventCaptor.getValue();
        assertEquals("1", publishedEvent.getOrderId());
        assertEquals("PROD-1", publishedEvent.getProductId());
        assertEquals(3, publishedEvent.getQuantity());
        assertEquals("SHIPPING_PREPARED", publishedEvent.getStatus());
    }

    @Test
    void shouldDelegateToHandleWhenListenIsCalled() {
        OrderReservedEvent event = new OrderReservedEvent("1", "PROD-1", 3, "RESERVED");
        OrderReservedEventConsumer spyConsumer = spy(consumer);

        spyConsumer.listen(event);

        verify(spyConsumer).handle(event);
    }

    @Test
    void listenMethodShouldHaveKafkaListenerAnnotation() throws NoSuchMethodException {
        Method method = OrderReservedEventConsumer.class.getMethod("listen", OrderReservedEvent.class);
        KafkaListener annotation = method.getAnnotation(KafkaListener.class);

        assertNotNull(annotation, "@KafkaListener annotation should be present on listen method");
        assertEquals("order.reserved", annotation.topics()[0]);
        assertEquals("shipping-group", annotation.groupId());
    }
}
