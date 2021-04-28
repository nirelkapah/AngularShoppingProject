import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import LoginUtils from 'src/app/utils/LoginUtils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import ErrorHandler from 'src/app/errors/ErrorHandler';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Model
  public userLoginDetails: UserLoginDetails;


  //Form Variables
  public loginForm: FormGroup;

  public username: FormControl;
  public password: FormControl;



  //Service
  private usersService: UserService;

  //Data Variables
  public amountOfReservationsMade: number;
  public amountOfProductsAvailable: number;


  constructor(usersService: UserService, private router: Router, private snackBar: MatSnackBar) {
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.userLoginDetails = new UserLoginDetails();
    this.initializeForm();

  }


  private initializeForm = () =>{

    //set Today Date

    //initialize values and validations
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);


    // Initializing the from group 1 - how its built
    this.loginForm = new FormGroup({
      city: this.username,
      street : this.password,
    });
  }

  public login(): void {
    
    this.userLoginDetails.username = this.username.value;
    this.userLoginDetails.password = this.password.value;


    const observable = this.usersService.login(this.userLoginDetails);

    observable.subscribe(successfulServerRequestData => {


      LoginUtils.setSessionStorageUserData(successfulServerRequestData);

      this.usersService.firstName = successfulServerRequestData.firstName;


      if (successfulServerRequestData.userType == "Client") {
        this.router.navigate(["/home/welcome"]);
      }

      if (successfulServerRequestData.userType == "Admin") {
        this.router.navigate(["/admin"]);
      }

    }, serverErrorResponse => { // Reaching here means that the server had failed
      // serverErrorResponse is the object returned from the ExceptionsHandler
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
    });

  }

}
