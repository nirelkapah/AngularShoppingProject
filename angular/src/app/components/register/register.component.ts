import { Component, OnInit } from '@angular/core';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorHandler from 'src/app/errors/ErrorHandler';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Model
  public userRegisterDetails: UserRegisterDetails;

  //Service
  private userService: UserService;

  //Paging 
  public registationPart1IsOn: boolean = true;

  //Form Variables
  public registerFormPart1: FormGroup;
  public registerFormPart2: FormGroup;

  //Form Part 1
  public userId: FormControl;
  public username: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  //Form Part 2
  public city: FormControl;
  public street: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;

  public citiesList: string[] = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Nahariya", "Petah Tikva", "Giva'tayim","Tiberias","Rishon Letziyon","Ashdod"];
  public selectedCity: string;



  constructor( userService : UserService, private router: Router, private snackBar: MatSnackBar) {
    this.userService = userService;
   }

  ngOnInit(): void {
    this.initializeForm();
    this.userRegisterDetails = new UserRegisterDetails();

  }

  private initializeForm = () =>{
    
        //initialize values and validations
        this.userId = new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]);
        this.username = new FormControl("", Validators.required);
        this.password = new FormControl("", Validators.required);
        this.confirmPassword = new FormControl("", [Validators.required]);
    
        this.city = new FormControl("", Validators.required);
        this.street = new FormControl("", Validators.required);
        this.firstName = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]);
        this.lastName = new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]);
    
    
        // Initializing the from group 1 - how its built
        this.registerFormPart1 = new FormGroup({
          userId: this.userId,
          username : this.username,
          password : this.password,
          confirmPassword:this.confirmPassword
        });
    
        // Initializing the from group 2 - how its built
        this.registerFormPart2 = new FormGroup({
          city: this.city,
          street : this.street,
          firstName : this.firstName,
          lastName:this.lastName
        });

  }

  //=====================Click Functions=====================//

  public onClickConfirm = () => {
    this.setUserData();
    this.postUser();
  }

  public onClickBack = () => {
    this.registationPart1IsOn = true;
  }

  public onClickHome = () => {
    this.router.navigate(["/home"])
  }

  public onChangeSelect = (selectedCity) =>{
    this.selectedCity = selectedCity;
   }

  public onClickNext = () => {

    let userId = this.userId.value;
    let username = this.username.value;
    this.checkUserAlreadyRegistered(userId, username);

  }

  //=====================Service Functions=====================//

  private postUser = () =>{

    const observable = this.userService.addUser(this.userRegisterDetails);

    observable.subscribe(successfulServerRequestData => {
        this.router.navigate(["/home"])
        ErrorHandler.snackBar("User Succesfully Created",this)


                   
        
    }, serverErrorResponse => { 
      
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
    }); 

  }

  private checkUserAlreadyRegistered = (userId, username) =>{

    //Check If User Already Registered
    let data ={
      "username": username,
      "userId": userId
    }
    const observable = this.userService.checkIfUserIdExist(data);

    observable.subscribe(successfulServerRequestData => {
        this.registationPart1IsOn = false;
                 
        
    }, serverErrorResponse => { 
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);

    }); 

  }

  private setUserData = () =>{
    //Set Data
    this.userRegisterDetails.userId = this.userId.value;
    this.userRegisterDetails.username = this.username.value;
    this.userRegisterDetails.password = this.password.value;
    this.userRegisterDetails.city = this.city.value;
    this.userRegisterDetails.street = this.street.value;
    this.userRegisterDetails.firstName = this.firstName.value;
    this.userRegisterDetails.lastName = this.lastName.value;
  }


}
