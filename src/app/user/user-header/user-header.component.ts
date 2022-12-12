import { Component } from '@angular/core';
import {UserResponse} from "../models/user.response";
import {UserService} from "../user.service";
import {AuthService} from "../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
    user!: UserResponse;
    logoutIcon = faArrowRightFromBracket;
    deleteIcon = faTrashAlt;

    constructor(private userService: UserService, private authService: AuthService, private toastr: ToastrService) {
        this.userService.getUser(authService.getStoredCredentials()!.username).subscribe((user) => {
            this.user = user;
        });
    }

    ngOnInit() {
    }

    deleteAccount() {
        if (!confirm("Are you sure you want to delete your account? This is irreversible!"))
            return;

        this.userService.deleteUser(this.authService.getStoredCredentials()!.username).subscribe({
            next: () => {
                this.toastr.success('Account Deleted');
            },
            error: (error) => {
                this.toastr.error(error.error, 'Failed!', { timeOut: 5000 });
                console.log("Delete account failed: " + JSON.stringify(error));
            }
        });
    }
}
