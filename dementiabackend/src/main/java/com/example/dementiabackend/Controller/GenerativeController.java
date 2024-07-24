//package com.example.dementiabackend.Controller;
//
//import com.example.dementiabackend.DTO.ChatRequestDTO;
//import com.example.dementiabackend.DTO.ChatResponseDTO;
//import com.example.dementiabackend.Service.Impl.GenAIService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("api/chat")
//@RequiredArgsConstructor
//public class GenerativeController {
//
//    @Autowired
//    private final GenAIService genAIService;
//
//    public ChatResponseDTO getChatResponse(@RequestBody ChatRequestDTO request){
//        return genAIService.getResponse(request);
//    }
//
//
//
//}
