import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import LoginUtils from 'src/app/utils/LoginUtils';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Service
  public usersService: UserService;


  constructor(usersService : UserService, private router: Router) { 
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.setFirstName()
  }

  public setFirstName = () =>{
    let firstName = sessionStorage.getItem("firstName")
    this.usersService.firstName = firstName;

  }


  //======================Click Functions======================//

  public onClickTransferToLogin = () =>{
    this.router.navigate(["/home"])
    
  }

  public onClickLogo = () =>{


    LoginUtils.routeUserByUserType(this);
    
  }

  public onClickSignOut = () =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("street");
    sessionStorage.removeItem("userType");


    this.usersService.firstName = undefined;

    this.router.navigate(["/home"])

  }

}
