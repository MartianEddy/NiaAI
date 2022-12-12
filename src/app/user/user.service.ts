import {EventEmitter, Injectable, Output} from '@angular/core';
import {SignupRequest} from "../auth/models/signup.request";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Urls} from "../utils/urls";
import {AuthResponse} from "../auth/models/auth.response";
import {Router} from "@angular/router";
import {UserResponse} from "./models/user.response";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    @Output() dataHasChanged = new EventEmitter();  // notifies every component that reads data from this service that the data has changed

    constructor(private http: HttpClient, private router: Router) {
    }

    getAllUsers(): Observable<Array<string>> {
        return this.http.get<Array<string>>(Urls.getAllUsers);
    }

    getUser(username: string): Observable<UserResponse> {
        return this.http.get<UserResponse>(Urls.getUser(username));
    }

    deleteUser(username: string): Observable<HttpResponse<string>> {
        return this.http.delete(Urls.deleteUser(username), {responseType: 'text', observe: 'response'}).pipe(tap(response => {
            if (response.status === 200) {  // 200 = OK
                sessionStorage.removeItem('storedCredentials');
                this.router.navigateByUrl('/login');
            }
        }))
    }
}
