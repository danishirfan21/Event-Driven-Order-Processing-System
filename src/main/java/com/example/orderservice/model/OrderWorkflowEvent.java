package com.example.orderservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_workflow_events")
public class OrderWorkflowEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Enumerated(EnumType.STRING)
    @Column(name = "stage", nullable = false)
    private WorkflowStage stage;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "severity", nullable = false)
    private String severity; // INFO, WARN, ERROR

    @Column(name = "retry_attempt", nullable = false)
    private int retryAttempt;

    @Column(name = "dlq_event", nullable = false)
    private boolean dlqEvent;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public OrderWorkflowEvent() {}

    public OrderWorkflowEvent(Long orderId, String eventName, WorkflowStage stage, String message, String severity, int retryAttempt, boolean dlqEvent) {
        this.orderId = orderId;
        this.eventName = eventName;
        this.stage = stage;
        this.message = message;
        this.severity = severity;
        this.retryAttempt = retryAttempt;
        this.dlqEvent = dlqEvent;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
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

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public WorkflowStage getStage() {
        return stage;
    }

    public void setStage(WorkflowStage stage) {
        this.stage = stage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
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
