import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: { sender: string; text?: string; imageUrl?: string; link?: string }[] = [];
  userInput = '';
  isChatOpen = false;

  constructor(private chatbotService: ChatbotService,private sanitizer: DomSanitizer,private cartService: CartService) {}

  openChat() {
    this.isChatOpen = true;

    setTimeout(() => {
      document.querySelector('.chat')?.classList.add('show');
    }, 0);
  }

  closeChat() {
    this.isChatOpen = false;
    this.clearChat();
    const chatElement = document.querySelector('.chat');
    if (chatElement) {
      chatElement.classList.remove('show');
      setTimeout(() => {
        this.isChatOpen = false;
      }, 300);
    }
  }

  clearChat() {
    this.messages = [];
    this.userInput = '';
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', text: this.userInput });
      this.chatbotService.getBotResponse(this.userInput).subscribe(
        (response: any) => {
          console.log(response);
          if (Array.isArray(response)) {
            response.forEach(msg => this.handleBotResponse(msg));
          } else {
            this.handleBotResponse(response);
          }
        },
        error => {
          console.error('Error occurred:', error);
          this.messages.push({ sender: 'bot', text: 'Error: Could not connect to the server.' });
        }
      );
      this.userInput = '';
    }
  }

  handleBotResponse(response: any) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const text = response.text;
    const urlMatch = text ? text.match(urlRegex) : null;
    const textWithoutUrl = text ? text.replace(urlRegex, '').trim() : '';

    if (textWithoutUrl) {
      this.messages.push({ sender: 'bot', text: textWithoutUrl });
    }

    if (response.image) {
      this.messages.push({ sender: 'bot', imageUrl: response.image });
    }

    if (urlMatch) {
      urlMatch.forEach((url: string) => {
        this.messages.push({ sender: 'bot', link: url });
      });
    }

    if (response.metadata?.action === 'add_to_cart' && response.metadata?.item) {
      this.cartService.addToCart(response.metadata.item);
    }
  }





}
