package com.example.orderservice.service;

import com.example.orderservice.dto.OrderCreatedEvent;
import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderEventPublisher orderEventPublisher;
    private final OrderWorkflowStateService orderWorkflowStateService;

    public OrderService(OrderRepository orderRepository,
                        OrderEventPublisher orderEventPublisher,
                        OrderWorkflowStateService orderWorkflowStateService) {
        this.orderRepository = orderRepository;
        this.orderEventPublisher = orderEventPublisher;
        this.orderWorkflowStateService = orderWorkflowStateService;
    }

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order(
                orderRequest.getProductId(),
                orderRequest.getQuantity(),
                "CREATED"
        );

        Order savedOrder = orderRepository.save(order);

        // Initialize dynamic workflow state
        orderWorkflowStateService.recordCreated(savedOrder.getId());

        orderEventPublisher.publish(new OrderCreatedEvent(
                savedOrder.getId().toString(),
                savedOrder.getProductId(),
                savedOrder.getQuantity(),
                savedOrder.getStatus()
        ));

        return new OrderResponse(savedOrder.getId().toString(), savedOrder.getStatus());
    }

    public java.util.List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new com.example.orderservice.exception.OrderNotFoundException("Order not found with ID: " + id));
    }
}
