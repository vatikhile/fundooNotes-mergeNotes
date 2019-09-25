import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../core/model/Users/user-model'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../../core/service/user/user-service.service';
import { AddNoteComponent } from '../add-note/add-note.component';
import{HttpServiceService} from '../../core/service/http/http-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: UserModel = new UserModel();
  cartId=localStorage.getItem('cartId');
  services=[];
  productId="";
  email = new FormControl(null, [Validators.required, Validators.email]);

  // Validators.pattern(^[\w.+\-]+@gmail\.com$)

  password = new FormControl(null, [Validators.required, Validators.minLength(6)]);

  // button = new FormControl('', Validators.required);

  constructor(private userService: UserServiceService, private router: Router, private snackbar: MatSnackBar,private http:HttpServiceService) { }


  emailError() {

    return this.email.hasError('required') ? "Enter an email" : this.email.hasError('email') ? "Enter an valid email" : "";
  }

  passwordError() {

    return this.password.hasError('required') ? 'Enter a password' : '';
  }

  ngOnInit() {
    if(localStorage.getItem('cartId')!=null){
      this.getCartDetail();
      this.getServices();
      // this.hide=false;
      // this.mainClass.withoutCart=this.hide;
      // this.mainClass.withCart=!this.hide;
    }
  }
  getCartDetail() {
    try {
      this.http.getCartDetailService('productcarts/getCartDetails/'+this.cartId).subscribe(data => {
        console.log('data after get cart detail', data);
        this.productId=data['data'].productId;
      }, err => {
        console.log('err after get cart detail', err);
      }) 
    } catch (error) {
      console.log('err after get cart detail');
    }  
  }
  getServices(){
    try {
      this.http.httpGetWithoutToken('user/service').subscribe(data=>{
        console.log('data after get all user service',data);
        this.services=data['data']['data'];
        
      },err=>{
        console.log('err after get user services ',err);
      })
    } catch (error) {
      console.log('error after get user services ',error);
    }
  
  }


  submit() {
    console.log("dataa sucess", this.login);

    this.userService.login(this.login).subscribe(
      // this.userService.postRequest('user/login', this.login).subscribe(
      data => {
        localStorage.setItem("token", data["id"]);
        localStorage.setItem("Id", data["userId"]);
        localStorage.setItem("firstName", data["firstName"]);
        localStorage.setItem("lastName", data["lastName"]);
        localStorage.setItem("email", data["email"]);
        localStorage.setItem("profilPic", data["imageUrl"]);
        

        console.log("response", data);
        console.log("tokknnn");

        this.snackbar.open('login sucessfullly', "", { duration: 2000 })
        this.router.navigateByUrl('addNotes');
      },
      error => {
        this.snackbar.open('login fail', "", { duration: 2000 })

      }
    )


  }
}
