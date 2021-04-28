import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import {CartsService} from '../../services/carts-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorHandler from 'src/app/errors/ErrorHandler';







@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart : CartProduct[]

  constructor(public cartsService: CartsService ,private router: Router , private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getCart();

  }

  //=====================Service Functions=====================//

  public getCart = () =>{

    let observable = this.cartsService.getCart();
        observable.subscribe(cart => {
            this.cartsService.cart = cart;
            this.cartsService.calculateCartTotalPrice();

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }


  //=====================Click Functions=====================//

  public onClickDeleteProductFromCart = (cartProduct) =>{

    let observable = this.cartsService.deleteProductFromCart(cartProduct.id);
        observable.subscribe(result => {
          this.cartsService.deleteProductFromCartUI(cartProduct.id)
          this.cartsService.calculateCartTotalPrice();

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  public onClickOrder = () =>{
    if(this.cartsService.cartTotalPrice < 1){
      ErrorHandler.snackBar("Cart Is Empty, Fill In Products",this)

      return
    }
    this.router.navigate(["order"]);
  }

  
}
