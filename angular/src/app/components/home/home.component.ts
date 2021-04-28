import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { ProductsService } from 'src/app/services/products-service';
import { ReservationsService } from 'src/app/services/reservations-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import LoginUtils from 'src/app/utils/LoginUtils';
import ErrorHandler from 'src/app/errors/ErrorHandler';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Model
  public userLoginDetails: UserLoginDetails;

  //Services
  private productsService: ProductsService;
  private reservationsService: ReservationsService;

  //Data Variables
  public amountOfReservationsMade: number;
  public amountOfProductsAvailable: number;

  //UI Variables
  public changeText1: boolean;
  public changeText2: boolean;
  public changeText3: boolean;
  public changeText4: boolean;
  public changeText5: boolean;
  public changeText6: boolean;



  constructor(productsService: ProductsService, reservationsService: ReservationsService, private router: Router, private snackBar: MatSnackBar) {
    this.userLoginDetails = new UserLoginDetails();
    this.productsService = productsService;
    this.reservationsService = reservationsService;
  }

  ngOnInit(): void {

    LoginUtils.routeUserByUserType(this);

    this.userLoginDetails = new UserLoginDetails("", "");
    this.amountOfProductsAvailable = 0;
    this.amountOfReservationsMade = 0;

    this.changeText1 = false;
    this.changeText2 = false;
    this.changeText3 = false;
    this.changeText4 = false;
    this.changeText5 = false;
    this.changeText6 = false;


    this.countProducts();
    this.countReservations();


  }


  private countProducts = () => {

    let observable = this.productsService.countProducts();
    observable.subscribe(countResult => {
      let result = countResult[0];
      let innerValue = result['count(*)'];
      this.amountOfProductsAvailable = innerValue;

    }, serverErrorResponse => {
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
    });

  }


  private countReservations = () => {

    let observable = this.reservationsService.countReservations();
    observable.subscribe(countResult => {
      let result = countResult[0];
      let innerValue = result['count(*)'];
      this.amountOfReservationsMade = innerValue;

    }, serverErrorResponse => {
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
    });

  }



}
