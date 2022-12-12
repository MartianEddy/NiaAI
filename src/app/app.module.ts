import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LogoutComponent} from './auth/logout/logout.component';
import {UserHeaderComponent} from './user/user-header/user-header.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import { UserSearchComponent } from './user/user-search/user-search.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { MessagesInChatComponent } from './message/messages-in-chat/messages-in-chat.component';
import {RxStompService} from "./rx-stomp/rx-stomp.service";
import {rxStompServiceFactory} from "./rx-stomp/rx-stomp-service-factory";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        LogoutComponent,
        UserHeaderComponent,
        UserSearchComponent,
        ChatListComponent,
        MessagesInChatComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        FontAwesomeModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        // {
        //     provide: RxStompService,
        //     useFactory: rxStompServiceFactory,
        // },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
