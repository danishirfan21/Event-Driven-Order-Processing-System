package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.kafka.annotation.KafkaListener;

import java.lang.reflect.Method;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class OrderCreatedEventConsumerTest {

    @Mock
    private InventoryService inventoryService;

    @Mock
    private OrderStatusService orderStatusService;

    @InjectMocks
    private OrderCreatedEventConsumer consumer;

    @Test
    void shouldReserveInventoryAndMarkOrderAsReservedWhenReservationSucceeds() {
        OrderCreatedEvent event = new OrderCreatedEvent("1", "PROD-1", 3, "CREATED");

        consumer.handle(event);

        verify(inventoryService).reserveInventory("PROD-1", 3);
        verify(orderStatusService).markReserved(1L);
    }

    @Test
    void shouldMarkOrderAsFailedAndRethrowWhenReservationFails() {
        OrderCreatedEvent event = new OrderCreatedEvent("1", "PROD-1", 10, "CREATED");
        doThrow(new RuntimeException("Inventory failure"))
                .when(inventoryService).reserveInventory("PROD-1", 10);

        assertThrows(RuntimeException.class, () -> consumer.handle(event));
        verify(orderStatusService).markFailed(1L);
    }

    @Test
    void shouldDelegateToHandleWhenListenIsCalled() {
        OrderCreatedEvent event = new OrderCreatedEvent("1", "PROD-1", 3, "CREATED");
        OrderCreatedEventConsumer spyConsumer = spy(consumer);

        spyConsumer.listen(event);

        verify(spyConsumer).handle(event);
    }

    @Test
    void listenMethodShouldHaveKafkaListenerAnnotation() throws NoSuchMethodException {
        Method method = OrderCreatedEventConsumer.class.getMethod("listen", OrderCreatedEvent.class);
        KafkaListener annotation = method.getAnnotation(KafkaListener.class);

        assertNotNull(annotation, "@KafkaListener annotation should be present on listen method");
        assertEquals("order.created", annotation.topics()[0]);
        assertEquals("inventory-group", annotation.groupId());
    }
}
