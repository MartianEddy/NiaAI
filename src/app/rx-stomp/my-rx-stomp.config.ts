import {RxStompConfig} from '@stomp/rx-stomp';
import {Urls} from "../utils/urls";
import {AuthService} from "../auth/auth.service";

export class myRxStompConfig extends RxStompConfig {
    constructor(private authService: AuthService) {
        super();

        // which server?
        this.brokerURL = Urls.websocketEndpoint;

        // Headers
        // Typical keys: login, passcode, host
        this.connectHeaders = {
            "access-token": authService.getStoredCredentials()!.accessToken
        };

        // How often to heartbeat?
        // Interval in milliseconds, set to 0 to disable
        this.heartbeatIncoming = 0; // Typical value 0 - disabled
        this.heartbeatOutgoing = 20000; // Typical value 20000 - every 20 seconds

        // Wait in milliseconds before attempting auto reconnect
        // Set to 0 to disable
        // Typical value 500 (500 milliseconds)
        this.reconnectDelay = 200;

        // Will log diagnostics on console
        // It can be quite verbose, not recommended in production
        // Skip this key to stop logging to console
        this.debug = (msg: string): void => {
            console.log(new Date, msg);
        };

        this.beforeConnect = (stompClient: any): Promise<void> => {
            return new Promise<void>((resolve, _) => {
                // stompClient.connectHeaders = {
                //     "access-token": getAccessToken(),
                // };
                // console.log("token: " + getAccessToken());
                resolve();
            });
        };
    }
}
