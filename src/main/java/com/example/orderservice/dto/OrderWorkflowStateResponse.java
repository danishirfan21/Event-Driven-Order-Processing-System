package com.example.orderservice.dto;

import com.example.orderservice.model.OrderWorkflowState;
import java.time.LocalDateTime;

public class OrderWorkflowStateResponse {

    private Long orderId;
    private String currentStage;
    private int retryCount;
    private int maxRetries;
    private boolean dlqRouted;
    private String lastEventName;
    private String lastErrorMessage;
    private LocalDateTime updatedAt;

    public OrderWorkflowStateResponse() {}

    public OrderWorkflowStateResponse(OrderWorkflowState state) {
        this.orderId = state.getOrderId();
        this.currentStage = state.getCurrentStage().name();
        this.retryCount = state.getRetryCount();
        this.maxRetries = state.getMaxRetries();
        this.dlqRouted = state.isDlqRouted();
        this.lastEventName = state.getLastEventName();
        this.lastErrorMessage = state.getLastErrorMessage();
        this.updatedAt = state.getUpdatedAt();
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCurrentStage() {
        return currentStage;
    }

    public void setCurrentStage(String currentStage) {
        this.currentStage = currentStage;
    }

    public int getRetryCount() {
        return retryCount;
    }

    public void setRetryCount(int retryCount) {
        this.retryCount = retryCount;
    }

    public int getMaxRetries() {
        return maxRetries;
    }

    public void setMaxRetries(int maxRetries) {
        this.maxRetries = maxRetries;
    }

    public boolean isDlqRouted() {
        return dlqRouted;
    }

    public void setDlqRouted(boolean dlqRouted) {
        this.dlqRouted = dlqRouted;
    }

    public String getLastEventName() {
        return lastEventName;
    }

    public void setLastEventName(String lastEventName) {
        this.lastEventName = lastEventName;
    }

    public String getLastErrorMessage() {
        return lastErrorMessage;
    }

    public void setLastErrorMessage(String lastErrorMessage) {
        this.lastErrorMessage = lastErrorMessage;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
