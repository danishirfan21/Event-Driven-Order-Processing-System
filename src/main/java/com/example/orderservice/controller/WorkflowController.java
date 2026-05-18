package com.example.orderservice.controller;

import com.example.orderservice.dto.OrderWorkflowStateResponse;
import com.example.orderservice.service.OrderWorkflowStateService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class WorkflowController {

    private final OrderWorkflowStateService workflowStateService;

    public WorkflowController(OrderWorkflowStateService workflowStateService) {
        this.workflowStateService = workflowStateService;
    }

    @GetMapping("/{id}/workflow")
    public OrderWorkflowStateResponse getWorkflowStateByOrderId(@PathVariable Long id) {
        return workflowStateService.getWorkflowStateByOrderId(id)
                .map(OrderWorkflowStateResponse::new)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workflow state not found for Order ID: " + id));
    }

    @GetMapping("/workflows")
    public List<OrderWorkflowStateResponse> getAllWorkflowStates() {
        return workflowStateService.getAllWorkflowStates().stream()
                .map(OrderWorkflowStateResponse::new)
                .collect(Collectors.toList());
    }
}
