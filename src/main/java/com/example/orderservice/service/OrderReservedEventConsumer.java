package com.example.orderservice.service;

import com.example.orderservice.dto.OrderReservedEvent;
import com.example.orderservice.dto.ShippingPreparedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderReservedEventConsumer {

    private final ShippingService shippingService;
    private final ShippingEventPublisher shippingEventPublisher;

    public OrderReservedEventConsumer(ShippingService shippingService, ShippingEventPublisher shippingEventPublisher) {
        this.shippingService = shippingService;
        this.shippingEventPublisher = shippingEventPublisher;
    }

    public void handle(OrderReservedEvent event) {
        shippingService.prepareShipping(event.getProductId(), event.getQuantity());
        shippingEventPublisher.publishPrepared(new ShippingPreparedEvent(
                event.getOrderId(),
                event.getProductId(),
                event.getQuantity(),
                "SHIPPING_PREPARED"
        ));
    }

    @KafkaListener(topics = "order.reserved", groupId = "shipping-group")
    public void listen(OrderReservedEvent event) {
        handle(event);
    }
}
