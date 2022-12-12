import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../models/login.request";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    login() {
        let payload: LoginRequest = {
            username: this.loginForm.get('username')?.value,
            password: this.loginForm.get('password')?.value
        }

        this.authService.login(payload).subscribe({
            next: () => {
                this.router.navigateByUrl('/');
                this.toastr.success('Login Successful');
            },
            error: (error) => {
                if (error.status === 401) {
                    this.toastr.error('Invalid username or password', 'Login Failed!', {timeOut: 5000});
                } else {
                    this.toastr.error(error.error, 'Login Failed!', {timeOut: 5000});
                    console.log("Login failed: " + JSON.stringify(error));
                }
            }
        });
    }
}
