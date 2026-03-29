package br.com.cest.educacional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FirebaseConfig {
    @Value("${firebase.api.key}")
    private String apiKey;

    @Value("${firebase.auth.domain}")
    private String authDomain;

    @Value("${firebase.project.id}")
    private String projectId;

    @Value("${firebase.storage.bucket}")
    private String storageBucket;

    @Value("${firebase.messaging.sender.id}")
    private String messagingSenderId;

    @Value("${firebase.app.id}")
    private String appId;

    // Getters (Essenciais para o Thymeleaf conseguir ler)
    public String getApiKey() { return apiKey; }
    public String getAuthDomain() { return authDomain; }
    public String getProjectId() { return projectId; }
    public String getStorageBucket() { return storageBucket; }
    public String getMessagingSenderId() { return messagingSenderId; }
    public String getAppId() { return appId; }
}
