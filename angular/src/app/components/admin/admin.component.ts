import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import {ProductsService} from '../../services/products-service';
import {CartsService} from '../../services/carts-service';
import {MatDialog} from '@angular/material/dialog';
import ErrorHandler from 'src/app/errors/ErrorHandler';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';







@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //Selected Product For Update
  public selectedProduct: Product;

  //Search
  public searchKeyword: string;

  //UI
  public isCartOpen: boolean;


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

            ErrorHandler.snackBar("Sorry, No Products Found",this)
            this.getAllProducts();
          }

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }

  public onClickToggleProductManager = () =>{
    this.isCartOpen = !this.isCartOpen
  }

  public onClickProduct = (product) =>{

    this.selectedProduct = product;
  }

  public onClickAddNewProduct = () =>{
    this.cleanAllFormFields();

  }

  private cleanAllFormFields = () =>{

        //Set Empty Form
        this.selectedProduct = {
          name:"",
          price:null,
          imageURL:"",
          categoryId:null,
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

  public getAllProductsCategories = () =>{

    let observable = this.productsService.getAllProductsCategories();
        observable.subscribe(categoriesList => {
            // this.productsCategories = categoriesList;
            this.productsService.productCategories = categoriesList;

        }, serverErrorResponse => {
          ErrorHandler.handleErrors(this.router, serverErrorResponse, this);
        });
    
  }


}
