import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products-service';
import {CartsService} from '../../services/carts-service';
import {MatDialog} from '@angular/material/dialog';
import { DialogWindowComponent } from '../dialog-window/dialog-windows';
import { MatSnackBar } from '@angular/material/snack-bar';
import ErrorHandler from 'src/app/errors/ErrorHandler';
import { Router } from '@angular/router';







@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  //Search
  public searchKeyword: string;

  //Open Cart UI Boolean
  public isCartOpen: boolean;

  //Last Selected Product
  private selectedProduct;

  constructor(private router: Router, public productsService: ProductsService,public cartsService: CartsService, public dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit(): void {

    this.isCartOpen = true;

    this.getAllProducts();
    this.getAllProductsCategories();
  }


  //=====================Click Functions=====================//


  public onClickCategory = (category) =>{
    
    let categoryId = category.id
    let observable = this.productsService.getProductsByCategory(categoryId);
        observable.subscribe(productsList => {
          this.productsService.productsArray = productsList;

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  public onClickSearch = () =>{
    
    let keyword = this.searchKeyword;

    let observable = this.productsService.searchProductsByKeyword(keyword);
        observable.subscribe(productsList => {
          if(productsList.length > 0){
            this.productsService.productsArray = productsList;
          }
          else{
            ErrorHandler.snackBar("Sorry , No Products Found",this)
            this.getAllProducts();
          }

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  public onClickToggleCart = () =>{
    this.isCartOpen = !this.isCartOpen
  }

  public onClickProduct =  (product) =>{

    this.selectedProduct = product
    this.openDialog(product.name, product.imageURL);

  }
  public openDialog = (name, imageURL): any => {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      width: '300px',
      data: {name: name, imageURL: imageURL}
    });

    dialogRef.afterClosed().subscribe(amount => {
      
      if(amount){
   
        this.addProductToCart(amount)
  
      }

    });
  }

  public onClickDeleteCart = () =>{

    try{
      this.deleteAllProductsFromCart();
      this.cartsService.cart = []
      this.cartsService.calculateCartTotalPrice();
    }
    catch(error){
      console.log(error)
    }
  }

  //=====================Service Functions=====================//

    public getAllProducts = () =>{

      let observable = this.productsService.getAllProducts();
          observable.subscribe(productsList => {
            this.productsService.productsArray = productsList;
  
          }, serverErrorResponse => {
            ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
          });
      
    }
  
    private getAllProductsCategories = () =>{
  
      let observable = this.productsService.getAllProductsCategories();
          observable.subscribe(categoriesList => {
              this.productsService.productCategories = categoriesList
  
          }, serverErrorResponse => {
            ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
          });
      
    }
  
  
    private addProductToCart = (amount) =>{

      //set Product Data For Server
      let data = {
        "productId": this.selectedProduct.id,
        "price": this.selectedProduct.price,
        "amount": amount
      }
      
      let observable = this.cartsService.addProductToCart(data);
          observable.subscribe(result => {

              //set Product Data For UI
              let cartProduct = {
                "id": result.insertId,
                "amount": amount,
                "productId": this.selectedProduct.id,
                "name":this.selectedProduct.name,
                "price": this.selectedProduct.price,
                "imageURL":this.selectedProduct.imageURL,
                "totalPrice": (amount * this.selectedProduct.price)
              }
              this.cartsService.addProductToCartUI(cartProduct)
              this.cartsService.calculateCartTotalPrice();
  
  
          }, serverErrorResponse => {
            ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
          });
      
    }

  public deleteAllProductsFromCart = () =>{
    
    let observable = this.cartsService.deleteAllProductsFromCart();
        observable.subscribe(result => {
            this.deleteCart();


        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  public deleteCart = () =>{

    let observable = this.cartsService.deleteCart();
        observable.subscribe(result => {

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  

}
