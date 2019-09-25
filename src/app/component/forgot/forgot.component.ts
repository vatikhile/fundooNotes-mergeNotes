import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../core/model/Users/user-model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../../core/service/user/user-service.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forget: UserModel = new UserModel();
  email = new FormControl(null,
    [Validators.required, Validators.email]);

  constructor(private userService: UserServiceService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }


  emailError() {

    return this.email.hasError('required') ? "Enter an email" : this.email.hasError('email') ? "Enter an valid email" : "";
  }
  submit() {
    console.log("dataa sucess", this.forget);
    this.userService.forgot(this.forget).subscribe(
      data => {
        console.log("response", data);

        this.snackbar.open('forgot sucessfullly', "", { duration: 4000 })

      },
      error => {
        this.snackbar.open('failed', "", { duration: 4000 })

      }

    )


  }
}
