package com.example.orderservice.dto;

import java.util.List;

public class RuntimeStatusResponse {
    private String messagingMode;
    private boolean kafkaEnabled;
    private List<String> activeProfiles;

    public RuntimeStatusResponse() {}

    public RuntimeStatusResponse(String messagingMode, boolean kafkaEnabled, List<String> activeProfiles) {
        this.messagingMode = messagingMode;
        this.kafkaEnabled = kafkaEnabled;
        this.activeProfiles = activeProfiles;
    }

    public String getMessagingMode() {
        return messagingMode;
    }

    public void setMessagingMode(String messagingMode) {
        this.messagingMode = messagingMode;
    }

    public boolean isKafkaEnabled() {
        return kafkaEnabled;
    }

    public void setKafkaEnabled(boolean kafkaEnabled) {
        this.kafkaEnabled = kafkaEnabled;
    }

    public List<String> getActiveProfiles() {
        return activeProfiles;
    }

    public void setActiveProfiles(List<String> activeProfiles) {
        this.activeProfiles = activeProfiles;
    }
}
