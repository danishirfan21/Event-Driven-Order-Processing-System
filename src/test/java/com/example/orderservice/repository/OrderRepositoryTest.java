package com.example.orderservice.repository;

import com.example.orderservice.model.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import com.example.orderservice.config.JpaAuditingConfig;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Import(JpaAuditingConfig.class)
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void shouldSaveOrder() {
        Order order = new Order("prod-123", 2, "CREATED");

        Order savedOrder = orderRepository.save(order);

        assertNotNull(savedOrder.getId());
        assertEquals("prod-123", savedOrder.getProductId());
        assertEquals(2, savedOrder.getQuantity());
        assertEquals("CREATED", savedOrder.getStatus());
        assertNotNull(savedOrder.getCreatedAt(), "createdAt timestamp should be auto-populated");
        assertNotNull(savedOrder.getUpdatedAt(), "updatedAt timestamp should be auto-populated");
    }
}
