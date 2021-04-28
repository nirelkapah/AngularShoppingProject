export class CartProduct{
    public constructor(
        public id?: number,
        public productId?: number,
        public name?: string,
        public price?: number,
        public imageURL?: string,
        public amount?: number,
        public totalPrice?: number,


    ){}

}