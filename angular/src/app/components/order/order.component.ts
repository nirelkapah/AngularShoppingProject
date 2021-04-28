import { Component, OnInit } from '@angular/core';
import {CartsService} from '../../services/carts-service';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservationsService } from 'src/app/services/reservations-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorHandler from 'src/app/errors/ErrorHandler';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //Search 
  public searchKeyword: string = "";

  //Form Variables
  public orderForm: FormGroup;

  public city: FormControl;
  public street: FormControl;
  public shippingDate: FormControl;
  public creditCard: FormControl;

  public orderDetails: OrderDetails;

  public minDate: Date;
  public occupiedDates: Date[] = [];


  constructor(public cartsService: CartsService, public reservationsService: ReservationsService ,private router: Router, private snackBar: MatSnackBar) {     
    
  }

  ngOnInit(): void {

    this.orderDetails = new OrderDetails();
    this.getCart();
    this.getOccupiedDates();
    this.initializeForm();


  }

  private initializeForm = () =>{

    //set Today Date
    this.minDate = new Date();

    //initialize values and validations
    this.city = new FormControl("", Validators.required);
    this.street = new FormControl("", Validators.required);
    this.shippingDate = new FormControl("", Validators.required);
    this.creditCard = new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]);


    // Initializing the from group 1 - how its built
    this.orderForm = new FormGroup({
      city: this.city,
      street : this.street,
      shippingDate : this.shippingDate,
      creditCard:this.creditCard
    });
  }

  //=====================Logic Functions=====================//

  private setOccupiedDates = (datesArray) =>{

    let date;

    for(let i = 0 ; i< datesArray.length; i++){
      date = datesArray[i].deliveryDate;
      let newDateFormat = new Date(date);
      this.occupiedDates.push(newDateFormat);
    }
  }

  private setOrderData = () =>{

    let myDate = this.shippingDate.value;
    var newDate = this.formatDate(myDate);

    this.orderDetails.city = this.city.value;
    this.orderDetails.street = this.street.value;
    this.orderDetails.shippingDate = newDate;
    this.orderDetails.creditCard = this.creditCard.value;
  }

  private formatDate = (date) => {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }


  public occupiedDatesFilter = (d: Date): boolean => {
    const time=d.getTime();
    return !this.occupiedDates.find(x=>x.getTime()==time);
  }


  public dateClass = () => {
    return (date: Date): MatCalendarCellCssClasses => {
      const time=date.getTime();

    return this.occupiedDates.find(x=>x.getTime()==time) ? 'occuppied-date' : undefined;
    };
  }

  public checkDate = (date) =>{
    const time=date.getTime();
    if (this.occupiedDates.find(x=>x.getTime()==time)){
      this.orderForm.controls['shippingDate'].setErrors({'incorrect': true});
    }
    else{
      this.orderForm.controls['shippingDate'].setErrors(null);
    }
  }

  //=====================Click Functions=====================//

  public onClickBackToShop = () =>{
    this.router.navigate(["/customer"]);
  }

  public onClickOrder = () =>{

    this.setOrderData();
    this.addOrder();
  }

  public onDoubleClickCity = () =>{
    let userCity = sessionStorage.getItem("city");
    this.orderForm.controls["city"].setValue(userCity);

  }

  public onDoubleClickStreet = () =>{
    let userStreet = sessionStorage.getItem("street");
    this.orderForm.controls["street"].setValue(userStreet);
  }


  //=====================Service Functions=====================//

  private getCart = () =>{

    let observable = this.cartsService.getCart();
        observable.subscribe(cart => {
            this.checkIfCartIsEmpty(cart);
            this.cartsService.cart = cart;
            this.cartsService.calculateCartTotalPrice();

        }, error => {
          ErrorHandler.handleErrors(this.router, error, this);
        });
    
  }

  private checkIfCartIsEmpty = (cart) =>{
    if(cart.length == 0 ){
      this.router.navigate(["/customer"]);
    }
  }

  private getOccupiedDates = () =>{

    let observable = this.reservationsService.getOccupiedDates();
        observable.subscribe(dates => {
          this.setOccupiedDates(dates);
            

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  private addOrder = () =>{

    const observable = this.reservationsService.addReservation(this.orderDetails);

    observable.subscribe(successfulServerRequestData => {
        // this.reservationsService.lastReservationMadeId = successfulServerRequestData.insertId;
        this.setCartUnActive();
                   
        
    }, serverErrorResponse => { 
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
    }); 
  }

  private setCartUnActive = () =>{

    const observable = this.cartsService.setCartUnActive();

    observable.subscribe(successfulServerRequestData => {

        this.router.navigate(["/successfulOrder"])
                   
        
    }, serverErrorResponse => { 
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
    }); 
  }

}
