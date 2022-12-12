import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {AuthResponse} from "./models/auth.response";
import {Router} from "@angular/router";
import {Urls} from "../utils/urls";

/**
 * This interceptor adds the authorization header to every request that needs it.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;                           // flag for when the refresh token request is in progress
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
                                                            // used to block and release requests during the refreshing of the access token

    constructor(private authService: AuthService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const urlsToSkip = [Urls.signup, Urls.login, Urls.refreshToken, Urls.logout(""), "infinitychat"];
        if (urlsToSkip.some(url => request.url.includes(<string>url)))
            return next.handle(request);

        let storedCredentials: AuthResponse | null = this.authService.getStoredCredentials();

        if (storedCredentials !== null)                     // if the access token is not null
            request = this.addToken(request, storedCredentials.accessToken);   // add it to the request

        return next.handle(request)                         // make the request with the added access token
            .pipe(catchError(error => {              // if the request fails
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(error);
                }
            }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;                                       // set the flag
            this.refreshTokenSubject.next(null);                      // initialize the refresh token subject

            return this.authService.refreshToken().pipe(
                switchMap(response => {
                    this.isRefreshing = false;                               // reset the flag
                    this.refreshTokenSubject.next(response.accessToken);     // store new access token for it to be added to pending requests
                    request = this.addToken(request, response.accessToken);  // add the new access token to the current request
                    return next.handle(request);                             // make the request again
                }),
                catchError((err) => {                                 // if the refresh token request fails
                    this.isRefreshing = false;
                    this.authService.logOut().subscribe(() => {         // log out the user
                        this.router.navigateByUrl('/login');
                    });
                    return throwError(err);
                }));
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),                      // if the new access token from the refresh token request is ready
                take(1),
                switchMap(jwt => next.handle(this.addToken(request, jwt))));    // make the pending request with the new access token
        }
    }
}
