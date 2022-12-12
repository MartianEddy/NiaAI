import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SignupRequest} from "../models/signup.request";
import {ToastrService} from "ngx-toastr";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import * as svgToTinyDataUrI from "mini-svg-data-uri";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    avatar!: string;
    avatarBgColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"];
    refreshIcon = faRefresh;

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
        this.generateAvatar();
        this.signupForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    signup() {
        let payload: SignupRequest = {
            username: this.signupForm.get('username')?.value,
            avatar: this.avatar,
            password: this.signupForm.get('password')?.value,
        }

        this.authService.signup(payload).subscribe({
            next: () => {
                this.router.navigateByUrl('/login');
                this.toastr.success('Signup Successful');
            },
            error: (error) => {
                this.toastr.error(error.error, 'Signup Failed!', {timeOut: 5000});
                console.log("Signup failed: " + JSON.stringify(error));
            }
        });
    }

    generateAvatar() {
        let svg = createAvatar(style, {
            seed: Math.random().toString(),
            backgroundColor: this.avatarBgColors[Math.floor(Math.random() * this.avatarBgColors.length)],
            flip: true
        });
        this.avatar = svgToTinyDataUrI(svg);
    }
}
