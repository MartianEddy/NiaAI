import { RxStompService } from './rx-stomp.service';
import { myRxStompConfig } from './my-rx-stomp.config';
import {AuthService} from "../auth/auth.service";

export function rxStompServiceFactory(authService: AuthService) {
    const rxStomp = new RxStompService();
    rxStomp.configure(new myRxStompConfig(authService));
    rxStomp.activate();
    return rxStomp;
}
