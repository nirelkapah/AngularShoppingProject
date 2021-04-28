import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/services/reservations-service';
import fileDownload from 'js-file-download';
import {CartsService} from '../../services/carts-service';
import { MatSnackBar } from '@angular/material/snack-bar';






@Component({
  selector: 'app-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.css']
})
export class SuccessfulOrderComponent implements OnInit {

  public uri: any 
  public text: string

  constructor(public reservationsService: ReservationsService, public cartsService: CartsService,  private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }


  //=====================Click Functions=====================//

  public onClickReceipt = () =>{

    let txt = this.setReceipt()

    fileDownload(txt , 'Receipt.txt', 'text/csv')

  }

  //=====================Logic Functions=====================//

  public setReceipt = () =>{

    let text = "";
    let cart = this.cartsService.cart;

    for (let index = 0; index < cart.length; index++) {
      text = text + "Product Name: " + cart[index].name + ", Quantity: " + cart[index].amount + " Total Price: " + cart[index].totalPrice + "$" + "\n"
      
    }

    text = text + "\n" + "\n" +"Order Total Price :" + this.cartsService.cartTotalPrice + "$" +"\n" + "Come Again , The Organics Shop"

    return text


  }

}
