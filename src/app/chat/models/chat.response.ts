/**
 * Chat DTO
 *
 * Some fields are optional because when creating a new chat they are not yet known.
 */
export class ChatResponse {
    chatId: number | undefined;
    otherMemberUsername!: string;
    otherMemberAvatar!: string;
    lastMessage: string | undefined;
    lastMessageTime: string | undefined;
    messageCount: number | undefined;
}
