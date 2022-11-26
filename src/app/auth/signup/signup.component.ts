import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    image: string = '';
    invalidImage = false;

    constructor(private authService: AuthService, private router: Router) {
        this.signupForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    signup() {

    }

    selectImage(event: any) {
        let mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            this.invalidImage = true;
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (_event) => {
            this.invalidImage = false;
            if (typeof reader.result === "string") {
                this.image = reader.result;
            }
            else {
                this.invalidImage = true;
                return;
            }
        }
    }
}
