import {Injectable} from '@angular/core';
import {SignupRequest} from "./models/signup.request";
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Urls} from "../utils/urls";
import {LoginRequest} from "./models/login.request";
import {AuthResponse} from "./models/auth.response";
import {RefreshtokenRequest} from "./models/refreshtoken.request";
import {UserService} from "../user/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private userService: UserService) {
    }

    signup(payload: SignupRequest): Observable<HttpResponse<string>> {
        return this.http.post(Urls.signup, payload, {responseType: 'text', observe: 'response'}).pipe(tap(response => {
            if (response.status === 201) {  // 201 = Created

            }
        }));
    }

    login(payload: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(Urls.login, payload).pipe(tap(response => {
            this.storeCredentials(response);
        }));
    }

    refreshToken(): Observable<AuthResponse> {
        let payload: RefreshtokenRequest = {
            refreshToken: this.getStoredCredentials()!.refreshToken,
            username: this.getStoredCredentials()!.username
        };

        return this.http.post<AuthResponse>(Urls.refreshToken, payload).pipe(tap(response => {
            this.storeCredentials(response);
        }));
    }

    logOut(): Observable<HttpResponse<string>> {
        let refreshToken = this.getStoredCredentials()!.refreshToken;
        return this.http.get(Urls.logout(refreshToken), {responseType: 'text', observe: 'response'}).pipe(tap(response => {
            if (response.status === 202) {  // 202 = Accepted
                sessionStorage.removeItem('storedCredentials');
            }
        }));
    }

    isLoggedIn() {
        return this.getStoredCredentials() !== null;
    }

    getStoredCredentials(): AuthResponse | null {
        let storedCredentialsRaw: string | null = sessionStorage.getItem('storedCredentials')
        if (storedCredentialsRaw === null)
            return null

        return JSON.parse(storedCredentialsRaw)
    }

    storeCredentials(authResponse: AuthResponse) {
        sessionStorage.setItem('storedCredentials', JSON.stringify(authResponse))
    }
}
