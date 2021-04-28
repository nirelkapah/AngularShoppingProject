import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private http: HttpClient;
  firstName: string;
  userLoggedIn: boolean = false;

  // HttpClient injection (a class variable will be automatically created)
  constructor(private http: HttpClient) {
      // this.http = http;
  }
  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
      return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/", userLoginDetails);
  }

  public addUser(UserRegisterDetails: UserRegisterDetails): Observable<void> {        
      return this.http.post<void>("http://localhost:3001/users/register", UserRegisterDetails);
  }

  public checkIfUserIdExist(data: any): Observable<void> {        
    return this.http.post<void>("http://localhost:3001/users/checkUserExist", data);
  } 

}
