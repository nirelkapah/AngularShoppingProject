import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartProduct } from '../models/CartProduct';
import { CartDetails } from '../models/CartDetails';




@Injectable({
    providedIn: 'root'
})

export class CartsService {

    
    public cart: CartProduct[] = [];
    public cartTotalPrice: number ;
 
    constructor(private http: HttpClient) {}

    public getCart(): Observable<CartProduct[]> {
        let result =  this.http.get<CartProduct[]>("http://localhost:3001/carts");
        return result;
    }

    public getCartDetailsHistory(): Observable<CartDetails[]> {
        let result =  this.http.get<CartDetails[]>("http://localhost:3001/carts/history");
        return result;
    }

    public addProductToCart(data): Observable<any> {
        return this.http.post<any>("http://localhost:3001/carts", data);
    }

    public addProductToCartUI = (product) =>{

        this.cart.unshift(product)
    }

    public calculateCartTotalPrice = () =>{
        
        let totalPrice = 0;

        for(let i = 0; i<this.cart.length ; i++){
            totalPrice = totalPrice + this.cart[i].totalPrice;
        }

        this.cartTotalPrice = totalPrice
    }

    public deleteProductFromCart(cartProductId): Observable<void> {
        return this.http.delete<void>("http://localhost:3001/carts/" + `deleteProduct?cartProductId=${cartProductId}`);
    }

    public deleteProductFromCartUI = (cartProductId) =>{
        let filteredCart = this.cart.filter(function(item) { return item.id !== cartProductId; });
        this.cart = filteredCart;
    }

    public deleteAllProductsFromCart(): Observable<void> {
        return this.http.delete<void>("http://localhost:3001/carts/deleteAllProducts");
    }
    
    public deleteCart(): Observable<void> {
        return this.http.delete<void>("http://localhost:3001/carts/");
    }

    public setCartUnActive(): Observable<void> {
        return this.http.get<void>("http://localhost:3001/carts/setUnActive");
    }



}
