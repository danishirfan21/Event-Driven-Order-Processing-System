package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;

    @InjectMocks
    private OrderService orderService;

    @Captor
    private ArgumentCaptor<Order> orderCaptor;

    @Captor
    private ArgumentCaptor<OrderCreatedEvent> eventCaptor;

    @Test
    void shouldCreateOrder() {
        OrderRequest request = new OrderRequest("prod-123", 2);
        Order savedOrder = new Order("prod-123", 2, "CREATED");
        savedOrder.setId(1L);

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        OrderResponse response = orderService.createOrder(request);

        assertNotNull(response.getOrderId());
        assertEquals("CREATED", response.getStatus());

        verify(orderRepository).save(orderCaptor.capture());
        Order capturedOrder = orderCaptor.getValue();
        assertEquals("prod-123", capturedOrder.getProductId());
        assertEquals(2, capturedOrder.getQuantity());
        assertEquals("CREATED", capturedOrder.getStatus());
    }

    @Test
    void shouldPublishOrderCreatedEvent() {
        OrderRequest request = new OrderRequest("prod-123", 2);
        Order savedOrder = new Order("prod-123", 2, "CREATED");
        savedOrder.setId(1L);

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orderService.createOrder(request);

        verify(kafkaTemplate).send(eq("order.created"), eventCaptor.capture());
        OrderCreatedEvent event = eventCaptor.getValue();
        assertEquals("1", event.getOrderId());
        assertEquals("prod-123", event.getProductId());
        assertEquals(2, event.getQuantity());
        assertEquals("CREATED", event.getStatus());
    }
}
