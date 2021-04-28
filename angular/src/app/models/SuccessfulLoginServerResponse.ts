export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:number,       
        public userType?:string,
        public firstName?: string,
        public city?: string,
        public street?: string


    ){}

}