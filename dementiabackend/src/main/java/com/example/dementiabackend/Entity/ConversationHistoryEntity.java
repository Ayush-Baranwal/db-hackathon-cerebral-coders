package com.example.dementiabackend.Entity;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class ConversationHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sessionId;
    @Column(length = 100000)
    private String message;
    private LocalDateTime timestamp;

    public ConversationHistoryEntity() {
        this.timestamp = LocalDateTime.now();
    }
}
