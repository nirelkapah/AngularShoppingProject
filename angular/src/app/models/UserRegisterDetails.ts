export class UserRegisterDetails {
    public constructor(
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public password?: string,
        public userId?: number,
        public city?: string,
        public street?: string
    ) { }
}