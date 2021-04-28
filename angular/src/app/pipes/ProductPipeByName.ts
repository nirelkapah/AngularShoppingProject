import { Pipe, PipeTransform } from "@angular/core";
import { CartProduct } from "../models/CartProduct";

@Pipe({
  name: "ProductNamePipe"
})
export class ProductPipeByName implements PipeTransform {

  transform(cartProduct: CartProduct[], name: string): any {
        
    if(cartProduct){
      let capitalizedName;

      if(name.length > 0){
        capitalizedName = name[0].toUpperCase() + name.slice(1);
        return cartProduct.filter(cartProduct => cartProduct.name.includes(capitalizedName) || cartProduct.name.includes(name));

      }
      else{
        return cartProduct;
      }

    }
    
  }

}


