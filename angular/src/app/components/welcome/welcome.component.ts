import { Component, OnInit } from '@angular/core';
import {CartsService} from '../../services/carts-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartDetails } from '../../models/CartDetails';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import ErrorHandler from 'src/app/errors/ErrorHandler';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public cartsHistory : CartDetails[];
  public isFirstBuy: boolean = false;
  public isActiveCart: boolean = false;
  public pageLoaded: boolean = false;

  public activeCart: CartDetails;
  public lastCart: CartDetails;

  public userService: UserService;


  constructor(public cartsService: CartsService , private snackBar: MatSnackBar, private router: Router, userService : UserService, ) {
    this.userService = userService;
   }

  ngOnInit(): void {
    this.getCartHistory();

  }

  //=====================Click Functions=====================//

  public onClickToShop = () =>{
    this.router.navigate(["/customer"])
  }

  //=====================Service Functions=====================//

  private getCartHistory = () =>{

    let observable = this.cartsService.getCartDetailsHistory();
        observable.subscribe(result => {
            this.cartsHistory = result;
            this.checkUserCartHistory();

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }


  //=====================Logic Functions=====================//

  private checkUserCartHistory = async () =>{
    this.pageLoaded = true;
    
    if(this.cartsHistory.length == 0){
      this.isFirstBuy = true;
      return
    }
    let activeCart = this.returnActiveCartId();
    
    if(activeCart){
      this.activeCart = activeCart;
      this.isActiveCart = true;
      return
    }

    this.lastCart = this.cartsHistory[this.cartsHistory.length - 1]
    
} 

  private returnActiveCartId = () : CartDetails =>{

    let array = this.cartsHistory;

    for (let index = 0; index < array.length; index++) {
      if(array[index].active == 1){
        return array[index];
      }
    }
    return null
  }


}
