import { OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import ErrorHandler from 'src/app/errors/ErrorHandler';
import { Router } from '@angular/router';






@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit, OnChanges {

  //Selected File From Admin Component
  @Input() selectedProduct: Product;

  //New Product Result Details
  public newProductDetails: Product;


  //Product Form
  public productForm: FormGroup;
  public productId: number;
  public name: FormControl;
  public category: FormControl;
  public price: FormControl;
  public imageURL: FormControl;

  //Image Data
  public imageFile: any;
  public imagePreview: any;

  //Bind Input File Element
  @ViewChild('fileInput')
  myFileInputElement: ElementRef;

  constructor(private router: Router, public productsService: ProductsService, private snackBar: MatSnackBar) {
    this.initializeForm();

  }

  ngOnInit (): void {

    this.newProductDetails = new Product();
    if(!this.imageURL){
      this.imagePreview = "../../../assets/images/admin/default.png";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateSelectedProductValues(this.selectedProduct);

  }


  //=====================Click / Change Functions=====================//

  public onClickTriggerUploadFileButton = () => {
    this.myFileInputElement.nativeElement.click();
  }

  public onClickSubmitProduct = () => {

    let imageExist = this.checkImageUrlExist();
    if (imageExist) {

      //Set New Product Data
      this.newProductDetails.id = this.productId;
      this.newProductDetails.name = this.name.value;
      this.newProductDetails.price = this.price.value;
      this.newProductDetails.imageURL = this.imageURL.value;
      this.newProductDetails.categoryId = this.category.value;

      if (this.imageFile) {
        this.uploadImageFile();
      }
      debugger
      if (this.productId !== undefined) {
        this.editProduct();
      }
      else {
        this.addProduct();
      }
    }
  }

  public onClickAddNewProduct = () => {
    this.cleanFormFields();
  }


  public onChangeImage(event): void {

    //Set Image File Upload
    const file = event.target.files[0];

    let imageTypeValid = this.checkUploadedFileType(file)

    if (imageTypeValid) {

      this.imageFile = file;

      const image = event.target.files[0];
      let reader = new FileReader();

      //Set Image Preview 
      reader.onload = (e) => {
        let newImageProduct = e.target.result;
        this.imagePreview = newImageProduct;
      }
      reader.readAsDataURL(image);
      //Set Image URL
      this.productForm.controls["imageURL"].setValue(file.name);
    }
  }



  //=====================Service Functions=====================//


  private editProduct = () => {

    const observable = this.productsService.editProduct(this.newProductDetails);

    observable.subscribe(successfulServerRequestData => {

      let data = {
        "id": this.newProductDetails.id,
        "name": this.newProductDetails.name,
        "categoryId": this.newProductDetails.categoryId,
        "price": this.newProductDetails.price,
        "imageURL": this.newProductDetails.imageURL
      }
      ErrorHandler.snackBar("Product Succesfuly Updated",this)

      this.cleanFormFields();
      this.productsService.editProductInArrayUI(data);


    }, serverErrorResponse => {
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);

    });
  }


  private addProduct = () => {


    const observable = this.productsService.addProduct(this.newProductDetails);

    observable.subscribe((returnData: any) => {
      let data = {
        "id": returnData.insertId,
        "name": this.newProductDetails.name,
        "categoryId": this.newProductDetails.categoryId,
        "price": this.newProductDetails.price,
        "imageURL": this.newProductDetails.imageURL
      }

      ErrorHandler.snackBar("Product Succesfuly Added",this)

      this.productsService.addProductToArrayUI(data);
      this.cleanFormFields();




    }, serverErrorResponse => {
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);

    });
  }


  private uploadImageFile = async () => {

    //Create Image Data For Transfer
    let image = this.imageFile;
    const data = new FormData();
    data.append('file', image);
    const observable = this.productsService.uploadImage(data);

    observable.subscribe(successfulServerRequestData => {

    }, serverErrorResponse => {
      ErrorHandler.handleErrors(this.router, serverErrorResponse, this);

    });
  }


  //=====================Validation Functions=====================//


  private checkImageUrlExist = () => {

    if (this.imageURL.value == "" || this.imageURL.value == null || this.imageURL.value == undefined) {
      this.productForm.controls['imageURL'].setErrors({ 'incorrect': true });
      return false;
    }
    else {
      this.productForm.controls['imageURL'].setErrors(null);
      return true;
    }
  }

  private checkUploadedFileType = (file) => {
    let fileName = file.name
    let fileType = fileName.split('.').pop()

    if (fileType == "png" || fileType == "jpeg" || fileType == "jpg") {
      return true;
    }
    else {
      ErrorHandler.snackBar("Uploaded File Type Not Valid!",this)
      this.imagePreview = "../../../assets/images/admin/default.png";
      this.myFileInputElement.nativeElement.value = "";
      return false;
    }
  }


  //=====================Logic Functions=====================//


  private initializeForm = () => {

    //initialize values and validations
    this.name = new FormControl("", Validators.required);
    this.category = new FormControl("", Validators.required);
    this.price = new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]);
    this.imageURL = new FormControl("", Validators.required);



    // Initializing the from group 1 - how its built
    this.productForm = new FormGroup({
      name: this.name,
      category: this.category,
      price: this.price,
      imageURL: this.imageURL,

    });

  }

  public updateSelectedProductValues = (product) => {

    //Set Changed Product Values
    this.productId = product.id;
    this.productForm.controls["name"].setValue(product.name);
    this.productForm.controls["category"].setValue(product.categoryId);
    this.productForm.controls["price"].setValue(product.price);
    this.productForm.controls["imageURL"].setValue(product.imageURL);

    //If Existing Item Clicked
    if (this.selectedProduct.id) {
      this.imagePreview = "http://localhost:3001/" + product.imageURL;
    }
    else {
      this.imagePreview = "../../../assets/images/admin/default.png";
    }

    if (this.myFileInputElement) {
      this.myFileInputElement.nativeElement.value = "";
    }

  }


  private cleanFormFields = () => {
    //Set Empty Form
    this.productId = undefined;
    this.productForm.controls["name"].setValue("");
    this.productForm.controls["name"].markAsUntouched()
    this.productForm.controls["category"].setValue(null);
    this.productForm.controls["category"].markAsUntouched()
    this.productForm.controls["price"].setValue("");
    this.productForm.controls["price"].markAsUntouched();
    this.productForm.controls["imageURL"].setValue("");
    this.productForm.controls["imageURL"].markAsUntouched();

    //Set Image Preview And Empty Input Field
    this.imagePreview = "../../../assets/images/admin/default.png";
    this.myFileInputElement.nativeElement.value = "";
  }





}
