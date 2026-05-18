package com.example.orderservice.repository;

import com.example.orderservice.model.OrderWorkflowEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderWorkflowEventRepository extends JpaRepository<OrderWorkflowEvent, Long> {
    List<OrderWorkflowEvent> findByOrderIdOrderByIdAsc(Long orderId);
    List<OrderWorkflowEvent> findTop50ByOrderByIdDesc();
}
