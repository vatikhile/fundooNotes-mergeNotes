import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {placeOrder} from '../../core/model/addToCart/add-to-cart'
import {HttpServiceService} from '../../core/service/http/http-service.service'
import  {NoteServiceService} from '../../core/service/note/note-service.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {
  placeOrderModel: placeOrder = new placeOrder();
  display=false;
  first = true;
  Second = false;
  Third = false;
  cartData=[];
  cartId = localStorage.getItem('cartId');
  Delivery = new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]);
  constructor(private http:HttpServiceService,private notes:NoteServiceService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.getCartDetail();
  }

  getCartDetail() {
    try {  
  this.notes.getShopingCartDetailService().subscribe(data => {
    // this.spinnerService.hide();
       
        console.log('data after get cart detail1', data);
        if (data['data'].length > 0) {
          this.cartData = data['data'][0];
          console.log("card data",this.cartData);
          
          this.cartId = data['data'][0].id;
          console.log("card data id",this.cartId);
        }else{
          this. display=true;
        }
        console.log(this.display);
  
        if (this.cartData['isOrderPlaced']) {
          console.log("isOrderPlaced");
          
          this.first = false;
          this.Second = false;
          this.Third= true;
        }
  
      }, err => {
        console.log('error after get cart detail', err);
  
      })
    } catch (error) {
      console.log('error after get cart detail', error);
      
    }

  }
  proceed() {
    this.first = false;
    this.Second = true;
  }
  placeOrder() {
    try {
      if (this.Delivery.hasError('required')) {
        this.snackbar.open('Please Enter Delivery Address ', '',{duration:2000});
      } else if (this.Delivery.hasError('minlength')) {
    
        this.snackbar.open('Please Enter Correct Address ', '',{duration:2000});
    
      } else if (this.Delivery.hasError('maxlength')) {
        this.snackbar.open('Please Enter Correct Address ', '',{duration:2000});
    
      } else {
        this.Second = false;
        this.Third = true;
        this.placeOrderModel = new placeOrder();
        this.placeOrderModel.address = this.Delivery.value;
        this.placeOrderModel.cartId = this.cartId;
        this.placeOrderService(this.placeOrderModel);
      }
    } catch (error) {
      console.log('error in place order ',error);
      
    }
      
      }
      placeOrderService(data: object) {
        this.http.postData('productcarts/placeOrder',data).subscribe(data => {
          console.log('data after place order', data);
          this.snackbar.open('Your Order Placed SuccessFully ', '',{duration:2000});
        }, err => {
          console.log('error after place order', err);
    
        })
      }
}
