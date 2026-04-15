package com.example.orderservice.service;

import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderStatusServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderStatusService orderStatusService;

    @Test
    void shouldMarkOrderAsReservedWhenOrderExists() {
        Long orderId = 1L;
        Order order = new Order("PROD-1", 2, "CREATED");
        order.setId(orderId);

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        orderStatusService.markReserved(orderId);

        assertEquals("RESERVED", order.getStatus());
        verify(orderRepository).save(order);
    }

    @Test
    void shouldMarkOrderAsFailedWhenOrderExists() {
        Long orderId = 1L;
        Order order = new Order("PROD-1", 2, "CREATED");
        order.setId(orderId);

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        orderStatusService.markFailed(orderId);

        assertEquals("FAILED", order.getStatus());
        verify(orderRepository).save(order);
    }

    @Test
    void shouldThrowExceptionWhenOrderNotFoundForMarkReserved() {
        Long orderId = 1L;
        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> orderStatusService.markReserved(orderId));
    }

    @Test
    void shouldThrowExceptionWhenOrderNotFoundForMarkFailed() {
        Long orderId = 1L;
        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> orderStatusService.markFailed(orderId));
    }
}
