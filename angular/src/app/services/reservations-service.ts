import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class ReservationsService {

    lastReservationMadeId: number;
 
    constructor(private http: HttpClient) {}

    public countReservations(): Observable<any> {
        let result =  this.http.get<any>("http://localhost:3001/reservations/");
        return result;
    }

    public getOccupiedDates(): Observable<any> {
        let result =  this.http.get<any>("http://localhost:3001/reservations/getOccupiedDates");
        return result;
    }

    public addReservation(data): Observable<any> {
        return this.http.post<any>("http://localhost:3001/reservations", data);
    }

}
