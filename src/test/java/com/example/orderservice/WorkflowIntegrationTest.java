package com.example.orderservice;

import com.example.orderservice.model.WorkflowStage;
import com.example.orderservice.repository.OrderWorkflowStateRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class WorkflowIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderWorkflowStateRepository workflowRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void clearDatabase() {
        workflowRepository.deleteAll();
    }

    @Test
    void shouldTrackWorkflowForSuccessfulHappyPath() throws Exception {
        String orderRequest = """
                {
                    "productId": "prod-happy",
                    "quantity": 3
                }
                """;

        MvcResult result = mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        Map<?, ?> map = objectMapper.readValue(responseBody, Map.class);
        Long orderId = Long.valueOf((String) map.get("orderId"));

        // Let background processes complete
        Thread.sleep(1500);

        // Fetch workflow state
        mockMvc.perform(get("/orders/{id}/workflow", orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(orderId))
                .andExpect(jsonPath("$.currentStage").value("SHIPPING_PREPARED"))
                .andExpect(jsonPath("$.retryCount").value(0))
                .andExpect(jsonPath("$.dlqRouted").value(false));
    }

    @Test
    void shouldTrackWorkflowForInventoryFailureAndCompensation() throws Exception {
        // Quantity > 5 triggers inventory reservation failure
        String orderRequest = """
                {
                    "productId": "prod-fail-inv",
                    "quantity": 6
                }
                """;

        MvcResult result = mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        Map<?, ?> map = objectMapper.readValue(responseBody, Map.class);
        Long orderId = Long.valueOf((String) map.get("orderId"));

        Thread.sleep(1500);

        // Fetch workflow state -> should be FAILURE_HANDLED
        mockMvc.perform(get("/orders/{id}/workflow", orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(orderId))
                .andExpect(jsonPath("$.currentStage").value("FAILURE_HANDLED"))
                .andExpect(jsonPath("$.lastErrorMessage").value("Inventory reservation failed for product: prod-fail-inv"))
                .andExpect(jsonPath("$.dlqRouted").value(false));
    }

    @Test
    void shouldTrackWorkflowWithRetriesAndDLQOnShippingFailure() throws Exception {
        // Product ID contains "fail-shipping" triggers downstream shipping failures
        String orderRequest = """
                {
                    "productId": "prod-fail-shipping",
                    "quantity": 2
                }
                """;

        MvcResult result = mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(orderRequest))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        Map<?, ?> map = objectMapper.readValue(responseBody, Map.class);
        Long orderId = Long.valueOf((String) map.get("orderId"));

        // Let retries and dead-letter queue routing run (takes around 6-7 seconds in simulation)
        Thread.sleep(8500);

        // Fetch workflow state -> should be DEAD_LETTERED with retryCount = 3
        mockMvc.perform(get("/orders/{id}/workflow", orderId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(orderId))
                .andExpect(jsonPath("$.currentStage").value("DEAD_LETTERED"))
                .andExpect(jsonPath("$.retryCount").value(3))
                .andExpect(jsonPath("$.dlqRouted").value(true))
                .andExpect(jsonPath("$.lastErrorMessage").exists());
    }

    @Test
    void shouldListAllWorkflowStates() throws Exception {
        // Create two orders
        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"productId\": \"p1\", \"quantity\": 1}"))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"productId\": \"p2\", \"quantity\": 2}"))
                .andExpect(status().isCreated());

        Thread.sleep(1500);

        mockMvc.perform(get("/orders/workflows"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
