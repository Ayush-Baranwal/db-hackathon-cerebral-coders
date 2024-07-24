package com.example.dementiabackend.Controller;

import com.example.dementiabackend.DTO.MessageDTO;
import com.example.dementiabackend.Entity.ConversationHistoryEntity;
import com.example.dementiabackend.Repository.ConversationHistoryRepository;
import org.springframework.ai.azure.openai.AzureOpenAiChatModel;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@RestController
public class ChatController {

    private final AzureOpenAiChatModel chatModel;
    private final ConversationHistoryRepository conversationHistoryRepository;

    @Autowired
    public ChatController(AzureOpenAiChatModel chatModel, ConversationHistoryRepository conversationHistoryRepository) {
        this.chatModel = chatModel;
        this.conversationHistoryRepository = conversationHistoryRepository;
    }

    @GetMapping("/ai/generate")
    public Map generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
    public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return chatModel.stream(prompt);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/ai/conversation")
    public AtomicReference<String> conversation(@RequestParam String message,
                                                @RequestParam(required = false) String sessionId) {
        String prevConversation;
        ConversationHistoryEntity conversationHistoryEntity = conversationHistoryRepository.findBySessionId(sessionId);
        if (conversationHistoryEntity != null) {
//            String currentSummary = "Hey ChatGPT, let's summarize our discussion so far: " + conversationHistoryEntity.getMessage();
//            currentConversation = chatModel.call(currentSummary);
            prevConversation = conversationHistoryEntity.getMessage();
        } else {

            prevConversation = "Hey ChatGPT, I am going to have a sequential conversation with you. Answer the query considering that you are a chat-bot. I will give you the previous conversation as Client Response and ChatGPT Response. You have to give a response to the query considering the history of the conversation. If query asked is not related to dementia, respond: Question is Invalid!";
            //            sessionId = UUID.randomUUID().toString();
            conversationHistoryEntity = new ConversationHistoryEntity();
            conversationHistoryEntity.setSessionId(sessionId);
        }
//        System.out.println("conversation: " + currentConversation);
        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage( prevConversation));
        messages.add(new UserMessage(message));
        System.out.println("messages: " + messages);
        Prompt prompt = new Prompt(messages);
        Flux<ChatResponse> responseStream = chatModel.stream(prompt);

        AtomicReference<String> result = new AtomicReference<>("");
        responseStream.subscribe(chatResponse -> {
            Generation firstGeneration = chatResponse.getResult();
            if (firstGeneration != null) {
                String generatedText = firstGeneration.getOutput().getContent();
                if(generatedText != null)
                    result.set(result.get() + generatedText);
            }
        });
        conversationHistoryEntity.setMessage(prevConversation + " Client Response: " +message + " ChatGpt Response: " +result.get());
        conversationHistoryRepository.save(conversationHistoryEntity);
//        System.out.println("result: " + result);
        return result;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/ai/conversationRoutine")
    public MessageDTO conversationRoutine(@RequestParam String message,
                                                @RequestParam(required = false) String sessionId) {
        String prevConversation;
        ConversationHistoryEntity conversationHistoryEntity = conversationHistoryRepository.findBySessionId(sessionId);
        if (conversationHistoryEntity != null) {
            prevConversation = conversationHistoryEntity.getMessage();
        } else {

            prevConversation = "Hey ChatGPT act as a chat-bot, Suppose I am a caregiver and my family member is a dementia patient. Help me plan daily routines for their loved ones. Ask me some questions one by one to personalize the routine. The format of each response should be like first messageType, it can be question or finalRoutine and then next question like question : or finalRoutine like finalRoutine : list of (time - activity). The first response should also be be formatted.  ";
            conversationHistoryEntity = new ConversationHistoryEntity();
            conversationHistoryEntity.setSessionId(sessionId);
        }
        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage( prevConversation));
        messages.add(new UserMessage(message));
//        System.out.println("messages: " + messages);
        Prompt prompt = new Prompt(messages);
        Flux<ChatResponse> responseStream = chatModel.stream(prompt);

        AtomicReference<String> result = new AtomicReference<>("");
        responseStream.subscribe(chatResponse -> {
            Generation firstGeneration = chatResponse.getResult();
            if (firstGeneration != null) {
                String generatedText = firstGeneration.getOutput().getContent();
                if(generatedText != null)
                    result.set(result.get() + generatedText);
            }
        });
        conversationHistoryEntity.setMessage(prevConversation + " Client Response: " +message + " ChatGpt Response: " +result.get());
        conversationHistoryRepository.save(conversationHistoryEntity);
        System.out.println("result: " + result);
        return parseMessage(result);
    }

    public static MessageDTO parseMessage(AtomicReference<String> input) {
        String inputValue = input.get();
        String[] parts = inputValue.split(": ", 2);
        System.out.println(Arrays.toString(parts));
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid input format");
        }

        String messageType = parts[0].trim();
        String message = parts[1].trim();

        // Create and return the DTO
        return new MessageDTO(messageType, message);
    }

}


