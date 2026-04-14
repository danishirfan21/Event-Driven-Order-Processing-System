package com.example.orderservice.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.service.OrderService;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Test
    void shouldCreateOrder() throws Exception {
        OrderResponse response = new OrderResponse("order-123", "CREATED");
        when(orderService.createOrder(any())).thenReturn(response);

        String orderRequest = """
                {
                    "productId": "prod-123",
                    "quantity": 2
                }
                """;

        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.orderId").value("order-123"))
                .andExpect(jsonPath("$.status").value("CREATED"));
    }

    @Test
    void shouldReturn400WhenProductIdIsBlank() throws Exception {
        String orderRequest = """
                {
                    "productId": "",
                    "quantity": 2
                }
                """;

        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"));
    }

    @Test
    void shouldReturn400WhenQuantityIsZero() throws Exception {
        String orderRequest = """
                {
                    "productId": "prod-123",
                    "quantity": 0
                }
                """;

        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"));
    }

    @Test
    void shouldReturn400WhenQuantityIsNegative() throws Exception {
        String orderRequest = """
                {
                    "productId": "prod-123",
                    "quantity": -1
                }
                """;

        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"));
    }

    @Test
    void shouldReturn400WhenProductIdIsNull() throws Exception {
        String orderRequest = """
                {
                    "productId": null,
                    "quantity": 2
                }
                """;

        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"));
    }
}
