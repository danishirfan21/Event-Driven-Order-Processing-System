package com.example.orderservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_workflow_states")
public class OrderWorkflowState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false, unique = true)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_stage", nullable = false)
    private WorkflowStage currentStage;

    @Column(name = "retry_count", nullable = false)
    private int retryCount;

    @Column(name = "max_retries", nullable = false)
    private int maxRetries = 3;

    @Column(name = "dlq_routed", nullable = false)
    private boolean dlqRouted;

    @Column(name = "last_error_message")
    private String lastErrorMessage;

    @Column(name = "last_event_name")
    private String lastEventName;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public OrderWorkflowState() {}

    public OrderWorkflowState(Long orderId, WorkflowStage currentStage, String lastEventName) {
        this.orderId = orderId;
        this.currentStage = currentStage;
        this.lastEventName = lastEventName;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.dlqRouted = false;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public WorkflowStage getCurrentStage() {
        return currentStage;
    }

    public void setCurrentStage(WorkflowStage currentStage) {
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

    public String getLastErrorMessage() {
        return lastErrorMessage;
    }

    public void setLastErrorMessage(String lastErrorMessage) {
        this.lastErrorMessage = lastErrorMessage;
    }

    public String getLastEventName() {
        return lastEventName;
    }

    public void setLastEventName(String lastEventName) {
        this.lastEventName = lastEventName;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
