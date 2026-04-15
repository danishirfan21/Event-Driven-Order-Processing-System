package com.example.orderservice.service;

import com.example.orderservice.dto.ShippingPreparedEvent;

public interface ShippingEventPublisher {
    void publishPrepared(ShippingPreparedEvent event);
}
