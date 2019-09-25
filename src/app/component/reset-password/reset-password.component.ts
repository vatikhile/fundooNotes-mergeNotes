
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../../core/service/user/user-service.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  model: any
  // reset: UserModel = new UserModel();
  password = new FormControl('', Validators.required);
  //confirmPassword = new FormControl('', Validators.required);

  constructor(private userService: UserServiceService, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute) { }
  accessToken = this.activeRoute.snapshot.paramMap.get('token')

  ngOnInit() {

    console.log(this.accessToken);
    localStorage.setItem('token', this.accessToken)
  }
  passwordError() {
    return this.password.hasError('required') ? 'Enter a password' : '';
  }
  // confirmPasswordError() {
  //   return this.confirmPassword.hasError('required') ? 'Enter a password' : '';
  // }
  submit() {

    this.model = {
      "newPassword": this.password.value

    }
    console.log("dataa sucess", this.model);
    var data = new FormData()
    data.append("newPassword", this.password.value)
    this.userService.resetPassword(this.model).subscribe(

      data => {
        console.log("response", data);

        this.snackbar.open('password reset sucessfullly', "", { duration: 4000 })

      },
      error => {
        this.snackbar.open('failed', "", { duration: 4000 })

      }

    )


  }
}
