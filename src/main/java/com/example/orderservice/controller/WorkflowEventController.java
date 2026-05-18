package com.example.orderservice.controller;

import com.example.orderservice.dto.OrderWorkflowEventResponse;
import com.example.orderservice.service.OrderWorkflowStateService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class WorkflowEventController {

    private final OrderWorkflowStateService workflowStateService;

    public WorkflowEventController(OrderWorkflowStateService workflowStateService) {
        this.workflowStateService = workflowStateService;
    }

    @GetMapping("/orders/{id}/events")
    public List<OrderWorkflowEventResponse> getEventsByOrderId(@PathVariable Long id) {
        return workflowStateService.getEventsByOrderId(id).stream()
                .map(OrderWorkflowEventResponse::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/events/recent")
    public List<OrderWorkflowEventResponse> getRecentEvents() {
        return workflowStateService.getRecentEvents().stream()
                .map(OrderWorkflowEventResponse::new)
                .collect(Collectors.toList());
    }
}
