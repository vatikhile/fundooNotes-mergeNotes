import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserModel } from '../../core/model/Users/user-model'
import { UserServiceService } from '../../core/service/user/user-service.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AddToCart} from '../../core/model/addToCart/add-to-cart'
import {HttpServiceService} from '../../core/service/http/http-service.service'




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  register: UserModel = new UserModel();
  serviceArray=[];
  public cartModel:AddToCart;
  cartId = localStorage.getItem('cartId');
  getErrorMessageserver = '';
  services=[];
  service=''
  productId='';
  firstName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]);
  lastName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]);
  userName = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  service1 = new FormControl('', [Validators.required]);

  constructor(private userService: UserServiceService, private router: Router, private snackbar: MatSnackBar,private http:HttpServiceService) { }

  ngOnInit() {
    console.log("services",this.services);
    this.getCartDetail();
this.getUserService();
    
  }

  firstNameError() {
    return this.firstName.hasError('required') ? 'Enter first name' : '';
  }

  lastNameError() {
    return this.lastName.hasError('required') ? 'Enter last name' : '';
  }
  userNameError() {
    return this.userName.hasError('required') ? 'choose Gmail address' : '';
  }
  passwordError() {
    return this.password.hasError('required') ? 'Enter a password' : '';
  }
  confirmPasswordError() {
    return this.confirmPassword.hasError('required') ? 'Enter a password' : '';
  }
  serviceError() {
    return this.service1.hasError('required') ? 'choose the Service' : '';
  }


  submit() {
    try {
      if(localStorage.getItem('cartId')!=null){
        for (let i = 0; i < this.services.length; i++) {
          if(this.services[i].id==this.productId){
            this.addToCart(this.productId);
            this.service=this.services[i].name
          }
         
       }
      }
      if (this.firstName.value == '' && this.lastName.value == '' && this.confirmPassword.value == '' && this.userName.value == '' && this.password.value == '') {
        this.getErrorMessageserver = "Fields are required";
        return;
      } 
      else if (this.service == null) {
        if(localStorage.getItem('cartId')==null){
          this.getErrorMessageserver = "Please select service type";
          return;
        }
        else{
          for (let i = 0; i < this.services.length; i++) {
            if(this.services[i].id==this.productId){
              this.addToCart(this.productId);
              this.service=this.services[i].name
            }
           
         }
        }
     
        
      }

      if (this.password.value != this.confirmPassword.value) {
        this.getErrorMessageserver = "Password and Confirm Password not Matching";
        return;
      }
      this.register.service=this.service
    console.log("dataa sucess", this.register);
    this.userService.register(this.register).subscribe(
      data => {
        console.log("response", data);
        this.router.navigate(['login']);
        this.snackbar.open('register sucessfullly',"",{duration:2000})

      },
      error => {
        this.snackbar.open('not register',"",{duration:2000})
        console.log("error", error);
      }

    )
  }
  catch (error) {
    console.log('error in register');
  }
}
  getUserService() {
   
    try {
      this.http.httpGetWithoutToken('user/service').subscribe(data => {
        
        this.services=data['data']['data'];
        console.log(this.serviceArray);

      }, err => {
        console.log(err);

      })
    } catch (err) {

    }

  }

  getCartDetail() {
    try {
      if(this.cartId==null){
        return;
      }
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
  select(item){
    this.getErrorMessageserver='';
    console.log("item",item);
    this.productId=item.id;
  
    
    for (let i = 0; i < this.services.length; i++) {
      if(this.services[i].id==this.productId){
        this.service=this.services[i].name
      }
     
   }
   console.log("services",this.service);
    this.addToCart(item.id);
    
  }
  addToCart(id:string){
    this.cartModel=new AddToCart();
    this.cartModel.productId=id;
    this.http.postRequest1('productcarts/addToCart',this.cartModel).subscribe(data => {
      console.log('data after add to cart', data);
      localStorage.setItem('cartId',data['data']['details'].id)
    }, err => {
      console.log('error after add to cart ', err);
    
    })
    }
}
