import { Pipe, PipeTransform } from "@angular/core";
import { CartProduct } from "../models/CartProduct";

@Pipe({
  name: "NewToOldPipe"
})
export class NewToOldPipe implements PipeTransform {

  transform(cartProducts: CartProduct[]): any {

    if(cartProducts){
      return cartProducts.sort((a, b) => b.id - a.id);

    }
    
  }
}
