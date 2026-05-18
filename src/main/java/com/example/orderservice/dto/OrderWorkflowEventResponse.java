package com.example.orderservice.dto;

import com.example.orderservice.model.OrderWorkflowEvent;
import java.time.LocalDateTime;

public class OrderWorkflowEventResponse {
    private Long orderId;
    private String eventName;
    private String stage;
    private String severity;
    private String message;
    private int retryAttempt;
    private boolean dlqEvent;
    private LocalDateTime createdAt;

    public OrderWorkflowEventResponse() {}

    public OrderWorkflowEventResponse(OrderWorkflowEvent event) {
        this.orderId = event.getOrderId();
        this.eventName = event.getEventName();
        this.stage = event.getStage().name();
        this.severity = event.getSeverity();
        this.message = event.getMessage();
        this.retryAttempt = event.getRetryAttempt();
        this.dlqEvent = event.isDlqEvent();
        this.createdAt = event.getCreatedAt();
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getRetryAttempt() {
        return retryAttempt;
    }

    public void setRetryAttempt(int retryAttempt) {
        this.retryAttempt = retryAttempt;
    }

    public boolean isDlqEvent() {
        return dlqEvent;
    }

    public void setDlqEvent(boolean dlqEvent) {
        this.dlqEvent = dlqEvent;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
