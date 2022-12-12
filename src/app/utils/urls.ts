export class Urls {
    public static readonly base = 'http://localhost:8080';

    // auth
    public static readonly signup = `${Urls.base}/auth/signup`;
    public static readonly login = `${Urls.base}/auth/login`;
    public static readonly refreshToken = `${Urls.base}/auth/refresh_token`;
    public static readonly logout = (refreshToken: String) => `${Urls.base}/auth/logout/${refreshToken}`;

    // user
    public static readonly getAllUsers = `${Urls.base}/api/users`;
    public static readonly getUser = (username: string) => `${Urls.base}/api/users/${username}`;
    public static readonly deleteUser = (username: string) => `${Urls.base}/api/users/${username}`;

    // chat
    public static readonly getYourChats = `${Urls.base}/api/chats`;
    public static readonly getChat = (chatId: number) => `${Urls.base}/api/chats/${chatId}`;
    public static readonly deleteChat = (chatId: number) => `${Urls.base}/api/chats/${chatId}`;

    // message
    public static readonly getMessagesInChat = (chatId: number) => `${Urls.base}/api/messages/chat/${chatId}`;
    public static readonly websocketEndpoint = `ws://localhost:8080/ws`;
    public static readonly chatDestination = (chatId: number) => `/topic/chat/${chatId}`;
    public static readonly newChatsDestination = (yourUsername: string) => `/topic/chat/${yourUsername}`;
    public static readonly sendMessage = (recipientName: string) => `${Urls.base}/api/messages/to/${recipientName}`;
}
