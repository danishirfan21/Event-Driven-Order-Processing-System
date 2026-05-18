package com.example.orderservice.service;

import com.example.orderservice.model.OrderWorkflowState;
import com.example.orderservice.model.OrderWorkflowEvent;
import com.example.orderservice.model.WorkflowStage;
import com.example.orderservice.repository.OrderWorkflowStateRepository;
import com.example.orderservice.repository.OrderWorkflowEventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderWorkflowStateService {

    private static final Logger log = LoggerFactory.getLogger(OrderWorkflowStateService.class);

    private final OrderWorkflowStateRepository repository;
    private final OrderWorkflowEventRepository eventRepository;

    public OrderWorkflowStateService(OrderWorkflowStateRepository repository, OrderWorkflowEventRepository eventRepository) {
        this.repository = repository;
        this.eventRepository = eventRepository;
    }

    private OrderWorkflowState getOrCreateState(Long orderId, WorkflowStage initialStage, String lastEventName) {
        return repository.findByOrderId(orderId)
                .orElseGet(() -> {
                    log.info("[Workflow State] Initializing state for Order ID: {} with stage: {}", orderId, initialStage);
                    OrderWorkflowState state = new OrderWorkflowState(orderId, initialStage, lastEventName);
                    return repository.save(state);
                });
    }

    private void saveEvent(Long orderId, String eventName, WorkflowStage stage, String message, String severity, int retryAttempt, boolean dlqEvent) {
        OrderWorkflowEvent event = new OrderWorkflowEvent(orderId, eventName, stage, message, severity, retryAttempt, dlqEvent);
        eventRepository.save(event);
    }

    @Transactional
    public void recordCreated(Long orderId) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.CREATED, "OrderCreatedEvent");
        state.setCurrentStage(WorkflowStage.CREATED);
        state.setRetryCount(0);
        state.setDlqRouted(false);
        state.setLastEventName("OrderCreatedEvent");
        state.setLastErrorMessage(null);
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to CREATED", orderId);
        saveEvent(orderId, "OrderCreatedEvent", WorkflowStage.CREATED, "OrderCreatedEvent published; initialized workflow state.", "INFO", 0, false);
    }

    @Transactional
    public void recordInventoryCheckStarted(Long orderId) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.INVENTORY_CHECK_STARTED, "OrderCreatedEvent");
        state.setCurrentStage(WorkflowStage.INVENTORY_CHECK_STARTED);
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to INVENTORY_CHECK_STARTED", orderId);
        saveEvent(orderId, "InventoryCheckStarted", WorkflowStage.INVENTORY_CHECK_STARTED, "Inventory reservation check started.", "INFO", 0, false);
    }

    @Transactional
    public void recordReserved(Long orderId) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.RESERVED, "OrderReservedEvent");
        state.setCurrentStage(WorkflowStage.RESERVED);
        state.setLastEventName("OrderReservedEvent");
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to RESERVED", orderId);
        saveEvent(orderId, "OrderReservedEvent", WorkflowStage.RESERVED, "Inventory reservation succeeded; stock secured.", "INFO", 0, false);
    }

    @Transactional
    public void recordInventoryFailed(Long orderId, String errorMessage) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.FAILED, "OrderFailedEvent");
        state.setCurrentStage(WorkflowStage.FAILED);
        state.setLastEventName("OrderFailedEvent");
        state.setLastErrorMessage(errorMessage);
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to FAILED (Reason: {})", orderId, errorMessage);
        saveEvent(orderId, "OrderFailedEvent", WorkflowStage.FAILED, "Inventory reservation failed: " + errorMessage, "ERROR", 0, false);
    }

    @Transactional
    public void recordShippingPreparationStarted(Long orderId) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.SHIPPING_PREPARATION_STARTED, "OrderReservedEvent");
        state.setCurrentStage(WorkflowStage.SHIPPING_PREPARATION_STARTED);
        state.setLastEventName("OrderReservedEvent");
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to SHIPPING_PREPARATION_STARTED", orderId);
        saveEvent(orderId, "ShippingPreparationStarted", WorkflowStage.SHIPPING_PREPARATION_STARTED, "Shipping preparation started; dispatching to logistics.", "INFO", 0, false);
    }

    @Transactional
    public void recordShippingAttempt(Long orderId, Integer deliveryAttempt, String topic, String errorMessage) {
        if (deliveryAttempt != null && deliveryAttempt > 1) {
            recordShippingRetry(orderId, deliveryAttempt - 1, errorMessage);
        } else if (topic != null && topic.contains("retry")) {
            OrderWorkflowState state = repository.findByOrderId(orderId).orElse(null);
            int currentRetry = (state != null) ? state.getRetryCount() : 0;
            recordShippingRetry(orderId, currentRetry + 1, errorMessage);
        } else {
            recordShippingPreparationStarted(orderId);
        }
    }

    @Transactional
    public void recordShippingRetry(Long orderId, int attempt, String errorMessage) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.RETRYING_SHIPPING, "OrderReservedEvent");
        state.setCurrentStage(WorkflowStage.RETRYING_SHIPPING);
        state.setRetryCount(attempt);
        state.setLastEventName("OrderReservedEvent");
        state.setLastErrorMessage(errorMessage);
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to RETRYING_SHIPPING (Attempt: {}/{}, Error: {})",
                orderId, attempt, state.getMaxRetries(), errorMessage);
        saveEvent(orderId, "ShippingRetryAttempt", WorkflowStage.RETRYING_SHIPPING, "Shipping retry attempt " + attempt + "/3 failed: " + errorMessage, "WARN", attempt, false);
    }

    @Transactional
    public void recordShippingPrepared(Long orderId) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.SHIPPING_PREPARED, "ShippingPreparedEvent");
        state.setCurrentStage(WorkflowStage.SHIPPING_PREPARED);
        state.setLastEventName("ShippingPreparedEvent");
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to SHIPPING_PREPARED", orderId);
        int currentRetry = state.getRetryCount();
        saveEvent(orderId, "ShippingPreparedEvent", WorkflowStage.SHIPPING_PREPARED, "Shipping prepared successfully; order ready for delivery.", "INFO", currentRetry, false);
    }

    @Transactional
    public void recordDeadLettered(Long orderId, String dltTopic, String errorMessage) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.DEAD_LETTERED, dltTopic);
        state.setCurrentStage(WorkflowStage.DEAD_LETTERED);
        state.setDlqRouted(true);
        state.setLastEventName(dltTopic);
        state.setLastErrorMessage(errorMessage);
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.error("[Workflow State] Permanent failure. Order ID: {} routed to Dead Letter Queue: {} (Error: {})",
                orderId, dltTopic, errorMessage);
        saveEvent(orderId, "DeadLetteredEvent", WorkflowStage.DEAD_LETTERED, "Retries exhausted; routed to DLQ topic: " + dltTopic + ". Reason: " + errorMessage, "ERROR", state.getRetryCount(), true);
    }

    @Transactional
    public void recordFailureHandled(Long orderId) {
        OrderWorkflowState state = getOrCreateState(orderId, WorkflowStage.FAILURE_HANDLED, "OrderFailureHandledEvent");
        state.setCurrentStage(WorkflowStage.FAILURE_HANDLED);
        state.setLastEventName("OrderFailureHandledEvent");
        state.setUpdatedAt(LocalDateTime.now());
        repository.save(state);
        log.info("[Workflow State] Updated Order ID: {} to FAILURE_HANDLED", orderId);
        saveEvent(orderId, "OrderFailureHandledEvent", WorkflowStage.FAILURE_HANDLED, "Compensating transaction finalized; system state reconciled.", "INFO", 0, false);
    }

    @Transactional(readOnly = true)
    public Optional<OrderWorkflowState> getWorkflowStateByOrderId(Long orderId) {
        return repository.findByOrderId(orderId);
    }

    @Transactional(readOnly = true)
    public List<OrderWorkflowState> getAllWorkflowStates() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public List<OrderWorkflowEvent> getEventsByOrderId(Long orderId) {
        return eventRepository.findByOrderIdOrderByIdAsc(orderId);
    }

    @Transactional(readOnly = true)
    public List<OrderWorkflowEvent> getRecentEvents() {
        return eventRepository.findTop50ByOrderByIdDesc();
    }
}
