import { Component } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  isOpen = false;
  userInput = '';
  messages: string[] = [];

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push(`You: ${this.userInput}`);
      const response = this.chatbotService.postData(this.userInput).subscribe(res => {
        this.messages.push(`Your Carer: ${res}`);
      });
      this.userInput = '';
    }
  }
}
