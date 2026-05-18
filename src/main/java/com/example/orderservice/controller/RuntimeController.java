package com.example.orderservice.controller;

import com.example.orderservice.dto.RuntimeStatusResponse;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/system")
public class RuntimeController {

    private final Environment environment;

    public RuntimeController(Environment environment) {
        this.environment = environment;
    }

    @GetMapping("/runtime")
    public RuntimeStatusResponse getRuntimeStatus() {
        List<String> activeProfiles = Arrays.asList(environment.getActiveProfiles());
        if (activeProfiles.isEmpty()) {
            activeProfiles = List.of("default");
        }

        String messagingMode = environment.getProperty("app.messaging.type", "in-memory");
        boolean kafkaEnabled = activeProfiles.contains("kafka") || "kafka".equalsIgnoreCase(messagingMode);

        return new RuntimeStatusResponse(messagingMode, kafkaEnabled, activeProfiles);
    }
}
