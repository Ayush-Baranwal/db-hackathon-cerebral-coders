package com.example.dementiabackend.Repository;

import com.example.dementiabackend.Entity.ConversationHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationHistoryRepository extends JpaRepository<ConversationHistoryEntity, Long> {

    ConversationHistoryEntity findBySessionId(String sessionId);

}
