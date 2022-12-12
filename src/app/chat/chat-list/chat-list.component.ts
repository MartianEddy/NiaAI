import { Component } from '@angular/core';
import {ChatResponse} from "../models/chat.response";
import {ChatService} from "../chat.service";
import {ToastrService} from "ngx-toastr";
import {MessageService} from "../../message/message.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
    constructor(public chatService: ChatService, public messageService: MessageService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.chatService.fetchChats();
        this.chatService.newChat.subscribe(() => {
            this.scrollToTop();  // scroll to top when list of chats is updated
            this.toastr.info("New message", "", {timeOut: 500});
        });
    }

    openChat(chat: ChatResponse) {
        this.messageService.showMessagesInChat(chat);
    }

    chatIsOpen(chat: ChatResponse){

    }

    scrollToTop() {
        let element = document.getElementById("chat-list-area");
        if (element)
            element.scrollTop = 0;
    }

    ngOnDestroy() {
        this.chatService.closeAllWebsockets();
    }
}
