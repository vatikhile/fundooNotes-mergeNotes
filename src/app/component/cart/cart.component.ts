import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AddToCart } from '../../core/model/addToCart/add-to-cart'
import { HttpServiceService } from '../../core/service/http/http-service.service'
import { ServiceComponent } from '../../component/service/service.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public addCartModel: AddToCart;
  constructor(public dialog: MatDialog, private router: Router, private http: HttpServiceService, private snackbar: MatSnackBar) { }
  serviceDetail = {
    service: 'BASIC',
    price: '$49',
  }
  serviceArray = [];
  ngOnInit() {
    this.getUserService();
  }
  /**
   * @purpose this method is for get all the service 
   */
  getUserService() {
   
    try {
      this.http.httpGetWithoutToken('user/service').subscribe(data => {
        this.serviceArray = data['data']['data']
        console.log(this.serviceArray);

      }, err => {
        console.log(err);

      })
    } catch (err) {

    }

  }
  serviceOpen(value) {

    try {
      console.log(value);
      if (value == 'Advance') {
        this.serviceDetail = this.serviceArray[0]
        this.addToCart(this.serviceArray[0].id)
      } else {
        this.serviceDetail = this.serviceArray[1]
        this.addToCart(this.serviceArray[1].id)

      }


      this.openDialog();

 
    } catch (error) {
      console.log('error in ecart ', error);

    }
  }
  openDialog() {
    console.log("vvvv");

    const dialogRef = this.dialog.open(ServiceComponent, {
      data: this.serviceDetail
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  /**
   * @purpose this method is for add the service to cart
   */
  addToCart(id) {
    try {
      console.log("id", id);

      this.addCartModel = new AddToCart();
      this.addCartModel.productId = id;
      this.http.postRequest1('productcarts/addToCart', this.addCartModel).subscribe(data => {
        this.snackbar.open("Product added to cart successfully", '', { duration: 2000 })
        console.log('data after add to cart', data);
        localStorage.setItem('cartId', data['data']['details'].id)
      }, err => {
        console.log('error after add to cart ', err);

      })
    } catch (error) {
      console.log('error after add to cart ', error);

    }


  }
/**
* @purpose this method is for navigate the page to login page
*/
  signIn() {
    try {
      localStorage.removeItem('cartId');
      this.router.navigate(['login']);
    } catch (error) {
      console.log('error in signIn', error);

    }

  }


}



