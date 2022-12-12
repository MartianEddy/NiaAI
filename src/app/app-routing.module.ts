import {inject, NgModule} from '@angular/core';
import {CanActivateFn, Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {AuthService} from "./auth/auth.service";
import {LogoutComponent} from "./auth/logout/logout.component";

// guards
const isLoggedIn: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isLoggedIn()) {
        router.navigateByUrl('/login');
    }

    return authService.isLoggedIn();
}

const isNotLoggedIn: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn()) {
        router.navigateByUrl('');
    }

    return !authService.isLoggedIn();
}

// routes
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [isLoggedIn] },
    { path: 'login', component: LoginComponent, canActivate: [isNotLoggedIn] },
    { path: 'signup', component: SignupComponent, canActivate: [isNotLoggedIn] },
    { path: 'logout', component: LogoutComponent, canActivate: [isLoggedIn] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
