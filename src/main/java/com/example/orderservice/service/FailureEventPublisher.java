package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailureHandledEvent;

public interface FailureEventPublisher {
    void publishHandled(OrderFailureHandledEvent event);
}
