import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';



@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    public selectedProduct: Product;
    public productCategories:ProductCategory[];
    public productsArray: Product[];
 
    constructor(private http: HttpClient) {}

    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3001/products/");
    }
    
    public getProductsByCategory(categoryId): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3001/products/" + `byCategoryId?categoryId=${categoryId}`);
    }

    public searchProductsByKeyword(keyword): Observable<Product[]> {
        console.log(keyword)
        return this.http.get<Product[]>("http://localhost:3001/products/" + `byKeyword?keyword=${keyword}`);
    }
    
    public getAllProductsCategories(): Observable<ProductCategory[]> {
        return this.http.get<ProductCategory[]>("http://localhost:3001/products/allCategories");
    }

    public countProducts(): Observable<any> {
        let result =  this.http.get<any>("http://localhost:3001/products/countProducts");
        return result;
    }

    public editProduct(product): Observable<Product> {
        return this.http.put<Product>("http://localhost:3001/products/", product);
    }

    public addProduct(product): Observable<Product> {
        return this.http.post<Product>("http://localhost:3001/products/", product);
    }

    public uploadImage(data): Observable<any> {
        return this.http.post<any>("http://localhost:3001/upload/", data);
    }

    public editProductInArrayUI = (product) =>{

            let filteredProducts = this.productsArray.filter(function(item) { return item.id !== product.id; });
            filteredProducts.unshift(product);
            this.productsArray = filteredProducts
        
    }
    public addProductToArrayUI = (product) =>{

        this.productsArray.unshift(product)

    }
}
