package com.example.orderservice.service;

import com.example.orderservice.dto.OrderFailedEvent;
import com.example.orderservice.dto.OrderReservedEvent;

public interface OrderOutcomeEventPublisher {
    void publishReserved(OrderReservedEvent event);
    void publishFailed(OrderFailedEvent event);
}
