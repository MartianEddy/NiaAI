import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";
import {MessageService} from "../../message/message.service";
import {ChatResponse} from "../../chat/models/chat.response";

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {
    usernames$: string[] = [];
    filteredUsernames$ = this.usernames$;
    searchField!: HTMLInputElement;

    constructor(private userService: UserService, private messageService: MessageService, private toastr: ToastrService) {
        this.fetchAllUsernames();
    }

    ngOnInit() {
        this.searchField= <HTMLInputElement>document.getElementById("search");
    }

    fetchAllUsernames() {
        this.userService.getAllUsers().subscribe((usernames) => {
            this.usernames$ = usernames;
        });
    }

    filterUsernames(length=5) {
        let filter: string = this.searchField.value;
        this.filteredUsernames$ = this.usernames$.filter((username) =>
            username.toLowerCase().includes(filter.toLowerCase())).slice(0, length);
    }

    startChat(username: string) {
        this.searchField.value = "";
        this.toastr.success('Chat started with ' + username);
        this.userService.getUser(username).subscribe({
            next: (user) => {
                let chat: ChatResponse = {
                    chatId: undefined,
                    otherMemberUsername: user.username,
                    otherMemberAvatar: user.avatar,
                    lastMessage: undefined,
                    lastMessageTime: undefined,
                    messageCount: undefined
                }       // create empty chat

                this.messageService.showMessagesInChat(chat);
            },
            error: (error) => {
                this.toastr.error(error.error, 'Failed to start chat!', {timeOut: 5000});
            }
        });
    }
}
