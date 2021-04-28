import { Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorHandler from 'src/app/errors/ErrorHandler';




@Injectable({
    providedIn: 'root'
})
export class ClientGuard implements CanActivate {

    public constructor(private router: Router,private http:HttpClient, private snackBar: MatSnackBar) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
            return this.http.get(
            `http://localhost:3001/users/authenticate`
            ).pipe(
            map((userType: string) => {
                console.log(userType)

                if (userType == "Client") {
                    return true;
                }
                else {
                    ErrorHandler.snackBar("Access Forbidden , Please Re-Login",this)
                    this.router.navigate(["home"]);
                    return false;
                }

            }), catchError(error => {
                
                ErrorHandler.snackBar("Access Forbidden , Please Re-Login",this)
                this.router.navigate(["home"]);
                return throwError('Guard - Unauthorized User');
            })
        );
              }
      


}

